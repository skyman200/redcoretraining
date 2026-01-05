// Cloud Function URL (breathing app과 동일한 서버)
const CLOUD_FUNCTION_BASE = "https://us-central1-soom-edb0e.cloudfunctions.net";

export interface AdminStatsData {
    grossSales: number;
    netSales: number;
    totalCommission: number;
    refundAmount: number;
    refundCount: number;
    totalTxCount: number;
    profit: number;
}

export const adminApi = {
    getStats: async (pin: string): Promise<{ success: boolean; data?: AdminStatsData; error?: string }> => {
        try {
            const response = await fetch(`${CLOUD_FUNCTION_BASE}/getAdminStats`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pin }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result as { success: boolean; data?: AdminStatsData; error?: string };

        } catch (error: any) {
            console.error('Failed to fetch admin stats:', error);
            return {
                success: false,
                error: error.message || '통계 정보를 불러오는 중 오류가 발생했습니다.'
            };
        }
    }
};
