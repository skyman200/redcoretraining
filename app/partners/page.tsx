"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function PartnersRedirectPage() {
    const { user, partnerData, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.replace("/partners/login");
            } else if (partnerData?.status === "approved") {
                router.replace("/partners/board");
            } else {
                router.replace("/partners/onboarding");
            }
        }
    }, [user, partnerData, loading, router]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}
