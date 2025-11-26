'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Database, Smartphone, TrendingUp, Users } from 'lucide-react';

function WorkPage() {
    const { t } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-white text-black"
        >
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
                            <span className="bg-gradient-to-r from-black via-red-600 to-black bg-clip-text text-transparent">
                                {t.work.hero.title}
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {t.work.hero.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Digital Healthcare Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <span className="inline-block px-4 py-2 bg-black text-white text-xs uppercase font-bold tracking-wider mb-6">
                            {t.work.digitalHealth.subtitle}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            {t.work.digitalHealth.title}
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="p-8 bg-white border border-gray-200 rounded-lg">
                                <Smartphone className="w-12 h-12 mb-4 text-red-600" />
                                <h3 className="text-2xl font-bold mb-4">{t.work.digitalHealth.appTitle}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {t.work.digitalHealth.appDevelopment}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="p-8 bg-white border border-gray-200 rounded-lg">
                                <Database className="w-12 h-12 mb-4 text-red-600" />
                                <h3 className="text-2xl font-bold mb-4">{t.work.digitalHealth.dataTitle}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {t.work.digitalHealth.dataValidation}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-12 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl"
                    >
                        <p className="text-xl md:text-2xl leading-relaxed font-medium">
                            {t.work.digitalHealth.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-center mb-16"
                    >
                        {t.work.expertise.title}
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Users className="w-16 h-16" />,
                                title: t.work.expertise.item1Title,
                                desc: t.work.expertise.item1Desc
                            },
                            {
                                icon: <TrendingUp className="w-16 h-16" />,
                                title: t.work.expertise.item2Title,
                                desc: t.work.expertise.item2Desc
                            },
                            {
                                icon: <Database className="w-16 h-16" />,
                                title: t.work.expertise.item3Title,
                                desc: t.work.expertise.item3Desc
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 border border-black hover:bg-black hover:text-white transition-all duration-500 group"
                            >
                                <div className="text-red-600 group-hover:text-red-400 mb-6 transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-gray-600 group-hover:text-gray-300 leading-relaxed transition-colors">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Transformation Data Section */}
            <section className="py-20 bg-black text-white">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            {t.work.transformation.title}
                        </h2>
                        <p className="text-xl text-gray-400 mb-12">
                            {t.work.transformation.subtitle}
                        </p>

                        {/* Placeholder for future data visualization */}
                        <div className="p-20 border border-white/20 rounded-lg flex flex-col items-center justify-center gap-6 bg-white/5">
                            <TrendingUp className="w-20 h-20 text-red-500" />
                            <p className="text-2xl font-medium text-gray-300">
                                {t.work.transformation.comingSoon}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </motion.div>
    );
}

export default function WorkPageWrapper() {
    return (
        <LanguageProvider>
            <WorkPage />
        </LanguageProvider>
    );
}
