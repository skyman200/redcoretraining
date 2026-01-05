"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { usePartners } from "@/hooks/usePartners";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import AgreementText from "./AgreementText";
import AgreementTextInternational from "./AgreementTextInternational";
import DomesticPartnerForm from "./DomesticPartnerForm";
import InternationalPartnerForm from "./InternationalPartnerForm";
import { PartnerApplicationFormData } from "@/types/partner";
import { Globe, House } from "lucide-react";

export default function PartnerOnboardingForm() {
    const { user } = useAuth();
    const router = useRouter();
    const { loading, error, submitApplication } = usePartners();
    const { t } = useLanguage();
    const { onboarding: ot } = t.partners;

    const [step, setStep] = useState<"type" | "form">("type");
    const [partnerType, setPartnerType] = useState<"domestic" | "international">("domestic");

    const [agreement, setAgreement] = useState(false);
    const [formData, setFormData] = useState<PartnerApplicationFormData>({
        type: "domestic",
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

    const handleTypeSelect = (type: "domestic" | "international") => {
        setPartnerType(type);
        setFormData(prev => ({ ...prev, type }));
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

    if (step === "type") {
        return <TypeSelectionView onSelect={handleTypeSelect} />;
    }

    const isDomestic = partnerType === "domestic";

    return (
        <form onSubmit={handleSubmit} className="space-y-12 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-[-20px]">
                <button type="button" onClick={() => setStep("type")} className="hover:text-white underline">Type Selection</button>
                <span>&gt;</span>
                <span className="text-white font-medium">{isDomestic ? "Domestic" : "International"} Partner</span>
            </div>

            <section className="space-y-6">
                <h2 className="text-xl font-bold border-b border-zinc-800 pb-2">1. {isDomestic ? ot.agreementTitle : "Partnership Agreement"}</h2>
                {isDomestic ? <AgreementText /> : <AgreementTextInternational />}
                <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={agreement}
                        onChange={(e) => setAgreement(e.target.checked)}
                        className="w-5 h-5 rounded border-zinc-700 bg-zinc-900 checked:bg-white checked:border-white transition-all cursor-pointer focus:ring-0"
                    />
                    <span className="text-zinc-300 group-hover:text-white transition-colors">
                        {isDomestic ? ot.agreeCheckbox : "I have read, understood, and agree to the Terms & Conditions."}
                    </span>
                </label>
            </section>

            <section className="space-y-8">
                <h2 className="text-xl font-bold border-b border-zinc-800 pb-2">2. {isDomestic ? ot.title : "Partner Information"}</h2>
                {isDomestic ? (
                    <DomesticPartnerForm formData={formData} onChange={handleChange} />
                ) : (
                    <InternationalPartnerForm formData={formData} onChange={handleChange} />
                )}
            </section>

            {(error || localError) && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                    {error || localError}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50 text-lg shadow-xl shadow-white/5"
            >
                {loading ? ot.submitting : ot.submit}
            </button>
        </form>
    );
}

// Sub-components to clean up the main file
function SuccessView({ t, router, ot }: { t: any, router: any, ot: any }) {
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

function TypeSelectionView({ onSelect }: { onSelect: (type: "domestic" | "international") => void }) {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Select Partner Type</h2>
                <p className="text-zinc-400">Please select your residence type to proceed.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => onSelect("domestic")}
                    className="flex flex-col items-center justify-center p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:bg-zinc-800 hover:border-zinc-600 transition-all group"
                >
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-zinc-700 transition-colors">
                        <House className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">Domestic Partner</h3>
                    <p className="text-sm text-zinc-500">Residing in South Korea (KRW Payout)</p>
                </button>

                <button
                    onClick={() => onSelect("international")}
                    className="flex flex-col items-center justify-center p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:bg-zinc-800 hover:border-zinc-600 transition-all group"
                >
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-zinc-700 transition-colors">
                        <Globe className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">International Partner</h3>
                    <p className="text-sm text-zinc-500">Residing Outside Korea (USD/Wise Payout)</p>
                </button>
            </div>
        </div>
    );
}
