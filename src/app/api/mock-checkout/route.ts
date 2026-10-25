import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { AccountLinkError, resolveLmsUserId } from '@/lib/lmsAccount';

export const runtime = 'nodejs';

// Every environment (production, previews, local) writes to the production
// database, so mock checkout is limited to allow-listed test accounts
// everywhere, and outside production it must also be switched on explicitly.
const isProductionDeployment = process.env.VERCEL_ENV === 'production';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const IDEMPOTENCY_KEY = /^[A-Za-z0-9_-]{16,120}$/;

const createAdminClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) throw new Error('Server Supabase configuration is missing.');
  return createClient(url, secretKey, { auth: { persistSession: false, autoRefreshToken: false } });
};

export async function POST(request: NextRequest) {
  if (!isProductionDeployment && process.env.MOCK_CHECKOUT_ENABLED !== 'true') {
    return NextResponse.json({ error: 'Mock checkout is disabled.' }, { status: 404 });
  }

  const token = request.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return NextResponse.json({ error: 'Sign in before using test checkout.' }, { status: 401 });

  const body = await request.json().catch(() => null) as { productId?: string; idempotencyKey?: string } | null;
  if (!body || typeof body.productId !== 'string' || !UUID.test(body.productId)
    || typeof body.idempotencyKey !== 'string' || !IDEMPOTENCY_KEY.test(body.idempotencyKey)) {
    return NextResponse.json({ error: 'We couldn’t start checkout. Please refresh the page and try again.' }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    const authUser = authData.user;
    if (authError || !authUser?.email || !authUser.email_confirmed_at) {
      return NextResponse.json({ error: 'A verified sign-in is required.' }, { status: 401 });
    }

    {
      const { data: allowlistedAccount, error: allowlistError } = await supabase
        .from('mock_checkout_allowlist')
        .select('email')
        .eq('email', authUser.email.trim().toLowerCase())
        .eq('enabled', true)
        .maybeSingle();
      if (allowlistError) throw allowlistError;
      if (!allowlistedAccount) {
        return NextResponse.json({ error: 'Mock checkout is not enabled for this account.' }, { status: 404 });
      }
    }

    const name = String(authUser.user_metadata?.name || authUser.user_metadata?.full_name || '').trim();
    const phone = String(authUser.user_metadata?.phone_number || '').trim();
    if (!name || !phone) {
      return NextResponse.json({ error: 'Complete your profile before checkout.' }, { status: 409 });
    }

    const lmsUserId = await resolveLmsUserId(supabase, authUser, { name, phone });

    const { data: product, error: productError } = await supabase
      .from('store_products')
      .select('id,product_courses(course_id)')
      .eq('id', body.productId)
      .eq('status', 'published')
      .maybeSingle();
    if (productError) throw productError;
    if (!product) return NextResponse.json({ error: 'This course is not available for checkout.' }, { status: 404 });

    const { data: sameRequest, error: requestError } = await supabase
      .from('orders')
      .select('id, status')
      .eq('buyer_auth_user_id', authUser.id)
      .eq('idempotency_key', body.idempotencyKey)
      .maybeSingle();
    if (requestError) throw requestError;
    // A repeated request returns the original order. Re-running fulfilment here
    // would re-activate access that an admin has since revoked.
    if (sameRequest?.status === 'paid') {
      return NextResponse.json({ orderId: sameRequest.id, status: 'paid', mock: true, testMode: true, message: 'Mock checkout complete. No payment was taken.' });
    }

    const courseIds = (product.product_courses || []).map((entry: { course_id: string }) => entry.course_id);
    if (courseIds.length === 0) return NextResponse.json({ error: 'This course is not linked to LMS access.' }, { status: 409 });

    if (!sameRequest) {
      const { data: ownedCourse, error: ownershipError } = await supabase
        .from('user_courses')
        .select('course_id')
        .eq('user_id', lmsUserId)
        .eq('access_status', 'active')
        .in('course_id', courseIds)
        .limit(1)
        .maybeSingle();
      if (ownershipError) throw ownershipError;
      if (ownedCourse) return NextResponse.json({ error: 'You already have access to this course.' }, { status: 409 });
    }

    const { data: result, error: checkoutError } = await supabase.rpc('create_mock_course_order', {
      p_auth_user_id: authUser.id,
      p_product_id: product.id,
      p_idempotency_key: body.idempotencyKey,
    });
    if (checkoutError) throw checkoutError;

    return NextResponse.json({ ...result, testMode: true, message: 'Mock checkout complete. No payment was taken.' });
  } catch (error) {
    const errorCode = typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code?: unknown }).code)
      : '';
    if (error instanceof AccountLinkError) return NextResponse.json({ error: error.message }, { status: 409 });
    if (errorCode === '23505') return NextResponse.json({ error: 'You already have access to this course.' }, { status: 409 });
    console.error('[mock-checkout]', error);
    return NextResponse.json({ error: 'Checkout didn’t go through. Please try again.' }, { status: 500 });
  }
}
