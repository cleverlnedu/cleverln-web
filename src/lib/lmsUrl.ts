// The LMS runs as a separate app (CleverLN_LMS) on the same Supabase project.
// Set NEXT_PUBLIC_LMS_URL to point local development at a locally running LMS.
export const LMS_URL = (process.env.NEXT_PUBLIC_LMS_URL?.trim() || 'https://lms.cleverln.com').replace(/\/+$/, '');

export function lmsUrl(path: string): string {
  return `${LMS_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
