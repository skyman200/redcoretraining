import { useState, useCallback } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/services/firebase/client";
import { useRouter } from "next/navigation";

export function useAuthActions() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = useCallback(async (email: string, pass: string) => {
        setLoading(true);
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, pass);
            router.push("/partners/onboarding");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    }, [router]);

    const signup = useCallback(async (email: string, pass: string) => {
        setLoading(true);
        setError(null);
        try {
            await createUserWithEmailAndPassword(auth, email, pass);
            router.push("/partners/onboarding");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    }, [router]);

    const googleSignIn = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            router.push("/partners/onboarding");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    }, [router]);

    return { loading, error, login, signup, googleSignIn };
}
