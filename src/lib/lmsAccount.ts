import type { SupabaseClient, User } from '@supabase/supabase-js';

export class AccountLinkError extends Error {}

const escapeLike = (value: string) => value.replace(/[\\%_]/g, (char) => `\\${char}`);

/**
 * The LMS user that belongs to this signed-in account, creating and linking one
 * on first use. An existing LMS account with the same email is claimed only when
 * it is an unlinked student account: staff accounts, and accounts already owned
 * by another login, are never merged automatically. The LMS applies the same
 * rule in server/middleware/auth.js.
 */
export async function resolveLmsUserId(
  supabase: SupabaseClient,
  authUser: User,
  profile: { name: string; phone: string; avatar?: string },
): Promise<string> {
  const email = authUser.email as string;

  const { data: link, error: linkError } = await supabase
    .from('auth_lms_user_links').select('lms_user_id').eq('auth_user_id', authUser.id).maybeSingle();
  if (linkError) throw linkError;
  if (link) return link.lms_user_id;

  const { data: sameId, error: sameIdError } = await supabase
    .from('users').select('id').eq('id', authUser.id).maybeSingle();
  if (sameIdError) throw sameIdError;

  let lmsUserId = sameId?.id as string | undefined;
  if (!lmsUserId) {
    const { data: sameEmail, error: emailError } = await supabase
      .from('users').select('id, role').ilike('email', escapeLike(email)).maybeSingle();
    if (emailError) throw emailError;
    if (sameEmail) {
      const { data: owner, error: ownerError } = await supabase
        .from('auth_lms_user_links').select('auth_user_id').eq('lms_user_id', sameEmail.id).maybeSingle();
      if (ownerError) throw ownerError;
      if (owner || sameEmail.role !== 'student') {
        throw new AccountLinkError('This email is already used by another CleverLN account. Please contact support.');
      }
      lmsUserId = sameEmail.id;
    }
  }

  if (!lmsUserId) {
    const { data: created, error: createError } = await supabase
      .from('users')
      .insert([{ id: authUser.id, name: profile.name, email, phone: profile.phone, avatar: profile.avatar || '', role: 'student' }])
      .select('id')
      .single();
    if (createError?.code === '23505') {
      throw new AccountLinkError('This email is already used by another CleverLN account. Please contact support.');
    }
    if (createError) throw createError;
    lmsUserId = created.id as string;
  }

  // Link before anything else is written, so a row that turns out to belong to
  // another login is never modified.
  const { error: upsertError } = await supabase
    .from('auth_lms_user_links')
    .upsert({ auth_user_id: authUser.id, lms_user_id: lmsUserId }, { onConflict: 'auth_user_id' });
  if (upsertError?.code === '23505') {
    throw new AccountLinkError('This email is already used by another CleverLN account. Please contact support.');
  }
  if (upsertError) throw upsertError;
  return lmsUserId;
}
