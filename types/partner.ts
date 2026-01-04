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
