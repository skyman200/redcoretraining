'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatsCard from '@/components/partners/StatsCard';
import SalesTable from '@/components/partners/SalesTable';
import MonthSelector from '@/components/partners/MonthSelector';
import { motion } from 'framer-motion';
import { Lock, Copy, Check, Link, FileText, ArrowLeft } from 'lucide-react';
import PageTransitionLink from '@/components/PageTransitionLink';
import { salesApi } from '@/services/api/salesApi';
import { PartnerStats, PartnerSale } from '@/types/partner';

export default function PartnerDashboardPage() {
    const { user, partnerData, loading: authLoading } = useAuth();
    const router = useRouter();

    // Stats state
    const [stats, setStats] = useState<PartnerStats | null>(null);
    const [sales, setSales] = useState<PartnerSale[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Date filter state
    const now = new Date();
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);

    // Copy link state
    const [copied, setCopied] = useState(false);

    const isApproved = partnerData?.status === 'approved';
    const partnerId = partnerData?.name?.toLowerCase().replace(/\s+/g, '_') || '';

    const loadDashboardData = useCallback(async () => {
        if (!isApproved || !partnerId) return;

        setLoading(true);
        setError(null);

        try {
            // Load partner stats
            const statsResult = await salesApi.getPartnerStats(partnerId);
            if (statsResult.data) {
                setStats(statsResult.data);
                setSales(statsResult.data.recentSales || []);
            } else if (statsResult.error) {
                setError(statsResult.error.message);
            }
        } catch (err) {
            setError('데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    }, [isApproved, partnerId]);

    const loadMonthlySales = useCallback(async () => {
        if (!isApproved || !partnerId) return;

        try {
            const result = await salesApi.getMonthlySales(partnerId, selectedYear, selectedMonth);
            if (result.data) {
                setSales(result.data);
            }
        } catch (err) {
            console.error('Monthly sales load error:', err);
        }
    }, [isApproved, partnerId, selectedYear, selectedMonth]);

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push('/partners/login');
                return;
            }
            loadDashboardData();
        }
    }, [user, authLoading, router, loadDashboardData]);

    useEffect(() => {
        if (stats) {
            loadMonthlySales();
        }
    }, [selectedYear, selectedMonth, stats, loadMonthlySales]);

    const handleCopyLink = async () => {
        const link = salesApi.generatePartnerLink(partnerId);
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isApproved) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <main className="flex-grow pt-32 pb-20 px-6">
                    <div className="container mx-auto max-w-2xl text-center">
                        <div className="bg-white p-12 rounded-2xl shadow-xl border border-gray-100">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 text-red-600">
                                <Lock size={40} />
                            </div>
                            <h1 className="text-3xl font-bold mb-4">접근 권한이 없습니다</h1>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                대시보드는 승인된 파트너만 이용 가능합니다.<br />
                                신청 상태를 확인하시거나, 아직 신청하지 않으셨다면 파트너 신청을 진행해 주세요.
                            </p>
                            <PageTransitionLink
                                href="/partners/onboarding"
                                className="inline-block px-8 py-4 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-all"
                            >
                                파트너 신청하기
                            </PageTransitionLink>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <PageTransitionLink
                            href="/partners/board"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-4"
                        >
                            <ArrowLeft size={16} />
                            게시판으로 돌아가기
                        </PageTransitionLink>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold">파트너 대시보드</h1>
                                <p className="text-gray-500 mt-1">
                                    안녕하세요, <span className="font-semibold text-black">{partnerData?.name}</span>님
                                </p>
                            </div>
                            <button
                                onClick={handleCopyLink}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                                {copied ? '복사됨!' : '파트너 링크 복사'}
                            </button>
                        </div>
                    </motion.div>

                    {/* Stats Cards */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                                    <div className="h-8 bg-gray-200 rounded w-3/4" />
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 text-red-700">
                            {error}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                        >
                            <StatsCard
                                title="총 매출"
                                value={`$${(stats?.totalSales || 0).toLocaleString()}`}
                                subtitle={`${stats?.salesCount || 0}건`}
                                icon="sales"
                                variant="info"
                            />
                            <StatsCard
                                title="총 커미션 (20%)"
                                value={`$${(stats?.totalCommission || 0).toLocaleString()}`}
                                icon="commission"
                                variant="default"
                            />
                            <StatsCard
                                title="정산 완료"
                                value={`$${(stats?.paidCommission || 0).toLocaleString()}`}
                                icon="paid"
                                variant="success"
                            />
                            <StatsCard
                                title="미정산"
                                value={`$${(stats?.pendingCommission || 0).toLocaleString()}`}
                                icon="pending"
                                variant="warning"
                            />
                        </motion.div>
                    )}

                    {/* Sales Table Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <FileText size={20} />
                                판매 내역
                            </h2>
                            <MonthSelector
                                selectedYear={selectedYear}
                                selectedMonth={selectedMonth}
                                onYearChange={setSelectedYear}
                                onMonthChange={setSelectedMonth}
                            />
                        </div>
                        <SalesTable sales={sales} loading={loading} />
                    </motion.div>

                    {/* Partner Link Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 bg-white rounded-2xl border border-gray-200 p-6"
                    >
                        <h3 className="font-bold mb-3 flex items-center gap-2">
                            <Link size={18} />
                            내 파트너 링크
                        </h3>
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                readOnly
                                value={salesApi.generatePartnerLink(partnerId)}
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 truncate"
                            />
                            <button
                                onClick={handleCopyLink}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            이 링크를 통해 가입한 사용자의 구매에 대해 20% 커미션이 적립됩니다.
                        </p>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
