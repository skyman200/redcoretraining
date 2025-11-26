'use client';

import Link from 'next/link';
import PageTransitionLink from '@/components/PageTransitionLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <PageTransitionLink href="/" className="text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
          REDCORE
        </PageTransitionLink>
        <nav className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
          <PageTransitionLink href="/work" className="hover:underline underline-offset-4 decoration-1">
            {t.header.work}
          </PageTransitionLink>
          <PageTransitionLink href="/board" className="hover:underline underline-offset-4 decoration-1">
            {t.header.board}
          </PageTransitionLink>
          <PageTransitionLink href="/about" className="hover:underline underline-offset-4 decoration-1">
            {t.header.about}
          </PageTransitionLink>
          <PageTransitionLink href="/contact" className="hover:underline underline-offset-4 decoration-1">
            {t.header.contact}
          </PageTransitionLink>
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
            className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-opacity"
            aria-label="Toggle language"
          >
            <Globe size={16} />
            <span>{language === 'en' ? 'KO' : 'EN'}</span>
          </button>
          <button className="md:hidden text-sm font-medium uppercase tracking-widest">
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
