export interface PartnerApplication {
    uid: string;
    email: string | null;
    name: string;
    contact: string;
    bankName: string;
    accountNumber: string;
    birthDate: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
    agreedAt: string;
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
