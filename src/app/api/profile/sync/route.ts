import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { AccountLinkError, resolveLmsUserId } from '@/lib/lmsAccount';

export const runtime = 'nodejs';

const createAdminClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) throw new Error('Server Supabase configuration is missing.');
  return createClient(url, secretKey, { auth: { persistSession: false, autoRefreshToken: false } });
};

export async function POST(request: NextRequest) {
  const token = request.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return NextResponse.json({ error: 'Sign in to save your profile.' }, { status: 401 });

  try {
    const supabase = createAdminClient();
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authUser?.email || !authUser.email_confirmed_at) {
      return NextResponse.json({ error: 'A verified sign-in is required.' }, { status: 401 });
    }

    const name = String(authUser.user_metadata?.name || authUser.user_metadata?.full_name || '').trim();
    const phone = String(authUser.user_metadata?.phone_number || '').trim();
    const avatar = String(authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture || '').trim();
    const city = String(authUser.user_metadata?.city || '').trim();
    const role = String(authUser.user_metadata?.job_title || authUser.user_metadata?.role || '').trim();
    const headline = String(authUser.user_metadata?.headline || '').trim();
    const education = String(authUser.user_metadata?.education_status || '').trim();
    const linkedin = String(authUser.user_metadata?.linkedin_url || '').trim();
    if (!name || !phone) return NextResponse.json({ error: 'Name and phone are required.' }, { status: 422 });

    const lmsUserId = await resolveLmsUserId(supabase, authUser, { name, phone, avatar });
    const { error: updateError } = await supabase
      .from('users')
      .update({ name, email: authUser.email, phone, avatar })
      .eq('id', lmsUserId);
    if (updateError) throw updateError;

    return NextResponse.json({
      // City, role, headline, education and LinkedIn live only in the account metadata; returning them from this
      // server-side read keeps every device in step (a browser's cached session can hold older metadata).
      profile: { id: lmsUserId, name, email: authUser.email, phone, avatar, city, role, headline, education, linkedin },
    });
  } catch (error) {
    if (error instanceof AccountLinkError) return NextResponse.json({ error: error.message }, { status: 409 });
    console.error('[profile/sync]', error);
    return NextResponse.json({ error: 'We couldn’t save your profile. Please try again.' }, { status: 500 });
  }
}
