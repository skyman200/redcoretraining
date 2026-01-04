import { useState, useCallback } from "react";
import { supabase } from "@/services/supabase/client";
import { useRouter } from "next/navigation";

export function useAuthActions() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = useCallback(async (email: string, pass: string) => {
        if (!supabase) {
            setError("Supabase not initialized");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password: pass,
            });
            if (error) throw error;
            router.push("/partners/onboarding");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    }, [router]);

    const signup = useCallback(async (email: string, pass: string) => {
        if (!supabase) {
            setError("Supabase not initialized");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password: pass,
            });
            if (error) throw error;
            router.push("/partners/onboarding");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    }, [router]);

    const googleSignIn = useCallback(async () => {
        if (!supabase) {
            setError("Supabase not initialized");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw error;
            // OAuth redirects automatically, so no need to push
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, login, signup, googleSignIn };
}
