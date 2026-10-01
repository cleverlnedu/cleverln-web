"use client";

import { getCachedLmsProfile, syncLmsProfile, type LearnerProfile } from '@/lib/profileSync';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/website/AuthProvider';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import { GraduationCap, Mail, MapPin, Pencil, Phone, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './ProfileCard.module.css';

export default function ProfileCardDynamic() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<LearnerProfile | null>(() => user ? getCachedLmsProfile(user.id) : null);
  const [name, setName] = useState(() => user ? getCachedLmsProfile(user.id)?.name ?? '' : '');
  const [phone, setPhone] = useState(() => user ? getCachedLmsProfile(user.id)?.phone ?? '' : '');
  const [city, setCity] = useState('');
  const [role, setRole] = useState('');
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
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
      setCity(String(user.user_metadata?.city || ''));
      setRole(String(user.user_metadata?.job_title || user.user_metadata?.role || 'CleverLN learner'));
      if (cachedProfile) {
        setProfile(cachedProfile);
        setName(cachedProfile.name);
        setPhone(cachedProfile.phone);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const currentProfile = await syncLmsProfile();
        if (!active) return;
        setProfile(currentProfile);
        setName(currentProfile.name);
        setPhone(currentProfile.phone);
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

  const saveProfile = async () => {
    setBusy(true);
    setError('');
    const { error: updateError } = await supabase.auth.updateUser({
      data: { name: name.trim(), phone_number: phone.trim(), city: city.trim(), job_title: role.trim() },
    });
    if (updateError) {
      setError(updateError.message);
      setBusy(false);
      return;
    }
    try {
      const updatedProfile = await syncLmsProfile({ forceRefresh: true });
      setProfile(updatedProfile);
      setName(updatedProfile.name);
      setPhone(updatedProfile.phone);
      setEditing(false);
    } catch (syncError) {
      setError(syncError instanceof Error ? syncError.message : 'Could not save your profile.');
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

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
            {editing ? (
              <div className={styles.dprofileEditForm}>
                <label className={styles.dprofileField}>Name<input value={name} onChange={(event) => setName(event.target.value)} maxLength={80} required /></label>
                <label className={styles.dprofileField}>Phone<input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" maxLength={30} required /></label>
                <label className={styles.dprofileField}>Role<input value={role} onChange={(event) => setRole(event.target.value)} maxLength={80} /></label>
                <label className={styles.dprofileField}>City<input value={city} onChange={(event) => setCity(event.target.value)} maxLength={80} /></label>
              </div>
            ) : (
              <>
                <h2 className={styles.dprofileName}>{loading ? <LoadingIndicator label="Loading profile" /> : profile?.name || 'Learner profile'}</h2>
                <p className={styles.dprofileSubtitle}>{role || 'CleverLN learner'}</p>
              </>
            )}

            <div className={styles.dprofileInfoRow}>
              <div className={styles.dprofileInfoItem}><Mail size={17} /><span>{loading ? <LoadingIndicator label="Loading account details" /> : profile?.email || 'Email unavailable'}</span></div>
              <div className={styles.dprofileInfoItem}><Phone size={17} /><span>{editing ? phone : (profile?.phone || 'Phone not added')}</span></div>
              <div className={styles.dprofileInfoItem}><GraduationCap size={17} /><span>{role || 'CleverLN learner'}</span></div>
              <div className={styles.dprofileInfoItem}><MapPin size={17} /><span>{editing ? city : (city || 'Location not added')}</span></div>
            </div>

            {error && <p className={styles.dprofileError} role="alert">{error}</p>}
            <div className={styles.dprofileButtonRow}>
              {editing ? (
                <>
                  <button type="button" className={styles.dprofileEditBtn} onClick={() => void saveProfile()} disabled={busy || !name.trim() || !phone.trim()}>
                    <Save size={14} /> {busy ? 'Saving…' : 'Save profile'}
                  </button>
                  <button type="button" className={styles.dprofileLogoutBtn} onClick={() => setEditing(false)} disabled={busy}><X size={14} /> Cancel</button>
                </>
              ) : (
                <>
                  <button type="button" className={styles.dprofileEditBtn} onClick={() => setEditing(true)} disabled={loading}><Pencil size={14} /> Edit profile</button>
                  <button type="button" className={styles.dprofileLogoutBtn} onClick={() => void signOut()}>Log out</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
