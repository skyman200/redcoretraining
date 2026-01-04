'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { en } from '@/locales/en';
import { ko } from '@/locales/ko';

type Language = 'en' | 'ko';
type Translations = typeof en;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const translations: Record<Language, Translations> = {
        en,
        ko,
    };

    const contextValue: LanguageContextType = {
        language,
        setLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
