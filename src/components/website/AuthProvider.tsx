"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { clearRememberPreference, isRememberedSessionExpired } from "@/lib/rememberSession";

type AuthContextValue = { user: User | null; loading: boolean; signOut: () => Promise<void> };
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.includes("access_token=")) {
      const hash = window.location.hash;
      const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const lmsTarget = isLocal ? "http://localhost:5173/dashboard" : "https://lms.cleverln.com/dashboard";
      window.location.replace(`${lmsTarget}${hash}`);
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
    // Honour "Remember for 30 days": end the sign-in after 30 days, or when the browser was closed if unchecked.
    const expired = isRememberedSessionExpired();
    void (expired ? supabase.auth.signOut({ scope: "local" }).then(() => undefined) : Promise.resolve()).then(() => supabase.auth.getSession()).then(({ data, error }) => {
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
