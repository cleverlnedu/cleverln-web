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

    const { data: existingLink, error: linkLookupError } = await supabase
      .from('auth_lms_user_links')
      .select('lms_user_id')
      .eq('auth_user_id', authUser.id)
      .maybeSingle();
    if (linkLookupError) throw linkLookupError;

    let lmsUserId = existingLink?.lms_user_id;
    if (!lmsUserId) {
      const { data: existingUser, error: userLookupError } = await supabase
        .from('users')
        .select('id')
        .eq('email', authUser.email)
        .maybeSingle();
      if (userLookupError) throw userLookupError;
      lmsUserId = existingUser?.id;
    }

    if (lmsUserId) {
      const { error: updateError } = await supabase
        .from('users')
        .update({ name, email: authUser.email, phone, avatar })
        .eq('id', lmsUserId);
      if (updateError) throw updateError;
    } else {
      const { data: createdUser, error: createError } = await supabase
        .from('users')
        .insert([{ id: authUser.id, name, email: authUser.email, phone, avatar, role: 'student' }])
        .select('id')
        .single();
      if (createError) throw createError;
      lmsUserId = createdUser.id;
    }

    const { error: linkError } = await supabase
      .from('auth_lms_user_links')
      .upsert({ auth_user_id: authUser.id, lms_user_id: lmsUserId }, { onConflict: 'auth_user_id' });
    if (linkError) throw linkError;

    return NextResponse.json({
      // City, role, headline, education and LinkedIn live only in the account metadata; returning them from this
      // server-side read keeps every device in step (a browser's cached session can hold older metadata).
      profile: { id: lmsUserId, name, email: authUser.email, phone, avatar, city, role, headline, education, linkedin },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Profile sync failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
