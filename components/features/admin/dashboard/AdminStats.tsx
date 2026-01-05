'use client';

import { useEffect, useState } from 'react';
import { adminApi, AdminStatsData } from '@/services/api/adminApi';
import { DollarSign, RefreshCw, TrendingUp, ShoppingBag, Info } from 'lucide-react';

export default function AdminStats() {
    const [stats, setStats] = useState<AdminStatsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const pin = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';
            if (!pin) {
                setError('Admin configuration missing');
                setLoading(false);
                return;
            }

            const result = await adminApi.getStats(pin);
            if (result.success && result.data) {
                setStats(result.data);
            } else {
                setError(result.error || 'Failed to load stats');
            }
            setLoading(false);
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-pulse">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded-xl" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-red-700 flex items-center gap-2">
                <Info size={20} />
                <p>통계 로드 실패: {error}</p>
            </div>
        );
    }

    if (!stats) return null;

    const cards = [
        {
            title: '총 매출 (Gross)',
            value: `$${stats.grossSales.toLocaleString()}`,
            subtext: `총 거래 ${stats.totalTxCount}건`,
            icon: DollarSign,
            color: 'bg-blue-600',
            textColor: 'text-blue-600'
        },
        {
            title: '환불 총액',
            value: `-$${Math.abs(stats.refundAmount).toLocaleString()}`,
            subtext: `환불 ${stats.refundCount}건`,
            icon: RefreshCw,
            color: 'bg-red-600',
            textColor: 'text-red-600'
        },
        {
            title: '순 매출 (Net)',
            value: `$${stats.netSales.toLocaleString()}`,
            subtext: '환불 차감 후',
            icon: ShoppingBag,
            color: 'bg-green-600',
            textColor: 'text-green-600'
        },
        {
            title: '플랫폼 순수익',
            value: `$${stats.profit.toLocaleString()}`,
            subtext: `파트너 지급액 제외 ($${stats.totalCommission.toLocaleString()})`,
            icon: TrendingUp,
            color: 'bg-purple-600',
            textColor: 'text-purple-600'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
                            <h3 className={`text-2xl font-bold ${card.textColor}`}>{card.value}</h3>
                        </div>
                        <div className={`p-3 rounded-lg ${card.color} bg-opacity-10`}>
                            <card.icon className={`w-6 h-6 ${card.textColor}`} />
                        </div>
                    </div>
                    <div className="text-xs text-gray-400">
                        {card.subtext}
                    </div>
                </div>
            ))}
        </div>
    );
}
