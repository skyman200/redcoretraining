"use client";

import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnerOnboardingForm from "@/components/features/partners/PartnerOnboardingForm";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

import { useLanguage } from "@/contexts/LanguageContext";

export default function PartnerOnboardingPage() {
    const { user, partnerData, loading } = useAuth();
    const router = useRouter();
    const { t } = useLanguage();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/partners/login");
            } else if (partnerData) {
                // 이미 신청한 경우 대시보드로 이동
                router.replace("/partners/dashboard");
            }
        }
    }, [user, partnerData, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold tracking-tighter mb-4">{t.partners.onboarding.title}</h1>
                        <p className="text-zinc-400">{t.partners.onboarding.subtitle}</p>
                    </div>
                    <PartnerOnboardingForm />
                </div>
            </main>
            <Footer />
        </div>
    );
}
