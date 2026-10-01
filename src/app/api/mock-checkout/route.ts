import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const createAdminClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) throw new Error('Server Supabase configuration is missing.');
  return createClient(url, secretKey, { auth: { persistSession: false, autoRefreshToken: false } });
};

export async function POST(request: NextRequest) {
  if (process.env.VERCEL_ENV === 'production' || process.env.MOCK_CHECKOUT_ENABLED !== 'true') {
    return NextResponse.json({ error: 'Mock checkout is disabled.' }, { status: 404 });
  }

  const token = request.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return NextResponse.json({ error: 'Sign in before using test checkout.' }, { status: 401 });

  const body = await request.json().catch(() => null) as { productId?: string; idempotencyKey?: string } | null;
  if (!body?.productId || !body.idempotencyKey) {
    return NextResponse.json({ error: 'Product and checkout request ID are required.' }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    const authUser = authData.user;
    if (authError || !authUser?.email || !authUser.email_confirmed_at) {
      return NextResponse.json({ error: 'A verified sign-in is required.' }, { status: 401 });
    }

    const name = String(authUser.user_metadata?.name || authUser.user_metadata?.full_name || '').trim();
    const phone = String(authUser.user_metadata?.phone_number || '').trim();
    if (!name || !phone) {
      return NextResponse.json({ error: 'Complete your profile before checkout.' }, { status: 409 });
    }

    const { data: existingLink, error: linkQueryError } = await supabase
      .from('auth_lms_user_links')
      .select('lms_user_id')
      .eq('auth_user_id', authUser.id)
      .maybeSingle();
    if (linkQueryError) throw linkQueryError;

    let lmsUserId = existingLink?.lms_user_id;
    if (!lmsUserId) {
      const { data: existingUser, error: userQueryError } = await supabase
        .from('users')
        .select('id')
        .eq('email', authUser.email)
        .maybeSingle();
      if (userQueryError) throw userQueryError;

      if (existingUser) {
        lmsUserId = existingUser.id;
      } else {
        const { data: createdUser, error: createUserError } = await supabase
          .from('users')
          .insert([{ id: authUser.id, name, email: authUser.email, phone, role: 'student' }])
          .select('id')
          .single();
        if (createUserError) throw createUserError;
        lmsUserId = createdUser.id;
      }

      const { error: linkError } = await supabase
        .from('auth_lms_user_links')
        .upsert({ auth_user_id: authUser.id, lms_user_id: lmsUserId }, { onConflict: 'auth_user_id' });
      if (linkError) throw linkError;
    }

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
      .select('id')
      .eq('buyer_auth_user_id', authUser.id)
      .eq('idempotency_key', body.idempotencyKey)
      .maybeSingle();
    if (requestError) throw requestError;

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
    const message = errorCode === '23505'
      ? 'You already have access to this course.'
      : error instanceof Error ? error.message : 'Mock checkout failed.';
    return NextResponse.json({ error: message }, { status: errorCode === '23505' ? 409 : 500 });
  }
}
