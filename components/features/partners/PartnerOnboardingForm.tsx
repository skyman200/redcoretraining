"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { usePartners } from "@/hooks/usePartners";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import AgreementTextInternational from "./AgreementTextInternational";
import DomesticPartnerForm from "./DomesticPartnerForm";
import InternationalPartnerForm from "./InternationalPartnerForm";
import { PartnerApplicationFormData } from "@/types/partner";
import { LanguageRegion, LANGUAGE_REGIONS } from "@/lib/partnerConstants";

export default function PartnerOnboardingForm() {
    const { user } = useAuth();
    const router = useRouter();
    const { loading, error, submitApplication } = usePartners();
    const { t } = useLanguage();
    const { onboarding: ot } = t.partners;

    const [step, setStep] = useState<"region" | "form">("region");
    const [languageRegion, setLanguageRegion] = useState<LanguageRegion>("ko");
    const [agreement, setAgreement] = useState(false);
    const [formData, setFormData] = useState<PartnerApplicationFormData>({
        type: "domestic",
        languageRegion: "ko",
        name: "",
        contact: "",
        bankName: "",
        accountNumber: "",
        residentRegistrationNumber: "",
        birthDate: "",
        country: "",
        wiseEmail: "",
        swiftCode: "",
        bankAddress: "",
        passportNumber: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [localError, setLocalError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegionSelect = (region: LanguageRegion) => {
        const isDomestic = region === "ko";
        setLanguageRegion(region);
        setFormData(prev => ({
            ...prev,
            type: isDomestic ? "domestic" : "international",
            languageRegion: region,
        }));
        setStep("form");
        setAgreement(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreement) {
            setLocalError(ot.error);
            return;
        }
        setLocalError("");

        if (user) {
            const result = await submitApplication(user.id, user.email ?? null, formData);
            if (!result.error) {
                setSubmitted(true);
            }
        }
    };

    if (submitted) {
        return <SuccessView t={t} router={router} ot={ot} />;
    }

    if (step === "region") {
        return <RegionSelectionView onSelect={handleRegionSelect} />;
    }

    const isDomestic = languageRegion === "ko";
    const agreementCheckboxText = getAgreementCheckboxText(languageRegion);

    return (
        <form onSubmit={handleSubmit} className="space-y-12 max-w-3xl mx-auto">
            <Breadcrumb
                onBack={() => setStep("region")}
                currentRegion={LANGUAGE_REGIONS[languageRegion]}
            />

            <section className="space-y-6">
                <h2 className="text-xl font-bold border-b border-zinc-800 pb-2">
                    1. {isDomestic ? ot.agreementTitle : "Partnership Agreement"}
                </h2>
                <AgreementTextInternational languageRegion={languageRegion} />
                <label className="flex items-start space-x-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={agreement}
                        onChange={(e) => setAgreement(e.target.checked)}
                        className="w-5 h-5 mt-0.5 rounded border-zinc-700 bg-zinc-900 checked:bg-white checked:border-white transition-all cursor-pointer focus:ring-0"
                    />
                    <span className="text-zinc-300 group-hover:text-white transition-colors text-sm leading-relaxed">
                        {agreementCheckboxText}
                    </span>
                </label>
            </section>

            <section className="space-y-8">
                <h2 className="text-xl font-bold border-b border-zinc-800 pb-2">
                    2. {isDomestic ? ot.title : "Partner Information"}
                </h2>
                {isDomestic ? (
                    <DomesticPartnerForm formData={formData} onChange={handleChange} />
                ) : (
                    <InternationalPartnerForm
                        formData={formData}
                        onChange={handleChange}
                        languageRegion={languageRegion}
                    />
                )}
            </section>

            {
                (error || localError) && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                        {error || localError}
                    </div>
                )
            }

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50 text-lg shadow-xl shadow-white/5"
            >
                {loading ? ot.submitting : ot.submit}
            </button>
        </form >
    );
}

// ============================================
// Sub-components
// ============================================

interface SuccessViewProps {
    t: ReturnType<typeof useLanguage>["t"];
    router: ReturnType<typeof useRouter>;
    ot: ReturnType<typeof useLanguage>["t"]["partners"]["onboarding"];
}

function SuccessView({ t, router, ot }: SuccessViewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 max-w-md mx-auto"
        >
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter">{t.partners.onboarding.success.split('!')[0]}</h1>
            <p className="text-zinc-400">{ot.success}</p>
            <button
                onClick={() => router.push("/")}
                className="px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors"
            >
                {t.board.backToList}
            </button>
        </motion.div>
    );
}

interface RegionSelectionViewProps {
    onSelect: (region: LanguageRegion) => void;
}

function RegionSelectionView({ onSelect }: RegionSelectionViewProps) {
    const regions: LanguageRegion[] = ["ko", "en", "ja", "es", "de"];

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Select Your Region / 지역을 선택하세요</h2>
                <p className="text-zinc-400">Please select your language region to proceed.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {regions.map((region) => {
                    const config = LANGUAGE_REGIONS[region];
                    return (
                        <button
                            key={region}
                            onClick={() => onSelect(region)}
                            className="flex flex-col items-center justify-center p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:bg-zinc-800 hover:border-zinc-600 transition-all group"
                        >
                            <span className="text-4xl mb-3">{config.flag}</span>
                            <h3 className="text-lg font-bold mb-1">{config.label}</h3>
                            <p className="text-xs text-zinc-500 text-center">{config.description}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

interface BreadcrumbProps {
    onBack: () => void;
    currentRegion: { flag: string; label: string };
}

function Breadcrumb({ onBack, currentRegion }: BreadcrumbProps) {
    return (
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
            <button type="button" onClick={onBack} className="hover:text-white underline">
                Region Selection
            </button>
            <span>&gt;</span>
            <span className="text-white font-medium">
                {currentRegion.flag} {currentRegion.label} Partner
            </span>
        </div>
    );
}

// ============================================
// Helper Functions
// ============================================

function getAgreementCheckboxText(region: LanguageRegion): string {
    const texts: Record<LanguageRegion, string> = {
        ko: "위 약관을 읽고 이해했으며 이에 동의합니다.",
        en: "I have read, understood, and agree to the Terms & Conditions. I acknowledge that the payment method may change due to Company circumstances.",
        ja: "上記の利用規約を読み、理解し、同意します。会社の事情により支払い方法が変更される場合があることを了承します。",
        es: "He leído, entendido y acepto los Términos y Condiciones. Reconozco que el método de pago puede cambiar debido a circunstancias de la Empresa.",
        de: "Ich habe die Allgemeinen Geschäftsbedingungen gelesen, verstanden und stimme ihnen zu. Ich erkenne an, dass sich die Zahlungsmethode aufgrund von Unternehmensumständen ändern kann.",
    };
    return texts[region];
}
