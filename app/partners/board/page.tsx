'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BoardCard from '@/components/BoardCard';
import { motion } from 'framer-motion';
import { Lock, FileText, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { postsApi } from '@/services/api/postsApi';
import { Post } from '@/types/post';

export default function PartnerBoardPage() {
    const { user, partnerData, loading: authLoading } = useAuth();
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const isApproved = partnerData?.status === 'approved';

    const loadPartnerPosts = useCallback(async () => {
        if (!isApproved) return;

        setLoading(true);
        const result = await postsApi.getByCategory('Partner');
        if (result.data) {
            setPosts(result.data);
        }
        setLoading(false);
    }, [isApproved]);

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push('/partners/login');
                return;
            }
            loadPartnerPosts();
        }
    }, [user, authLoading, router, loadPartnerPosts]);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
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
                                파트너 게시판은 승인된 파트너만 이용 가능합니다.<br />
                                신청 상태를 확인하시거나, 아직 신청하지 않으셨다면 파트너 신청을 진행해 주세요.
                            </p>
                            <div className="flex flex-col gap-4">
                                <Link
                                    href="/partners/dashboard"
                                    className="px-8 py-4 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                                >
                                    <LayoutDashboard size={20} />
                                    대시보드로 이동
                                </Link>
                                <Link
                                    href="/partners"
                                    className="px-8 py-4 bg-white text-black border-2 border-black rounded-lg font-bold hover:bg-gray-50 transition-all"
                                >
                                    파트너십 안내
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

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
                                    <h1 className="text-4xl font-bold tracking-tighter">파트너스 게시판</h1>
                                </div>
                                <p className="text-gray-500">레드코어와 파트너를 위한 전용 정보 및 자료실입니다.</p>
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
                                    <BoardCard post={post as any} />
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
