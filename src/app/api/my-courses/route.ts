import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const token = request.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return NextResponse.json({ error: 'Sign in to view your courses.' }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) return NextResponse.json({ error: 'Course service is not configured.' }, { status: 503 });

  const supabase = createClient(url, secretKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user?.email || !user.email_confirmed_at) {
    return NextResponse.json({ error: 'A verified sign-in is required.' }, { status: 401 });
  }

  const { data: link, error: linkError } = await supabase
    .from('auth_lms_user_links')
    .select('lms_user_id')
    .eq('auth_user_id', user.id)
    .maybeSingle();
  if (linkError) return NextResponse.json({ error: 'Could not load your course access.' }, { status: 500 });
  if (!link) return NextResponse.json({ courses: [] });

  const { data, error } = await supabase
    .from('user_courses')
    .select('course_id,granted_at,progress_data,courses(id,slug,title,description,thumbnail_url)')
    .eq('user_id', link.lms_user_id)
    .eq('access_status', 'active')
    .order('granted_at', { ascending: false });
  if (error) return NextResponse.json({ error: 'Could not load your course access.' }, { status: 500 });

  return NextResponse.json({ courses: (data || []).filter((entry) => entry.courses).map((entry) => ({
    ...entry.courses,
    grantedAt: entry.granted_at,
    progress: entry.progress_data,
  })) });
}
