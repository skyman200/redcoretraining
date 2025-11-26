'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';
import Footer from '@/components/Footer';
import FacadeAnimation from '@/components/FacadeAnimation';

export default function Home() {
  return (
    <>
      <FacadeAnimation />
      <Header />
      <Hero />
      <ProjectGrid />
      <Footer />
    </>
  );
}
