'use client';

import React, { useEffect, useState } from 'react';
import { payoutsApi } from '@/services/api/payoutsApi';
import { PartnerPayout, PartnerApplication } from '@/types/partner';
import { FileText, Download, AlertCircle } from 'lucide-react';
import PaymentStatement from './PaymentStatement';

interface SettlementHistoryProps {
    partnerId: string;
    partnerProfile: PartnerApplication;
    isAdminView?: boolean;
}

export default function SettlementHistory({ partnerId, partnerProfile, isAdminView = false }: SettlementHistoryProps) {
    const [payouts, setPayouts] = useState<PartnerPayout[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPayout, setSelectedPayout] = useState<PartnerPayout | null>(null);

    useEffect(() => {
        if (!partnerId) return;

        const loadPayouts = async () => {
            setLoading(true);
            try {
                const { data } = await payoutsApi.getPayouts(partnerId);
                if (data) setPayouts(data);
            } catch (err) {
                console.error("Failed to load payouts", err);
            } finally {
                setLoading(false);
            }
        };
        loadPayouts();
    }, [partnerId]);

    if (loading) return <div className="h-20 animate-pulse bg-gray-100 rounded-xl" />;

    if (payouts.length === 0) {
        return (
            <div className="bg-white border boundary-gray-200 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="text-gray-400" size={20} />
                </div>
                <h3 className="text-gray-900 font-medium">No Settlement History</h3>
                <p className="text-sm text-gray-500 mt-1">
                    {isAdminView
                        ? "Record a payout to generate a statement."
                        : "Settlements will appear here once processed."}
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Period / Date</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Description</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Amount</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-center">Statement</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {payouts.map((payout) => (
                                <tr key={payout.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">
                                                {new Date(payout.periodStart).toLocaleDateString()} - {new Date(payout.periodEnd).toLocaleDateString()}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                Paid: {payout.paidAt ? new Date(payout.paidAt).toLocaleDateString() : '-'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {payout.description || "Sales Commission"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${payout.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {payout.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-900">
                                        {payout.currency} {payout.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => setSelectedPayout(payout)}
                                            className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors inline-flex items-center gap-1 text-xs"
                                        >
                                            <FileText size={16} />
                                            <span>View</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedPayout && (
                <PaymentStatement
                    isOpen={!!selectedPayout}
                    onClose={() => setSelectedPayout(null)}
                    payout={selectedPayout}
                    partner={partnerProfile}
                />
            )}
        </>
    );
}
