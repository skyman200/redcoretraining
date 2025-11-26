'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BoardCard, { posts as defaultPosts } from '@/components/BoardCard';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

function BoardPage() {
    const { t } = useLanguage();
    const [allPosts, setAllPosts] = useState(defaultPosts);

    useEffect(() => {
        // Load admin posts from localStorage
        const savedPosts = localStorage.getItem('admin_posts');
        if (savedPosts) {
            const adminPosts = JSON.parse(savedPosts);
            // Combine admin posts with default posts
            setAllPosts([...adminPosts, ...defaultPosts]);
        }
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

            <main className="pt-32 pb-20 px-6">
                <div className="container mx-auto">
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
                                transition={{ delay: index * 0.1 }}
                            >
                                <BoardCard post={post} />
                            </motion.div>
                        ))}
                    </div>
                </div>
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
