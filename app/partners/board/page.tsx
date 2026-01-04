"use client";

import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Lock, FileText, Bell, Users } from "lucide-react";

export default function PartnerBoardPage() {
    const { user, partnerData, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/partners/login");
            } else if (!partnerData || partnerData.status !== "approved") {
                // If not approved or no application, redirect to onboarding or show access denied
                // For now, let's just let them see an "Access Pending" state if they have an application
            }
        }
    }, [user, partnerData, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) return null;

    const isApproved = partnerData?.status === "approved";

    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {!isApproved ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800 backdrop-blur-sm"
                        >
                            <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lock className="w-10 h-10 text-zinc-500" />
                            </div>
                            <h1 className="text-3xl font-bold mb-4">접근 제한</h1>
                            <p className="text-zinc-400 max-w-md mx-auto">
                                파트너 전용 게시판은 승인된 파트너만 이용 가능합니다.<br />
                                관리자의 승인을 기다려 주시거나 고객센터로 문의해 주세요.
                            </p>
                        </motion.div>
                    ) : (
                        <div className="space-y-12">
                            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-red-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Partner Only</span>
                                        <h1 className="text-4xl font-bold tracking-tighter">파트너스 게시판</h1>
                                    </div>
                                    <p className="text-zinc-400">레드코어와 파트너를 위한 전용 정보 및 자료실입니다.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-zinc-900 px-4 py-2 border border-zinc-800 rounded-xl text-xs font-mono">
                                        <span className="text-zinc-500">ID:</span> {user.email?.split('@')[0]}
                                    </div>
                                    <div className="bg-zinc-900 px-4 py-2 border border-zinc-800 rounded-xl text-xs font-mono">
                                        <span className="text-zinc-500">STATUS:</span> <span className="text-green-500 uppercase">Approved</span>
                                    </div>
                                </div>
                            </header>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <BoardSection
                                    icon={<Bell className="w-5 h-5" />}
                                    title="파트너 공지사항"
                                    items={[
                                        { title: "2024년 1분기 정산 일정 안내", date: "2024.03.15" },
                                        { title: "파트너 가이드라인 업데이트", date: "2024.03.10" }
                                    ]}
                                />
                                <BoardSection
                                    icon={<FileText className="w-5 h-5" />}
                                    title="마케팅 자료실"
                                    items={[
                                        { title: "레드코어 브랜드 킷 (Brand Kit)", date: "2024.02.20" },
                                        { title: "홍보용 고화질 이미지 팩", date: "2024.02.18" }
                                    ]}
                                />
                                <BoardSection
                                    icon={<Users className="w-5 h-5" />}
                                    title="네트워크 & 협업"
                                    items={[
                                        { title: "협력 네트워크 가입 신청서", date: "2024.01.05" },
                                        { title: "기술 지원 및 FAQ", date: "2023.12.28" }
                                    ]}
                                />
                            </div>

                            <section className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                    실시간 업데이트
                                </h2>
                                <div className="text-zinc-500 text-sm py-10 text-center border-2 border-dashed border-zinc-800 rounded-2xl">
                                    현재 준비 중인 콘텐츠가 없습니다.
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

function BoardSection({ icon, title, items }: { icon: React.ReactNode, title: string, items: { title: string, date: string }[] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-300">
                    {icon}
                </div>
                <h3 className="font-bold">{title}</h3>
            </div>
            <ul className="space-y-4">
                {items.map((item, idx) => (
                    <li key={idx} className="group cursor-pointer">
                        <p className="text-sm font-medium group-hover:text-red-500 transition-colors mb-1 line-clamp-1">{item.title}</p>
                        <span className="text-[10px] text-zinc-600 font-mono">{item.date}</span>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}
