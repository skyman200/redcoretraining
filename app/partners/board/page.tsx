'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BoardCard from '@/components/BoardCard';
import { motion } from 'framer-motion';
import { Lock, FileText, LogIn, LogOut, ArrowRight, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { postsApi } from '@/services/api/postsApi';
import { Post } from '@/types/post';

export default function PartnerBoardPage() {
    const { user, partnerData, loading: authLoading, logout } = useAuth();
    const { t } = useLanguage();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const isApproved = partnerData?.status === 'approved';
    const b = t.partners.board; // Short alias for board translations

    const loadPartnerPosts = useCallback(async () => {
        if (!isApproved) return;

        setLoading(true);
        try {
            const result = await postsApi.getByCategory('Partner');
            if (result.data) {
                setPosts(result.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [isApproved]);

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                // Not handled here, rendered in JSX
                return;
            }
            // If user is logged in but has no partnerData (e.g. deleted), redirect to onboarding
            if (!partnerData) {
                // Use window.location to ensure full refresh or just router
                // router is fine, but we need import
                window.location.href = '/partners/onboarding';
                return;
            }

            if (isApproved) {
                loadPartnerPosts();
            }
        }
    }, [user, partnerData, authLoading, isApproved, loadPartnerPosts]);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // 1. Not Logged In State
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <main className="flex-grow pt-32 pb-20 px-6">
                    <div className="container mx-auto max-w-2xl text-center">
                        <div className="bg-white p-12 rounded-2xl shadow-xl border border-gray-100">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-400">
                                <Lock size={40} />
                            </div>
                            <h1 className="text-3xl font-bold mb-4">{b.sections?.loginRequired || "로그인이 필요합니다"}</h1>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                {b.sections?.loginDesc || "파트너스 게시판을 이용하려면 로그인이 필요합니다."}
                            </p>
                            <Link
                                href="/partners/login"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-all"
                            >
                                <LogIn size={20} />
                                {b.sections?.login || "로그인"}
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // 2. Logged In but Not Approved State
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
                            <h1 className="text-3xl font-bold mb-4">{b.accessDenied}</h1>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                {b.accessDeniedDesc}
                            </p>
                            <div className="flex flex-col gap-4">
                                <Link
                                    href="/partners/dashboard"
                                    className="px-8 py-4 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                                >
                                    <LayoutDashboard size={20} />
                                    대시보드로 이동
                                </Link>
                                <button
                                    onClick={logout}
                                    className="px-8 py-4 bg-white text-black border-2 border-black rounded-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <LogOut size={20} />
                                    {b.sections?.logout || "로그아웃"}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // 3. Approved Partner State (Board View)
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="container mx-auto">
                    <div className="mb-16">
                        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-red-600 text-[10px] font-bold px-2 py-0.5 rounded text-white uppercase tracking-wider">Partner Only</span>
                                    <h1 className="text-4xl font-bold tracking-tighter">{b.title}</h1>
                                </div>
                                <p className="text-gray-500">{b.subtitle}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/partners/dashboard"
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors flex items-center gap-2"
                                >
                                    <LayoutDashboard size={16} />
                                    대시보드
                                </Link>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <LogOut size={16} />
                                    {b.sections?.logout || "로그아웃"}
                                </button>
                            </div>
                        </header>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-xl text-gray-500 font-medium">등록된 게시글이 없습니다</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <BoardCard post={post} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
