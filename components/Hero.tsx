'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import EmblemParticles from './EmblemParticles';

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-10 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <EmblemParticles />
            </div>
            <div className="container mx-auto z-10 relative">
                <h1 className="text-[12vw] leading-[0.9] font-bold tracking-tighter text-balance uppercase">
                    <span className="bg-gradient-to-r from-black via-gray-700 to-black dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
                        {t.hero.title1}
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent animate-gradient">
                        {t.hero.title2}
                    </span>
                    <br />
                    {t.hero.title3}
                </h1>
                <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <p className="max-w-md text-lg md:text-xl font-medium leading-relaxed text-gray-500">
                        {t.hero.subtitle}
                    </p>
                    <div className="animate-bounce">
                        <span className="text-sm font-bold uppercase tracking-widest">{t.hero.scrollDown}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
