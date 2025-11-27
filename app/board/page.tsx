'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BoardCard, { posts as defaultPosts } from '@/components/BoardCard';
import DataChart from '@/components/DataChart';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import FileUpload from '@/components/FileUpload';

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

    const handleUploadComplete = (file: any) => {
        const newPost = {
            id: `upload-${Date.now()}`,
            title: file.name,
            excerpt: 'User uploaded file via Board page.',
            date: new Date().toISOString().split('T')[0],
            category: 'Uploads',
            image: '/hero.jpg', // Default image
            files: [{ name: file.name, url: file.downloadLink }]
        };

        const updatedPosts = [newPost, ...allPosts];
        setAllPosts(updatedPosts);

        // Update localStorage
        const currentAdminPosts = JSON.parse(localStorage.getItem('admin_posts') || '[]');
        localStorage.setItem('admin_posts', JSON.stringify([newPost, ...currentAdminPosts]));
    };

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
                                    exit={{ opacity: 0, transition: { duration: 0.5, delay: 1 } }}
                                >
                                    <motion.h1
                                        layoutId="board-title"
                                        className="text-5xl md:text-7xl font-bold tracking-tighter"
                                        initial={{ scale: 3, opacity: 0 }}
                                        animate={{ scale: 3, opacity: 1 }}
                                        exit={{ scale: 1, opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
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

                    {/* File Upload Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.0, duration: 0.8 }}
                        className="max-w-2xl mx-auto mb-16 p-6 bg-white rounded-xl shadow-sm border border-gray-100"
                    >
                        <h3 className="text-xl font-bold mb-4">Upload New Resource</h3>
                        <FileUpload onUploadComplete={handleUploadComplete} />
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
                        {allPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (index * 0.1) }}
                            >
                                <BoardCard post={post} />
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
