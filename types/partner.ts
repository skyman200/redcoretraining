import { LanguageRegion } from "@/lib/partnerConstants";

export interface PartnerApplication {
    uid: string;
    email: string | null;
    name: string;
    type: "domestic" | "international";
    languageRegion: LanguageRegion; // e.g. "ko", "en", "ja"
    country?: string;
    wiseEmail?: string; // Optional (if using Wise account)
    swiftCode?: string; // For bank transfer via Wise
    bankAddress?: string; // For bank transfer via Wise
    // Japan specific
    branchName?: string;
    branchCode?: string;
    accountType?: string; // Changed from strict union to string to allow flexibility
    accountHolderKatakana?: string;

    passportNumber?: string; // Instead of RRN
    contact: string;
    bankName: string;
    accountNumber: string;
    residentRegistrationNumber?: string; // Optional for international
    birthDate: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
    agreedAt: string;
}

// Partner Payout / Settlement History
export interface PartnerPayout {
    id: string;
    partnerId: string;
    amount: number;
    currency: string;
    status: 'pending' | 'paid';
    periodStart: string;
    periodEnd: string;
    description?: string;
    paidAt?: string;
    createdAt: string;
}

export type PartnerApplicationFormData = Omit<PartnerApplication, "uid" | "email" | "status" | "createdAt" | "agreedAt">;

// Sales & Statistics Types
export interface PartnerSale {
    id: string;
    date: string;
    product: string;
    amount: number;
    currency: string;
    commission: number;
    isPaid: boolean;
    status?: 'paid' | 'pending' | 'refunded';
}

export interface MonthlyStats {
    totalSales: number;
    totalCommission: number;
    count: number;
}

export interface PartnerStats {
    partnerId: string;
    totalSales: number;
    totalCommission: number;
    paidCommission: number;
    pendingCommission: number;
    salesCount: number;
    recentSales: PartnerSale[];
    monthlySales: Record<string, MonthlyStats>;
}
