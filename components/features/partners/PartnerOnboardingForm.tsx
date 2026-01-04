"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { usePartners } from "@/hooks/usePartners";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import AgreementText from "./AgreementText";
import { PartnerApplicationFormData } from "@/types/partner";

export default function PartnerOnboardingForm() {
    const { user } = useAuth();
    const router = useRouter();
    const { loading, error, submitApplication } = usePartners();
    const { t } = useLanguage();
    const { onboarding: ot } = t.partners;

    const [agreement, setAgreement] = useState(false);
    const [formData, setFormData] = useState<PartnerApplicationFormData>({
        name: "",
        contact: "",
        bankName: "",
        accountNumber: "",
        birthDate: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [localError, setLocalError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                <p className="text-zinc-400">
                    {ot.success}
                </p>
                <button
                    onClick={() => router.push("/")}
                    className="px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors"
                >
                    {t.board.backToList}
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-12 max-w-3xl mx-auto">
            <section className="space-y-6">
                <h2 className="text-xl font-bold border-b border-zinc-800 pb-2">1. {ot.agreementTitle}</h2>
                <AgreementText />
                <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={agreement}
                        onChange={(e) => setAgreement(e.target.checked)}
                        className="w-5 h-5 rounded border-zinc-700 bg-zinc-900 checked:bg-white checked:border-white transition-all cursor-pointer focus:ring-0"
                    />
                    <span className="text-zinc-300 group-hover:text-white transition-colors">{ot.agreeCheckbox}</span>
                </label>
            </section>

            <section className="space-y-8">
                <h2 className="text-xl font-bold border-b border-zinc-800 pb-2">2. {ot.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label={ot.name} name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                    <InputField label={ot.contact} name="contact" value={formData.contact} onChange={handleChange} placeholder="+1 ..." type="tel" required />
                    <InputField label={ot.bankName} name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Wells Fargo / SWIFT" required />
                    <InputField label={ot.accountNumber} name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="123456789" required />
                    <InputField label={ot.birthDate} name="birthDate" value={formData.birthDate} onChange={handleChange} placeholder="900101" maxLength={10} required />
                </div>
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

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

function InputField({ label, ...props }: InputFieldProps) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1">{label}</label>
            <input
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
                {...props}
            />
        </div>
    );
}
