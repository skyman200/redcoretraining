import { supabase } from "../supabase/client";
import { PartnerPayout } from "@/types/partner";
import { ApiResult } from "@/types/api";

const TABLE_NAME = "partner_payouts";

export const payoutsApi = {
    async getPayouts(partnerId: string): Promise<ApiResult<PartnerPayout[]>> {
        if (!supabase) return { error: new Error("Supabase not initialized") };

        try {
            const { data, error } = await supabase
                .from(TABLE_NAME)
                .select('*')
                .eq('partner_id', partnerId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const payouts: PartnerPayout[] = (data || []).map(row => ({
                id: row.id,
                partnerId: row.partner_id,
                amount: row.amount,
                currency: row.currency,
                status: row.status,
                periodStart: row.period_start,
                periodEnd: row.period_end,
                description: row.description,
                paidAt: row.paid_at,
                createdAt: row.created_at,
            }));

            return { data: payouts, error: null };
        } catch (error) {
            return { error: error as Error };
        }
    },

    // Optional: For Admin to create payout manually (if needed via UI)
    async createPayout(payout: Omit<PartnerPayout, 'id' | 'createdAt' | 'paidAt'>): Promise<ApiResult<void>> {
        if (!supabase) return { error: new Error("Supabase not initialized") };

        try {
            const { error } = await supabase
                .from(TABLE_NAME)
                .insert({
                    partner_id: payout.partnerId,
                    amount: payout.amount,
                    currency: payout.currency,
                    status: payout.status,
                    period_start: payout.periodStart,
                    period_end: payout.periodEnd,
                    description: payout.description,
                });

            if (error) throw error;
            return { data: undefined, error: null };
        } catch (error) {
            return { error: error as Error };
        }
    }
};
