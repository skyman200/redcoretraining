"use client";

import React from "react";
import { PartnerApplicationFormData } from "@/types/partner";

interface InternationalFormProps {
    formData: PartnerApplicationFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InternationalPartnerForm({ formData, onChange }: InternationalFormProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Full Legal Name" name="name" value={formData.name} onChange={onChange} placeholder="John Doe (As per ID)" required />
                <InputField label="Date of Birth (YYYY-MM-DD)" name="birthDate" value={formData.birthDate} onChange={onChange} placeholder="1990-01-01" required />
                <InputField label="Passport No. (or Tax ID)" name="passportNumber" value={formData.passportNumber} onChange={onChange} placeholder="Passport No." required />
                <InputField label="Country of Residence" name="country" value={formData.country} onChange={onChange} placeholder="United States" required />
                <InputField label="Email Address" name="contact" value={formData.contact} onChange={onChange} placeholder="email@example.com" type="email" required />
            </div>

            <div className="border-t border-zinc-800 pt-6">
                <h3 className="text-lg font-semibold text-zinc-300 mb-4">Payout Information (Wise)</h3>
                <div className="grid grid-cols-1 gap-6">
                    <InputField
                        label="Wise Account Email (Optional)"
                        name="wiseEmail"
                        value={formData.wiseEmail}
                        onChange={onChange}
                        placeholder="Fastest way to get paid"
                        description="If you have a Wise account, enter your email here."
                    />

                    {!formData.wiseEmail && (
                        <div className="bg-zinc-900/30 p-4 rounded-xl space-y-4 border border-zinc-800">
                            <p className="text-sm text-zinc-400 mb-2">If you don't use Wise, provide your bank details:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={onChange} placeholder="Bank Name" />
                                <InputField label="Swift / BIC Code" name="swiftCode" value={formData.swiftCode} onChange={onChange} placeholder="SWIFT CODE" />
                                <InputField label="Account Number (IBAN)" name="accountNumber" value={formData.accountNumber} onChange={onChange} placeholder="Account No." />
                                <InputField label="Bank Address (City/Country)" name="bankAddress" value={formData.bankAddress} onChange={onChange} placeholder="City, Country" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
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
