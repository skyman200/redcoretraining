import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Trash2, UserX } from 'lucide-react';
import { PartnerApplication } from '@/types/partner';
import { SensitiveText } from './SensitiveText';
import { StatusBadge } from './StatusBadge';
import { useRouter } from 'next/navigation';

interface PartnerTableProps {
    partners: PartnerApplication[];
    onUpdateStatus: (uid: string, status: PartnerApplication["status"]) => void;
    onDelete: (uid: string) => void;
    t: any; // Translation
}

export function PartnerTable({ partners, onUpdateStatus, onDelete, t }: PartnerTableProps) {
    const router = useRouter();

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">파트너</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">연락처/계좌</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">상태</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">신청일</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <AnimatePresence>
                            {partners.map((partner) => (
                                <motion.tr
                                    key={partner.uid}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    onClick={() => router.push(`/admin/partners/${partner.uid}`)}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900">{partner.name}</span>
                                            <span className="text-xs text-gray-500">{partner.email}</span>
                                            <span className="text-[10px] text-gray-400 mt-1 font-mono">UID: {partner.uid.slice(0, 8)}...</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col text-sm">
                                            <span>{partner.contact}</span>
                                            <span className="text-xs text-gray-500">{partner.bankName} {partner.accountNumber}</span>
                                            <SensitiveText text={partner.residentRegistrationNumber} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={partner.status} labels={t.admin.status} />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(partner.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {partner.status === "pending" && (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); onUpdateStatus(partner.uid, "approved"); }}
                                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                        title="승인"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); onUpdateStatus(partner.uid, "rejected"); }}
                                                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                        title="거절"
                                                    >
                                                        <UserX size={18} />
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); onDelete(partner.uid); }}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="삭제"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
            {partners.length === 0 && (
                <div className="py-20 text-center text-gray-500">
                    검색 결과가 없습니다.
                </div>
            )}
        </div>
    );
}
