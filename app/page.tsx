'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';
import Footer from '@/components/Footer';
import FacadeAnimation from '@/components/FacadeAnimation';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function Home() {
  return (
    <LanguageProvider>
      <FacadeAnimation />
      <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
        <Header />
        <Hero />
        <ProjectGrid />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
