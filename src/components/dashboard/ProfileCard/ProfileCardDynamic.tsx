"use client";

import { getCachedLmsProfile, syncLmsProfile, type LearnerProfile } from '@/lib/profileSync';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/website/AuthProvider';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import { GraduationCap, MapPin, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EditProfileModal from './EditProfileModal';
import styles from './ProfileCard.module.css';

// Solid envelope with a white flap, as in the design (lucide's Mail draws its flap under the body).
function MailFilled() {
  return <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor" />
    <path d="m22 7-8.99 5.73a2 2 0 0 1-2.02 0L2 7" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

// "Linked" + the "in" box, as in the LinkedIn wordmark.
function LinkedinWordmark() {
  return <span className={styles.dprofileLinkedinMark} aria-hidden="true">Linked<span>in</span></span>;
}

export default function ProfileCardDynamic() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<LearnerProfile | null>(() => user ? getCachedLmsProfile(user.id) : null);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  // Wait for auth/cache resolution before showing a fetch loader. The profile
  // cache is shared across dashboard remounts, so returning from Home should
  // paint cached details instead of flashing a loading state.
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    void (async () => {
      if (authLoading) return;
      if (!user) {
        router.replace('/login');
        return;
      }
      const cachedProfile = getCachedLmsProfile(user.id);
      if (cachedProfile) {
        setProfile(cachedProfile);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const currentProfile = await syncLmsProfile();
        if (!active) return;
        setProfile(currentProfile);
        setLoading(false);
      } catch (syncError) {
        if (active) {
          setError(syncError instanceof Error ? syncError.message : 'Could not load your profile.');
          setLoading(false);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [router, user, authLoading]);

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(false), 3000);
    return () => window.clearTimeout(timer);
  }, [saved]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  const headline = profile?.headline || profile?.role || 'CleverLN learner';
  const initials = (profile?.name || profile?.email || 'C').split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase();

  return (
    <section className={styles.dprofileRoot}>
      <div className={styles.dprofileCard}>
        <div className={styles.dprofileWrapper}>
          <div
            className={styles.dprofileAvatarBox}
            style={profile?.avatar ? { backgroundImage: `url("${profile.avatar}")` } : undefined}
            role="img"
            aria-label={`${profile?.name || 'Learner'} profile photo`}
          >
            {!profile?.avatar && <span className={styles.dprofileInitials}>{initials}</span>}
          </div>

          <div className={styles.dprofileContent}>
            <h2 className={styles.dprofileName}>{loading ? <LoadingIndicator label="Loading profile" /> : profile?.name || 'Learner profile'}</h2>
            <p className={styles.dprofileSubtitle}>{headline}</p>

            <div className={styles.dprofileInfoRow}>
              <div className={styles.dprofileInfoItem}><MailFilled /><span>{loading ? <LoadingIndicator label="Loading account details" /> : profile?.email || 'Email unavailable'}</span></div>
              <div className={styles.dprofileInfoItem}><Phone size={17} /><span>{profile?.phone || 'Phone not added'}</span></div>
              <div className={styles.dprofileInfoItem}><GraduationCap size={19} className={styles.dprofileIconCap} /><span>{profile?.education || 'Education not added'}</span></div>
              <div className={styles.dprofileInfoItem}><MapPin size={18} className={styles.dprofileIconPin} /><span>{profile?.city || 'Location not added'}</span></div>
            </div>

            {error && <p className={styles.dprofileError} role="alert">{error}</p>}
            <p className={styles.dprofileSaved} role="status">{saved ? 'Profile updated' : ''}</p>
            <div className={styles.dprofileButtonRow}>
              {profile?.linkedin ? (
                <a className={styles.dprofileLinkedinBtn} href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)">
                  <LinkedinWordmark />
                </a>
              ) : (
                <button type="button" className={styles.dprofileLinkedinBtn} onClick={() => setEditing(true)} disabled={loading || !profile} aria-label="Add your LinkedIn profile">
                  <LinkedinWordmark />
                </button>
              )}
              <button type="button" className={styles.dprofileEditBtn} onClick={() => setEditing(true)} disabled={loading || !profile}>Edit Profile</button>
              <button type="button" className={styles.dprofileLogoutBtn} onClick={() => void signOut()}>Logout</button>
            </div>
          </div>
        </div>
      </div>

      {editing && profile && (
        <EditProfileModal
          profile={profile}
          initials={initials}
          onClose={() => setEditing(false)}
          onSaved={(updatedProfile) => {
            setProfile(updatedProfile);
            setError('');
            setEditing(false);
            setSaved(true);
          }}
        />
      )}
    </section>
  );
}
