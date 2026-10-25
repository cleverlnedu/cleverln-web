"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { lmsUrl } from "@/lib/lmsUrl";
import { supabase } from "@/lib/supabase";
import { clearRememberPreference } from "@/lib/sharedSession";

type AuthContextValue = { user: User | null; loading: boolean; signOut: () => Promise<void> };
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.includes("access_token=")) {
      // An LMS Google sign-in that Supabase sent to this site's URL: hand the tokens back to the LMS.
      window.location.replace(`${lmsUrl("/dashboard")}${window.location.hash}`);
      return;
    }

    let mounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session: Session | null) => {
      if (event === "SIGNED_OUT") clearRememberPreference();
      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });
    // "Remember for 30 days" is enforced by the session cookie's own lifetime (see lib/sharedSession).
    void supabase.auth.getSession().then(({ data, error }) => {
      if (mounted) {
        setUser(error ? null : data.session?.user ?? null);
        setLoading(false);
      }
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    signOut: async () => { await supabase.auth.signOut(); },
  }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
