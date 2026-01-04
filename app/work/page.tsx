'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Database, Smartphone, TrendingUp, Users } from 'lucide-react';
import DataChart from '@/components/DataChart';

function WorkPage() {
    const { t } = useLanguage();
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationComplete(true);
        }, 1800);
        return () => clearTimeout(timer);
    }, []);

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
                    <motion.h1
                        initial={{
                            scale: 5,
                            opacity: 0,
                            y: "30vh"
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 1.5,
                            ease: "easeOut",
                            delay: 0.2
                        }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight"
                    >
                        <span className="bg-gradient-to-r from-black via-red-600 to-black bg-clip-text text-transparent whitespace-pre-line block">
                            {t.work.hero.title}
                        </span>
                    </motion.h1>
                    {animationComplete && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                        >
                            {t.work.hero.subtitle}
                        </motion.p>
                    )}
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



            {/* App Development Timeline */}
            <section className="py-20 bg-black text-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            {t.work.app.title}
                        </h2>
                    </motion.div>

                    <div className="relative border-l border-gray-700 ml-4 md:ml-0 md:pl-0 md:border-l-0 md:border-t md:pt-12 md:grid md:grid-cols-4 gap-8">
                        {t.work.app.timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="mb-12 md:mb-0 pl-8 md:pl-0 relative"
                            >
                                <div className="absolute left-0 top-0 w-3 h-3 bg-red-600 rounded-full -translate-x-[7px] md:translate-x-0 md:-top-[53px] md:left-1/2 md:-translate-x-1/2" />
                                <span className="text-red-500 font-bold text-sm tracking-wider block mb-2">
                                    {item.year}
                                </span>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Transformation Data Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                            {t.work.transformation.title}
                        </h2>
                        <p className="text-xl text-gray-600">
                            {t.work.transformation.subtitle}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <DataChart
                            title={t.work.transformation.painReduction}
                            data={[
                                { label: 'Neck', value: 92 },
                                { label: 'Back', value: 96 },
                                { label: 'Shoulder', value: 88 },
                                { label: 'Knee', value: 94 }
                            ]}
                        />
                        <DataChart
                            title={t.work.transformation.postureImprovement}
                            data={[
                                { label: 'Spine', value: 97, color: 'bg-black' },
                                { label: 'Pelvis', value: 89, color: 'bg-black' },
                                { label: 'Shoulder', value: 93, color: 'bg-black' }
                            ]}
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </motion.div>
    );
}

export default WorkPage;
