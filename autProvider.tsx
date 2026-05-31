"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchUserProfile, clearUser } from "@/store/userSlice";
import { useEffect } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const syncAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        dispatch(clearUser());
        return;
      }

      dispatch(fetchUserProfile());
    };

    syncAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        dispatch(clearUser());
      } else {
        dispatch(fetchUserProfile());
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
}