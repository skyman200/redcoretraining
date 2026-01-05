"use client";

import React from "react";
import { PartnerApplicationFormData } from "@/types/partner";
import { useLanguage } from "@/contexts/LanguageContext";

interface DomesticFormProps {
    formData: PartnerApplicationFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DomesticPartnerForm({ formData, onChange }: DomesticFormProps) {
    const { t } = useLanguage();
    const { onboarding: ot } = t.partners;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label={ot.name} name="name" value={formData.name} onChange={onChange} placeholder="홍길동" required />
            <InputField label={ot.contact} name="contact" value={formData.contact} onChange={onChange} placeholder="010-1234-5678" type="tel" required />
            <InputField label={ot.bankName} name="bankName" value={formData.bankName} onChange={onChange} placeholder="은행명" required />
            <InputField label={ot.accountNumber} name="accountNumber" value={formData.accountNumber} onChange={onChange} placeholder="계좌번호" required />
            <InputField label={ot.birthDate} name="birthDate" value={formData.birthDate} onChange={onChange} placeholder="900101" maxLength={10} required />
            <InputField
                label={ot.rrn}
                name="residentRegistrationNumber"
                value={formData.residentRegistrationNumber}
                onChange={onChange}
                placeholder="123456-1234567"
                required
                description={ot.rrnDescription}
            />
        </div>
    );
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    description?: string;
}

function InputField({ label, description, ...props }: InputFieldProps) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1">{label}</label>
            <input
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light placeholder:text-zinc-600"
                {...props}
            />
            {description && (
                <p className="text-[11px] text-zinc-500 ml-1 leading-relaxed">
                    <span className="text-blue-400 mr-1">ℹ️</span>
                    {description}
                </p>
            )}
        </div>
    );
}
