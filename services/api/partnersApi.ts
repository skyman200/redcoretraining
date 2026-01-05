import { supabase } from "../supabase/client";
import { PartnerApplication, PartnerApplicationFormData } from "@/types/partner";
import { ApiResult } from "@/types/api";

const TABLE_NAME = "partner_applications";

export const partnersApi = {
    async submitApplication(
        uid: string,
        email: string | null,
        data: PartnerApplicationFormData
    ): Promise<ApiResult<PartnerApplication>> {
        if (!supabase) {
            return { error: new Error("Supabase not initialized") };
        }
        try {
            const application: PartnerApplication = {
                ...data,
                uid,
                email,
                status: "pending",
                createdAt: new Date().toISOString(),
                agreedAt: new Date().toISOString(),
            };

            const { error } = await supabase
                .from(TABLE_NAME)
                .upsert({
                    uid,
                    email,
                    name: data.name,
                    contact: data.contact,
                    bank_name: data.bankName,
                    account_number: data.accountNumber,
                    resident_registration_number: data.residentRegistrationNumber,
                    birth_date: data.birthDate,
                    status: 'pending',
                    // International Fields
                    type: data.type || 'domestic',
                    language_region: data.languageRegion || 'ko',
                    country: data.country,
                    wise_email: data.wiseEmail,
                    swift_code: data.swiftCode,
                    bank_address: data.bankAddress,
                    passport_number: data.passportNumber,
                    // Japan Specific
                    branch_name: data.branchName,
                    branch_code: data.branchCode,
                    account_type: data.accountType,
                    account_holder_katakana: data.accountHolderKatakana,

                });

            if (error) throw error;
            return { data: application, error: null };
        } catch (error) {
            return { error: error as Error };
        }
    },

    async getApplication(uid: string): Promise<ApiResult<PartnerApplication>> {
        if (!supabase) {
            return { error: new Error("Supabase not initialized") };
        }
        try {
            const { data, error } = await supabase
                .from(TABLE_NAME)
                .select('*')
                .eq('uid', uid)
                .maybeSingle();

            if (error) throw error;
            if (!data) return { data: undefined, error: null };

            return {
                data: {
                    uid: data.uid,
                    email: data.email,
                    name: data.name,
                    contact: data.contact,
                    bankName: data.bank_name,
                    accountNumber: data.account_number,
                    residentRegistrationNumber: data.resident_registration_number,
                    birthDate: data.birth_date,
                    status: data.status,
                    createdAt: data.created_at,
                    agreedAt: data.agreed_at,
                    // International Fields
                    type: data.type || 'domestic',
                    languageRegion: data.language_region || 'ko',
                    country: data.country,
                    wiseEmail: data.wise_email,
                    swiftCode: data.swift_code,
                    bankAddress: data.bank_address,
                    passportNumber: data.passport_number,
                    // Japan Specific
                    branchName: data.branch_name,
                    branchCode: data.branch_code,
                    accountType: data.account_type,
                    accountHolderKatakana: data.account_holder_katakana,

                },
                error: null
            };
        } catch (error) {
            return { error: error as Error };
        }
    },

    // Admin Functions
    async getAllApplications(): Promise<ApiResult<PartnerApplication[]>> {
        if (!supabase) {
            return { data: [], error: null };
        }
        try {
            const { data, error } = await supabase
                .from(TABLE_NAME)
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            const applications: PartnerApplication[] = (data || []).map(row => ({
                uid: row.uid,
                email: row.email,
                name: row.name,
                contact: row.contact,
                bankName: row.bank_name,
                accountNumber: row.account_number,
                residentRegistrationNumber: row.resident_registration_number,
                birthDate: row.birth_date,
                status: row.status,
                createdAt: row.created_at,
                agreedAt: row.agreed_at,
                // International Fields
                type: row.type || 'domestic',
                languageRegion: row.language_region || 'ko',
                country: row.country,
                wiseEmail: row.wise_email,
                swiftCode: row.swift_code,
                bankAddress: row.bank_address,
                passportNumber: row.passport_number,
                // Japan Specific
                branchName: row.branch_name,
                branchCode: row.branch_code,
                accountType: row.account_type,
                accountHolderKatakana: row.account_holder_katakana,

            }));

            return { data: applications, error: null };
        } catch (error) {
            return { error: error as Error };
        }
    },

    async updateStatus(uid: string, status: PartnerApplication["status"]): Promise<ApiResult<void>> {
        if (!supabase) {
            return { error: new Error("Supabase not initialized") };
        }
        try {
            const { error } = await supabase
                .from(TABLE_NAME)
                .update({ status })
                .eq('uid', uid);

            if (error) throw error;
            return { data: undefined, error: null };
        } catch (error) {
            return { error: error as Error };
        }
    },

    async deleteApplication(uid: string): Promise<ApiResult<void>> {
        if (!supabase) {
            return { error: new Error("Supabase not initialized") };
        }
        try {
            const { error } = await supabase
                .from(TABLE_NAME)
                .delete()
                .eq('uid', uid);

            if (error) throw error;
            return { data: undefined, error: null };
        } catch (error) {
            return { error: error as Error };
        }
    }
};
