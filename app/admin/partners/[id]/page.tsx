'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { salesApi } from '@/services/api/salesApi';
import { partnersApi } from '@/services/api/partnersApi';
import { PartnerSale, PartnerStats, PartnerApplication } from '@/types/partner';
import PartnerDashboardView from '@/components/partners/PartnerDashboardView';

export default function AdminPartnerDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { t } = useLanguage();
    const partnerId = params.id as string;

    // Data State
    const [profile, setProfile] = useState<PartnerApplication | undefined>(undefined);
    const [stats, setStats] = useState<PartnerStats | null>(null);
    const [sales, setSales] = useState<PartnerSale[]>([]);

    // UI State
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filters
    const now = new Date();
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);

    // Misc
    const [copied, setCopied] = useState(false);

    // Fetch all data
    const loadData = useCallback(async () => {
        if (!partnerId) return;
        setLoading(true);
        setError(null);

        try {
            // 1. Fetch Profile
            const profileResult = await partnersApi.getApplication(partnerId);
            if (profileResult.error) throw new Error(profileResult.error.message);
            setProfile(profileResult.data);

            // 2. Fetch Stats
            const statsResult = await salesApi.getPartnerStats(partnerId);
            if (statsResult.data) {
                setStats(statsResult.data);
                setSales(statsResult.data.recentSales || []);
            } else if (statsResult.error) {
                console.error("Stats error:", statsResult.error);
                // Don't block UI if stats fail, just show empty
            }

            // 3. Fetch Monthly Sales (for initially selected month if stats exist)
            // Validated inside useEffect below
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [partnerId]);

    // Fetch monthly sales when date changes
    const loadMonthlySales = useCallback(async () => {
        if (!partnerId) return;
        try {
            const result = await salesApi.getMonthlySales(partnerId, selectedYear, selectedMonth);
            if (result.data) {
                setSales(result.data);
            }
        } catch (err) {
            console.error('Monthly sales load error:', err);
        }
    }, [partnerId, selectedYear, selectedMonth]);

    useEffect(() => {
        // Auth check
        const isAuth = sessionStorage.getItem('admin_auth');
        if (!isAuth) {
            router.push('/admin');
            return;
        }

        loadData();
    }, [router, loadData]);

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

    return (
        <PartnerDashboardView
            stats={stats}
            sales={sales}
            partnerProfile={profile}
            partnerName={profile?.name || 'Unknown Partner'}
            partnerId={partnerId}
            loading={loading}
            error={error}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            linkCopied={copied}
            onYearChange={setSelectedYear}
            onMonthChange={setSelectedMonth}
            onCopyLink={handleCopyLink}
            onBack={() => router.push('/admin/partners')}
            isAdminView={true}
            t={t}
        />
    );
}
