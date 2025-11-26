'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Activity, Heart, TrendingUp, Target } from 'lucide-react';

function AboutPage() {
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
            <section className="pt-32 pb-20 px-6 bg-black text-white">
                <div className="container mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="inline-block px-4 py-2 bg-red-600 text-white text-xs uppercase font-bold tracking-wider mb-6">
                            {t.about.hero.since}
                        </span>
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight"
                            initial={{ scale: 2.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                        >
                            {t.about.hero.title}
                        </motion.h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed">
                            {t.about.hero.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Professional Expertise */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            <span className="bg-gradient-to-r from-black via-red-600 to-black bg-clip-text text-transparent">
                                {t.about.professional.title}
                            </span>
                        </h2>
                        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                            <p className="font-medium text-xl text-black">
                                {t.about.professional.description}
                            </p>
                            <p>{t.about.professional.detail1}</p>
                            <p>{t.about.professional.detail2}</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Digital Healthcare */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            {t.about.digital.title}
                        </h2>
                        <p className="text-xl text-gray-700 mb-8 font-medium">
                            {t.about.digital.description}
                        </p>
                        <div className="space-y-6">
                            {t.about.digital.features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 bg-white border-l-4 border-red-600 rounded-r-lg"
                                >
                                    <p className="text-gray-700 leading-relaxed">{feature}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* DNS & Rehab Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold mb-6">{t.about.dns.title}</h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                {t.about.dns.description}
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                {t.about.dns.detail}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold mb-6">{t.about.rehab.title}</h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                {t.about.rehab.description}
                            </p>
                            <ul className="space-y-4">
                                {t.about.rehab.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-red-600 rounded-full" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Breathing & Movement Research */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            <span className="bg-gradient-to-r from-black via-red-600 to-black bg-clip-text text-transparent">
                                {t.about.breathing.title}
                            </span>
                        </h2>
                        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                            <p className="font-medium text-xl text-black">
                                {t.about.breathing.description}
                            </p>
                            <p>{t.about.breathing.methods}</p>
                            <p>{t.about.breathing.application}</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-black text-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-center mb-16"
                    >
                        Our Values
                    </motion.h2>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: <Activity />, label: t.about.values.value1 },
                            { icon: <TrendingUp />, label: t.about.values.value2 },
                            { icon: <Heart />, label: t.about.values.value3 },
                            { icon: <Target />, label: t.about.values.value4 }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-8 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <div className="text-red-500 mb-4 flex justify-center">
                                    {value.icon}
                                </div>
                                <p className="text-lg font-bold">{value.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </motion.div>
    );
}

export default AboutPage;
