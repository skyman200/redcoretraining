'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Check, Copy, FileText, Link, LogOut } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatsCard from '@/components/partners/StatsCard';
import SalesTable from '@/components/partners/SalesTable';
import MonthSelector from '@/components/partners/MonthSelector';
import PageTransitionLink from '@/components/PageTransitionLink';
import { PartnerSale, PartnerStats, PartnerApplication } from '@/types/partner';
import { salesApi } from '@/services/api/salesApi';
import SettlementHistory from '@/components/features/partners/SettlementHistory';

interface PartnerDashboardViewProps {
    // Data
    stats: PartnerStats | null;
    sales: PartnerSale[];
    partnerProfile?: PartnerApplication; // Extra data for admin view
    partnerName: string;
    partnerId: string;

    // State
    loading: boolean;
    error: string | null;
    selectedYear: number;
    selectedMonth: number;
    linkCopied: boolean;

    // Actions
    onYearChange: (year: number) => void;
    onMonthChange: (month: number) => void;
    onCopyLink: () => void;
    onLogout?: () => void;
    onBack?: () => void; // Optional back handler

    // Config
    isAdminView?: boolean;
    t: any; // Translation object
}

export default function PartnerDashboardView({
    stats,
    sales,
    partnerProfile,
    partnerName,
    partnerId,
    loading,
    error,
    selectedYear,
    selectedMonth,
    linkCopied,
    onYearChange,
    onMonthChange,
    onCopyLink,
    onLogout,
    onBack,
    isAdminView = false,
    t
}: PartnerDashboardViewProps) {
    const d = t.partners.dashboard;

    // Sensitive Info Section (Only visible if partnerProfile is provided, mainly for Admin)
    const renderSensitiveInfo = () => {
        if (!partnerProfile) return null;

        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8"
            >
                <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2">
                    🔒 파트너 상세 정보 (관리자 전용)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <span className="block text-xs text-yellow-600 mb-1">이름</span>
                        <span className="font-medium text-yellow-900">{partnerProfile.name}</span>
                    </div>
                    <div>
                        <span className="block text-xs text-yellow-600 mb-1">연락처</span>
                        <span className="font-medium text-yellow-900">{partnerProfile.contact}</span>
                    </div>
                    <div>
                        <span className="block text-xs text-yellow-600 mb-1">주민등록번호</span>
                        <span className="font-medium text-yellow-900">{partnerProfile.residentRegistrationNumber}</span>
                    </div>
                    <div>
                        <span className="block text-xs text-yellow-600 mb-1">계좌정보</span>
                        <span className="font-medium text-yellow-900">
                            {partnerProfile.bankName} {partnerProfile.accountNumber}
                        </span>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header only for non-admin view, or simplified for admin */}
            {!isAdminView && <Header />}

            <main className={`flex-grow ${isAdminView ? 'pt-8' : 'pt-32'} pb-20 px-6`}>
                <div className="container mx-auto max-w-6xl">

                    {/* Extra Info for Admin */}
                    {renderSensitiveInfo()}

                    {/* Dashboard Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        {/* Back Button Logic */}
                        {isAdminView ? (
                            <button
                                onClick={onBack}
                                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-4"
                            >
                                <ArrowLeft size={16} /> 파트너 목록으로
                            </button>
                        ) : (
                            <PageTransitionLink
                                href="/partners/board"
                                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-4"
                            >
                                <ArrowLeft size={16} />
                                {d.backToBoard}
                            </PageTransitionLink>
                        )}

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold">{d.title}</h1>
                                <p className="text-gray-500 mt-1">
                                    {d.greeting} <span className="font-semibold text-black">{partnerName}</span>
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={onCopyLink}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                >
                                    {linkCopied ? <Check size={18} /> : <Copy size={18} />}
                                    {linkCopied ? d.copied : d.copyLink}
                                </button>
                                {onLogout && (
                                    <button
                                        onClick={onLogout}
                                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut size={18} />
                                    </button>
                                )}
                            </div>
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
                                title={d.stats.totalSales}
                                value={`$${(stats?.totalSales || 0).toLocaleString()}`}
                                subtitle={`${stats?.salesCount || 0} ${d.stats.salesCount}`}
                                icon="sales"
                                variant="info"
                            />
                            <StatsCard
                                title={d.stats.totalCommission}
                                value={`$${(stats?.totalCommission || 0).toLocaleString()}`}
                                icon="commission"
                                variant="default"
                            />
                            <StatsCard
                                title={d.stats.paidCommission}
                                value={`$${(stats?.paidCommission || 0).toLocaleString()}`}
                                icon="paid"
                                variant="success"
                            />
                            <StatsCard
                                title={d.stats.pendingCommission}
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
                                {d.salesHistory}
                            </h2>
                            <MonthSelector
                                selectedYear={selectedYear}
                                selectedMonth={selectedMonth}
                                onYearChange={onYearChange}
                                onMonthChange={onMonthChange}
                            />
                        </div>
                        <SalesTable sales={sales} loading={loading} />
                    </motion.div>

                    {/* Settlement History (Admin View) */}
                    {partnerProfile && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="mt-8"
                        >
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                                <FileText size={20} />
                                {d?.salesHistory ? "Settlement History" : "Settlement History / Invoices"}
                            </h2>
                            <SettlementHistory
                                partnerId={partnerId}
                                partnerProfile={partnerProfile}
                                isAdminView={isAdminView}
                            />
                        </motion.div>
                    )}

                    {/* Partner Link Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 bg-white rounded-2xl border border-gray-200 p-6"
                    >
                        <h3 className="font-bold mb-3 flex items-center gap-2">
                            <Link size={18} />
                            {d.myLink}
                        </h3>
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                readOnly
                                value={salesApi.generatePartnerLink(partnerId)}
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 truncate"
                            />
                            <button
                                onClick={onCopyLink}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                {linkCopied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            {d.linkDescription}
                        </p>
                    </motion.div>
                </div>
            </main>

            {!isAdminView && <Footer />}
        </div>
    );
}
