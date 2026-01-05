/**
 * Partner Language Region Constants
 * 언어권별 파트너 설정 상수
 */

export type LanguageRegion = "ko" | "en" | "ja" | "es" | "de";

export interface LanguageRegionConfig {
    label: string;
    locale: string;
    currency: string;
    description: string;
    flag: string;
}

export const LANGUAGE_REGIONS: Record<LanguageRegion, LanguageRegionConfig> = {
    ko: {
        label: "내국인",
        locale: "ko",
        currency: "KRW",
        description: "대한민국 거주 (원화 지급)",
        flag: "🇰🇷",
    },
    en: {
        label: "English",
        locale: "en",
        currency: "USD",
        description: "English-speaking countries (USD Payout)",
        flag: "🇺🇸",
    },
    ja: {
        label: "日本語",
        locale: "ja",
        currency: "JPY",
        description: "日本在住 (USD/JPY Payout)",
        flag: "🇯🇵",
    },
    es: {
        label: "Español",
        locale: "es",
        currency: "USD",
        description: "Países hispanohablantes (USD Payout)",
        flag: "🇪🇸",
    },
    de: {
        label: "Deutsch",
        locale: "de",
        currency: "EUR",
        description: "Deutschsprachige Länder (EUR Payout)",
        flag: "🇩🇪",
    },
};

/**
 * Country-specific bank field configurations
 * 국가별 은행 정보 필드 설정
 */
export type CountryBankFieldType = "usa" | "japan" | "eu" | "other";

export interface BankFieldConfig {
    code1Label: string;
    code1Placeholder: string;
    code2Label: string;
    code2Placeholder: string;
    extraField?: {
        name: string;
        label: string;
        placeholder: string;
        required: boolean;
    };
}

export const BANK_FIELD_CONFIGS: Record<CountryBankFieldType, BankFieldConfig> = {
    usa: {
        code1Label: "Routing Number",
        code1Placeholder: "9-digit ACH Routing Number",
        code2Label: "Account Number",
        code2Placeholder: "Account Number",
        extraField: {
            name: "accountType",
            label: "Account Type",
            placeholder: "Checking / Savings",
            required: true,
        },
    },
    japan: {
        code1Label: "Branch Code (支店コード)",
        code1Placeholder: "3-digit branch code",
        code2Label: "Account Number (口座番号)",
        code2Placeholder: "7-digit account number",
        extraField: {
            name: "accountHolderKatakana",
            label: "Account Holder (Katakana / カタカナ)",
            placeholder: "ヤマダ タロウ",
            required: true,
        },
    },
    eu: {
        code1Label: "BIC / SWIFT Code",
        code1Placeholder: "SWIFT/BIC Code",
        code2Label: "IBAN",
        code2Placeholder: "International Bank Account Number",
    },
    other: {
        code1Label: "SWIFT / BIC Code",
        code1Placeholder: "SWIFT/BIC Code",
        code2Label: "Account Number",
        code2Placeholder: "Account Number",
        extraField: {
            name: "bankAddress",
            label: "Bank Address",
            placeholder: "City, Country",
            required: false,
        },
    },
};

/**
 * EU countries list for bank field determination
 */
export const EU_COUNTRIES = [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
    "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
    "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
    "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden",
];

/**
 * Determine bank field type based on country
 */
export function getBankFieldType(country: string): CountryBankFieldType {
    const normalizedCountry = country.toLowerCase().trim();

    if (normalizedCountry === "united states" || normalizedCountry === "usa" || normalizedCountry === "us") {
        return "usa";
    }
    if (normalizedCountry === "japan" || normalizedCountry === "日本") {
        return "japan";
    }
    if (EU_COUNTRIES.some(c => c.toLowerCase() === normalizedCountry)) {
        return "eu";
    }
    return "other";
}
