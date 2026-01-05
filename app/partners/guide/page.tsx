'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageRegion } from '@/lib/partnerConstants';
import GuideContent from '@/components/features/partners/resources/GuideContent';
import { Globe } from 'lucide-react';

export default function PartnerGuidePage() {
    const [language, setLanguage] = useState<LanguageRegion>('en');

    const languages: { id: LanguageRegion; label: string }[] = [
        { id: 'en', label: 'English' },
        { id: 'ko', label: '한국어' },
        { id: 'ja', label: '日本語' },
        { id: 'es', label: 'Español' },
        { id: 'de', label: 'Deutsch' },
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-red-900 selection:text-white">
            <Header />

            <main className="pt-32 px-6">
                <div className="container mx-auto max-w-4xl">
                    {/* Language Switcher */}
                    <div className="flex justify-end mb-12">
                        <div className="inline-flex items-center bg-zinc-900 rounded-full p-1 border border-zinc-800">
                            <div className="px-3 text-zinc-500">
                                <Globe size={16} />
                            </div>
                            {languages.map((lang) => (
                                <button
                                    key={lang.id}
                                    onClick={() => setLanguage(lang.id)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${language === lang.id
                                            ? 'bg-zinc-700 text-white shadow-lg'
                                            : 'text-zinc-400 hover:text-white'
                                        }`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <GuideContent languageRegion={language} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
