'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BoardCard, { posts as defaultPosts } from '@/components/BoardCard';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

function BoardPage() {
    const { t } = useLanguage();
    const [allPosts, setAllPosts] = useState(defaultPosts);
    const [showAnimation, setShowAnimation] = useState(true);
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        // Load admin posts from localStorage
        const savedPosts = localStorage.getItem('admin_posts');
        if (savedPosts) {
            const adminPosts = JSON.parse(savedPosts);
            setAllPosts([...adminPosts, ...defaultPosts]);
        }

        // Start animation
        setShowAnimation(true);
        setAnimationComplete(false);

        // End animation after duration
        const timer = setTimeout(() => {
            setShowAnimation(false);
            setAnimationComplete(true);
        }, 1800);

        return () => clearTimeout(timer);
    }, []);

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
                {/* Animated Title Overlay */}
                <AnimatePresence>
                    {showAnimation && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="fixed inset-0 z-40 flex items-center justify-center bg-white"
                        >
                            <motion.h1
                                initial={{ scale: 3, opacity: 1 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1, opacity: 0 }}
                                transition={{
                                    scale: { duration: 1.5, ease: "easeInOut" },
                                    opacity: { duration: 0.3, delay: 1.5 }
                                }}
                                className="text-5xl md:text-7xl font-bold tracking-tighter"
                            >
                                <span className="bg-gradient-to-r from-black via-red-600 to-black bg-clip-text text-transparent">
                                    {t.board.title}
                                </span>
                            </motion.h1>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{
                        opacity: showAnimation ? 0 : 1,
                        filter: showAnimation ? "blur(10px)" : "blur(0px)"
                    }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                    className="container mx-auto"
                >
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                            <span className="bg-gradient-to-r from-black via-red-600 to-black dark:from-white dark:via-red-400 dark:to-white bg-clip-text text-transparent">
                                {t.board.title}
                            </span>
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            {t.board.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.8 + (index * 0.1) }}
                            >
                                <BoardCard post={post} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </main>

            <Footer />
        </motion.div>
    );
}

export default function BoardPageWrapper() {
    return (
        <LanguageProvider>
            <BoardPage />
        </LanguageProvider>
    );
}
