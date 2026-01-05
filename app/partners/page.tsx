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
            } else if (partnerData) {
                // 신청 내역이 있으면 (승인/대기/거절 등) 대시보드로 이동하여 상태 확인
                router.replace("/partners/dashboard");
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
