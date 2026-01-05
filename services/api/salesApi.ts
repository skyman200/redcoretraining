/**
 * Partner Sales API
 * 
 * Cloud Function을 통해 Firestore의 판매 데이터를 조회합니다.
 */

import { PartnerStats, PartnerSale, MonthlyStats } from "@/types/partner";
import { ApiResult } from "@/types/api";

// Cloud Function URL (breathing app과 동일한 서버)
const CLOUD_FUNCTION_BASE = "https://us-central1-soom-edb0e.cloudfunctions.net";

// API Response Types (any 타입 제거)
interface PartnerDashboardResponse {
    partnerId?: string;
    totalSales?: number;
    totalCommission?: number;
    paidCommission?: number;
    pendingCommission?: number;
    salesCount?: number;
    recentSales?: SaleResponse[];
    monthlySales?: Record<string, MonthlyStats>;
    error?: string;
}

interface SaleResponse {
    id?: string;
    date?: string;
    product?: string;
    amount?: number;
    currency?: string;
    commission?: number;
    isPaid?: boolean;
}

interface MonthlySalesResponse {
    sales?: SaleResponse[];
    error?: string;
}

// Helper function to map API response to PartnerSale type
const mapSaleResponse = (sale: SaleResponse): PartnerSale => ({
    id: sale.id ?? "",
    date: sale.date ?? "",
    product: sale.product ?? "",
    amount: sale.amount ?? 0,
    currency: sale.currency ?? "USD",
    commission: sale.commission ?? 0,
    isPaid: sale.isPaid ?? false,
});

export const salesApi = {
    /**
     * 파트너 대시보드 통계 조회
     */
    async getPartnerStats(partnerId: string): Promise<ApiResult<PartnerStats>> {
        try {
            const response = await fetch(`${CLOUD_FUNCTION_BASE}/getPartnerDashboard`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ partnerId }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("[salesApi] Server Error:", errorData);
                throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result: PartnerDashboardResponse = await response.json();

            if (result.error) {
                throw new Error(result.error);
            }

            const stats: PartnerStats = {
                partnerId: result.partnerId ?? partnerId,
                totalSales: result.totalSales ?? 0,
                totalCommission: result.totalCommission ?? 0,
                paidCommission: result.paidCommission ?? 0,
                pendingCommission: result.pendingCommission ?? 0,
                salesCount: result.salesCount ?? 0,
                recentSales: (result.recentSales ?? []).map(mapSaleResponse),
                monthlySales: result.monthlySales ?? {},
            };

            return { data: stats, error: null };
        } catch (error) {
            console.error("[salesApi] getPartnerStats error:", error);
            return { error: error as Error };
        }
    },

    /**
     * 월별 판매 내역 조회
     */
    async getMonthlySales(
        partnerId: string,
        year: number,
        month: number
    ): Promise<ApiResult<PartnerSale[]>> {
        try {
            const response = await fetch(`${CLOUD_FUNCTION_BASE}/getPartnerMonthlySales`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ partnerId, year, month }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: MonthlySalesResponse = await response.json();

            if (result.error) {
                throw new Error(result.error);
            }

            const sales: PartnerSale[] = (result.sales ?? []).map(mapSaleResponse);

            return { data: sales, error: null };
        } catch (error) {
            console.error("[salesApi] getMonthlySales error:", error);
            return { error: error as Error };
        }
    },

    /**
     * 파트너 링크 생성
     */
    generatePartnerLink(partnerId: string): string {
        const ONELINK_SUBDOMAIN = "soom";
        const ONELINK_TEMPLATE = process.env.NEXT_PUBLIC_ONELINK_TEMPLATE_ID || "Jt2p";

        return `https://${ONELINK_SUBDOMAIN}.onelink.me/${ONELINK_TEMPLATE}?af_sub1=${encodeURIComponent(partnerId)}&pid=partner&c=${encodeURIComponent(partnerId)}_campaign`;
    },
};
