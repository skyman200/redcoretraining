"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { partnersApi } from "@/services/api/partnersApi";
import { PartnerApplication } from "@/types/partner";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, UserX, CheckCircle, Clock, Trash2, Search, X, AlertTriangle } from "lucide-react";

interface ConfirmModalState {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    confirmColor: "green" | "red" | "orange";
    onConfirm: () => void;
}

export default function AdminPartnerManagementPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const m = t.admin.modal;
    const [partners, setPartners] = useState<PartnerApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [confirmModal, setConfirmModal] = useState<ConfirmModalState>({
        isOpen: false,
        title: "",
        message: "",
        confirmText: "",
        confirmColor: "green",
        onConfirm: () => { },
    });

    const openConfirmModal = (config: Omit<ConfirmModalState, "isOpen">) => {
        setConfirmModal({ ...config, isOpen: true });
    };

    const closeConfirmModal = () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
    };

    const fetchPartners = async () => {
        setLoading(true);
        const result = await partnersApi.getAllApplications();
        if (result.data) {
            setPartners(result.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        const isAuth = sessionStorage.getItem("admin_auth");
        if (!isAuth) {
            router.push("/admin");
            return;
        }
        setTimeout(() => {
            fetchPartners();
        }, 0);
    }, [router]);

    const handleUpdateStatus = (uid: string, status: PartnerApplication["status"]) => {
        const isApprove = status === "approved";
        openConfirmModal({
            title: isApprove ? m.approve : m.reject,
            message: isApprove ? m.approveMsg : m.rejectMsg,
            confirmText: isApprove ? m.approveBtn : m.rejectBtn,
            confirmColor: isApprove ? "green" : "orange",
            onConfirm: async () => {
                const result = await partnersApi.updateStatus(uid, status);
                if (!result.error) {
                    setPartners(prev => prev.map(p => p.uid === uid ? { ...p, status } : p));
                }
                closeConfirmModal();
            },
        });
    };

    const handleDelete = (uid: string) => {
        openConfirmModal({
            title: m.delete,
            message: m.deleteMsg,
            confirmText: m.deleteBtn,
            confirmColor: "red",
            onConfirm: async () => {
                const result = await partnersApi.deleteApplication(uid);
                if (!result.error) {
                    setPartners(prev => prev.filter(p => p.uid !== uid));
                }
                closeConfirmModal();
            },
        });
    };

    const filteredPartners = partners.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-black text-white py-6 px-6">
                <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-2">
                            <ArrowLeft size={16} /> 대시보드로 돌아가기
                        </Link>
                        <h1 className="text-3xl font-bold">파트너 관리</h1>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="이름 또는 이메일 검색"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-red-600 transition-all w-full md:w-64"
                        />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 flex-grow">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
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
                                        {filteredPartners.map((partner) => (
                                            <motion.tr
                                                key={partner.uid}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                className="hover:bg-gray-50 transition-colors"
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
                                                                    onClick={(e) => { e.stopPropagation(); handleUpdateStatus(partner.uid, "approved"); }}
                                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                    title="승인"
                                                                >
                                                                    <CheckCircle size={18} />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => { e.stopPropagation(); handleUpdateStatus(partner.uid, "rejected"); }}
                                                                    className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                                    title="거절"
                                                                >
                                                                    <UserX size={18} />
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={(e) => { e.stopPropagation(); handleDelete(partner.uid); }}
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
                        {filteredPartners.length === 0 && (
                            <div className="py-20 text-center text-gray-500">
                                검색 결과가 없습니다.
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Confirm Modal */}
            <AnimatePresence>
                {confirmModal.isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        onClick={closeConfirmModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-full ${confirmModal.confirmColor === "red" ? "bg-red-100" :
                                    confirmModal.confirmColor === "orange" ? "bg-orange-100" :
                                        "bg-green-100"
                                    }`}>
                                    <AlertTriangle className={`w-5 h-5 ${confirmModal.confirmColor === "red" ? "text-red-600" :
                                        confirmModal.confirmColor === "orange" ? "text-orange-600" :
                                            "text-green-600"
                                        }`} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{confirmModal.title}</h3>
                            </div>
                            <p className="text-gray-600 mb-6">{confirmModal.message}</p>
                            <div className="flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={closeConfirmModal}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    {m.cancel}
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmModal.onConfirm}
                                    className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${confirmModal.confirmColor === "red" ? "bg-red-600 hover:bg-red-700" :
                                        confirmModal.confirmColor === "orange" ? "bg-orange-600 hover:bg-orange-700" :
                                            "bg-green-600 hover:bg-green-700"
                                        }`}
                                >
                                    {confirmModal.confirmText}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function StatusBadge({ status, labels }: { status: PartnerApplication["status"]; labels: { approved: string; pending: string; rejected: string } }) {
    switch (status) {
        case "approved":
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle size={12} /> {labels.approved}
                </span>
            );
        case "pending":
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Clock size={12} /> {labels.pending}
                </span>
            );
        case "rejected":
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <UserX size={12} /> {labels.rejected}
                </span>
            );
    }
}
