'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BoardCard from '@/components/BoardCard';
import { defaultPosts } from '@/lib/boardData';
import DataChart from '@/components/DataChart';
import { motion, AnimatePresence } from 'framer-motion';
import { postsApi } from '@/services/api/postsApi';
import { Post } from '@/types/post';


function BoardPage() {
    const { t } = useLanguage();
    const [posts, setPosts] = useState<Post[]>(defaultPosts as any[]);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [showAnimation, setShowAnimation] = useState(true);

    const loadPosts = useCallback(async () => {
        const result = await postsApi.getAll();
        if (result.data) {
            // Filter out 'Partner' category for general board
            const publicPosts = result.data.filter(p => p.category !== 'Partner');
            setPosts([...publicPosts, ...defaultPosts] as any[]);
        }
    }, []);

    useEffect(() => {
        loadPosts();

        // End animation after duration
        const timer = setTimeout(() => {
            setAnimationComplete(true);
            setShowAnimation(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, [loadPosts]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-white text-black"
        >
            <Header />

            <main className="pt-32 pb-20 px-6 relative">
                {/* Main Content */}
                <div className="container mx-auto">
                    <div className="text-center mb-16 relative h-24 md:h-32">
                        {/* Placeholder to reserve space */}

                        <AnimatePresence>
                            {showAnimation ? (
                                <motion.div
                                    key="overlay-title"
                                    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.5 } }}
                                >
                                    <motion.h1
                                        layoutId="board-title"
                                        className="text-5xl md:text-7xl font-bold tracking-tighter"
                                        initial={{ scale: 1.5, opacity: 0 }}
                                        animate={{ scale: 1.5, opacity: 1 }}
                                        exit={{ scale: 1, opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                                        transition={{ duration: 1.0, ease: "easeInOut" }}
                                    >
                                        <span className="bg-gradient-to-r from-black via-red-600 to-black dark:from-white dark:via-red-400 dark:to-white bg-clip-text text-transparent">
                                            {t.board.title}
                                        </span>
                                    </motion.h1>
                                </motion.div>
                            ) : (
                                <motion.h1
                                    layoutId="board-title"
                                    className="text-5xl md:text-7xl font-bold tracking-tighter absolute inset-0 flex items-center justify-center"
                                    initial={{ scale: 1.2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <span className="bg-gradient-to-r from-black via-red-600 to-black dark:from-white dark:via-red-400 dark:to-white bg-clip-text text-transparent">
                                        {t.board.title}
                                    </span>
                                </motion.h1>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                        className="text-xl text-gray-500 max-w-2xl mx-auto text-center mb-16"
                    >
                        {t.board.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto"
                    >
                        <DataChart
                            title="Pain Reduction Rate"
                            variant="gemini"
                            data={[
                                { label: 'Neck', value: 92 },
                                { label: 'Back', value: 96 },
                                { label: 'Shoulder', value: 88 },
                                { label: 'Knee', value: 94 },
                            ]}
                        />
                        <DataChart
                            title="Posture Improvement"
                            variant="gemini"
                            data={[
                                { label: 'Spine', value: 97 },
                                { label: 'Pelvis', value: 89 },
                                { label: 'Shoulder', value: 93 },
                            ]}
                        />
                    </motion.div>



                    <motion.div
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{
                            opacity: animationComplete ? 1 : 0,
                            filter: animationComplete ? "blur(0px)" : "blur(10px)"
                        }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (index * 0.1) }}
                            >
                                <BoardCard post={post as any} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </main>

            <Footer />
        </motion.div>
    );
}

export default BoardPage;
