"use client";

import React, { useMemo } from "react";
import { PartnerApplicationFormData } from "@/types/partner";
import { LanguageRegion, getBankFieldType, BANK_FIELD_CONFIGS } from "@/lib/partnerConstants";

interface InternationalFormProps {
    formData: PartnerApplicationFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    languageRegion: LanguageRegion;
}

// Countries list for dropdown
const COUNTRIES = [
    "United States", "Japan", "Germany", "Spain", "France", "United Kingdom",
    "Canada", "Australia", "Netherlands", "Italy", "Austria", "Switzerland",
    "Belgium", "Sweden", "Mexico", "Brazil", "Argentina", "Chile", "Colombia",
    "Portugal", "Ireland", "Poland", "Czech Republic", "Denmark", "Norway",
    "Finland", "Singapore", "Hong Kong", "Taiwan", "Philippines", "Thailand",
    "Vietnam", "Indonesia", "Malaysia", "India", "Other",
];

export default function InternationalPartnerForm({ formData, onChange, languageRegion }: InternationalFormProps) {
    const bankFieldType = useMemo(() => {
        return getBankFieldType(formData.country || "");
    }, [formData.country]);

    const bankConfig = BANK_FIELD_CONFIGS[bankFieldType];

    // Labels based on language region
    const labels = useMemo(() => getLabels(languageRegion), [languageRegion]);

    return (
        <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label={labels.fullName}
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    placeholder={labels.fullNamePlaceholder}
                    required
                />
                <InputField
                    label={labels.birthDate}
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={onChange}
                    placeholder="1990-01-01"
                    required
                />
                <InputField
                    label={labels.passportOrTaxId}
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={onChange}
                    placeholder={labels.passportPlaceholder}
                    required
                />
                <SelectField
                    label={labels.country}
                    name="country"
                    value={formData.country}
                    onChange={onChange}
                    options={COUNTRIES}
                    placeholder={labels.countryPlaceholder}
                    required
                />
                <InputField
                    label={labels.email}
                    name="contact"
                    value={formData.contact}
                    onChange={onChange}
                    placeholder="email@example.com"
                    type="email"
                    required
                />
            </div>

            {/* Payout Information */}
            <div className="border-t border-zinc-800 pt-6">
                <h3 className="text-lg font-semibold text-zinc-300 mb-4">{labels.payoutTitle}</h3>
                <div className="grid grid-cols-1 gap-6">
                    <InputField
                        label={labels.wiseEmail}
                        name="wiseEmail"
                        value={formData.wiseEmail}
                        onChange={onChange}
                        placeholder={labels.wiseEmailPlaceholder}
                        description={labels.wiseDescription}
                    />

                    {/* Dynamic Bank Fields */}
                    {!formData.wiseEmail && (
                        <DynamicBankFields
                            formData={formData}
                            onChange={onChange}
                            bankConfig={bankConfig}
                            labels={labels}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

interface DynamicBankFieldsProps {
    formData: PartnerApplicationFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    bankConfig: typeof BANK_FIELD_CONFIGS[keyof typeof BANK_FIELD_CONFIGS];
    labels: ReturnType<typeof getLabels>;
}

function DynamicBankFields({ formData, onChange, bankConfig, labels }: DynamicBankFieldsProps) {
    return (
        <div className="bg-zinc-900/30 p-4 rounded-xl space-y-4 border border-zinc-800">
            <p className="text-sm text-zinc-400 mb-2">{labels.bankDetailsNote}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label={labels.bankName}
                    name="bankName"
                    value={formData.bankName}
                    onChange={onChange}
                    placeholder={labels.bankNamePlaceholder}
                />

                {/* Code 1 - Routing/Branch/SWIFT */}
                <InputField
                    label={bankConfig.code1Label}
                    name="swiftCode"
                    value={formData.swiftCode}
                    onChange={onChange}
                    placeholder={bankConfig.code1Placeholder}
                />

                {/* Code 2 - Account Number/IBAN */}
                <InputField
                    label={bankConfig.code2Label}
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={onChange}
                    placeholder={bankConfig.code2Placeholder}
                />

                {/* Extra Field (Japan: Katakana, USA: Account Type, Others: Bank Address) */}
                {bankConfig.extraField && (
                    bankConfig.extraField.name === "accountType" ? (
                        <SelectField
                            label={bankConfig.extraField.label}
                            name="accountType"
                            value={formData.accountType}
                            onChange={onChange}
                            options={["Checking", "Savings"]}
                            placeholder={bankConfig.extraField.placeholder}
                            required={bankConfig.extraField.required}
                        />
                    ) : (
                        <InputField
                            label={bankConfig.extraField.label}
                            name={bankConfig.extraField.name}
                            value={
                                bankConfig.extraField.name === "accountHolderKatakana"
                                    ? formData.accountHolderKatakana
                                    : formData.bankAddress
                            }
                            onChange={onChange}
                            placeholder={bankConfig.extraField.placeholder}
                            required={bankConfig.extraField.required}
                        />
                    )
                )}

                {/* Branch Name & Code for Japan */}
                {getBankFieldType(formData.country || "") === "japan" && (
                    <>
                        <InputField
                            label="Branch Name (支店名)"
                            name="branchName"
                            value={formData.branchName}
                            onChange={onChange}
                            placeholder="渋谷支店"
                        />
                        <InputField
                            label="Branch Code (支店コード)"
                            name="branchCode"
                            value={formData.branchCode}
                            onChange={onChange}
                            placeholder="123"
                        />
                    </>
                )}
            </div>
        </div>
    );
}

// Input Field Component
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

// Select Field Component
interface SelectFieldProps {
    label: string;
    name: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    placeholder?: string;
    required?: boolean;
}

function SelectField({ label, name, value, onChange, options, placeholder, required }: SelectFieldProps) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1">{label}</label>
            <select
                name={name}
                value={value || ""}
                onChange={onChange}
                required={required}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
            >
                <option value="" disabled className="text-zinc-600">{placeholder || "Select..."}</option>
                {options.map(opt => (
                    <option key={opt} value={opt} className="bg-zinc-900">{opt}</option>
                ))}
            </select>
        </div>
    );
}

// Labels by language region
function getLabels(region: LanguageRegion) {
    const labelMap: Record<LanguageRegion, Record<string, string>> = {
        ko: {
            fullName: "성명",
            fullNamePlaceholder: "홍길동",
            birthDate: "생년월일 (YYYY-MM-DD)",
            passportOrTaxId: "여권번호 또는 외국인등록번호",
            passportPlaceholder: "여권번호",
            country: "거주 국가",
            countryPlaceholder: "국가 선택",
            email: "이메일 주소",
            payoutTitle: "지급 정보 (Wise)",
            wiseEmail: "Wise 계정 이메일 (선택)",
            wiseEmailPlaceholder: "가장 빠른 지급 방법",
            wiseDescription: "Wise 계정이 있으면 이메일을 입력하세요.",
            bankDetailsNote: "Wise를 사용하지 않는 경우 은행 정보를 입력하세요:",
            bankName: "은행명",
            bankNamePlaceholder: "은행명",
        },
        en: {
            fullName: "Full Legal Name",
            fullNamePlaceholder: "John Doe (As per ID)",
            birthDate: "Date of Birth (YYYY-MM-DD)",
            passportOrTaxId: "Passport No. (or Tax ID)",
            passportPlaceholder: "Passport No.",
            country: "Country of Residence",
            countryPlaceholder: "Select Country",
            email: "Email Address",
            payoutTitle: "Payout Information (Wise)",
            wiseEmail: "Wise Account Email (Optional)",
            wiseEmailPlaceholder: "Fastest way to get paid",
            wiseDescription: "If you have a Wise account, enter your email here.",
            bankDetailsNote: "If you don't use Wise, provide your bank details:",
            bankName: "Bank Name",
            bankNamePlaceholder: "Bank Name",
        },
        ja: {
            fullName: "氏名",
            fullNamePlaceholder: "山田 太郎",
            birthDate: "生年月日 (YYYY-MM-DD)",
            passportOrTaxId: "パスポート番号 / マイナンバー",
            passportPlaceholder: "パスポート番号",
            country: "居住国",
            countryPlaceholder: "国を選択",
            email: "メールアドレス",
            payoutTitle: "支払情報 (Wise)",
            wiseEmail: "Wiseアカウントメール (任意)",
            wiseEmailPlaceholder: "最速の支払い方法",
            wiseDescription: "Wiseアカウントをお持ちの場合はメールを入力してください。",
            bankDetailsNote: "Wiseを使用しない場合は銀行情報を入力してください:",
            bankName: "銀行名",
            bankNamePlaceholder: "銀行名",
        },
        es: {
            fullName: "Nombre Legal Completo",
            fullNamePlaceholder: "Juan García",
            birthDate: "Fecha de Nacimiento (YYYY-MM-DD)",
            passportOrTaxId: "No. Pasaporte (o ID Fiscal)",
            passportPlaceholder: "RFC/CPF/RUT",
            country: "País de Residencia",
            countryPlaceholder: "Seleccionar País",
            email: "Correo Electrónico",
            payoutTitle: "Información de Pago (Wise)",
            wiseEmail: "Email de Cuenta Wise (Opcional)",
            wiseEmailPlaceholder: "Forma más rápida de pago",
            wiseDescription: "Si tiene cuenta Wise, ingrese su email aquí.",
            bankDetailsNote: "Si no usa Wise, proporcione sus datos bancarios:",
            bankName: "Nombre del Banco",
            bankNamePlaceholder: "Nombre del Banco",
        },
        de: {
            fullName: "Vollständiger Name",
            fullNamePlaceholder: "Max Mustermann",
            birthDate: "Geburtsdatum (YYYY-MM-DD)",
            passportOrTaxId: "Reisepass-Nr. (oder Steuer-ID)",
            passportPlaceholder: "Reisepass-Nr.",
            country: "Wohnsitzland",
            countryPlaceholder: "Land auswählen",
            email: "E-Mail-Adresse",
            payoutTitle: "Auszahlungsinformationen (Wise)",
            wiseEmail: "Wise-Konto E-Mail (Optional)",
            wiseEmailPlaceholder: "Schnellste Auszahlungsmethode",
            wiseDescription: "Wenn Sie ein Wise-Konto haben, geben Sie Ihre E-Mail ein.",
            bankDetailsNote: "Wenn Sie Wise nicht nutzen, geben Sie Ihre Bankdaten an:",
            bankName: "Bankname",
            bankNamePlaceholder: "Bankname",
        },
    };
    return labelMap[region];
}
