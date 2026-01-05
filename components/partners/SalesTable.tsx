'use client';

import { PartnerSale } from '@/types/partner';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, Clock } from 'lucide-react';

interface SalesTableProps {
    sales: PartnerSale[];
    loading?: boolean;
}

export default function SalesTable({ sales, loading }: SalesTableProps) {
    const { t } = useLanguage();
    const d = t.partners.dashboard;

    if (loading) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="flex justify-center">
                    <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    if (sales.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <p className="text-gray-500">{d.table.noSales}</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                {d.table.date}
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                {d.table.product}
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                                {d.table.sales}
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                                {d.table.commission}
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                                {d.table.settlement}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sales.map((sale) => (
                            <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {sale.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {sale.product}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                                    ${sale.amount.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-green-600">
                                    ${sale.commission.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {sale.isPaid ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                            <CheckCircle size={12} />
                                            {d.table.completed}
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                            <Clock size={12} />
                                            {d.table.pending}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
