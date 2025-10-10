'use client';

import { Suspense, useRef, useEffect } from 'react';

import Hero from '@/app/components/HeroSection';
import About from '@/app/components/AboutMe';
import Projects from '@/app/components/ProjectSection';
import Skills from '@/app/components/SkillSection';
import ContactForm from '@/app/components/ContactForm';
import Footer from '@/app/components/Footer';

import PageLoader from '@/app/components/PageLoader';
import ScrollIndicator from '@/app/components/ScrollIndicator';

export default function Home() {
  const oceanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fungsi ini akan mengukur tinggi div dan menyetel variabel CSS
    const setOceanHeight = () => {
      if (oceanRef.current) {
        const height = oceanRef.current.offsetHeight;
        oceanRef.current.style.setProperty('--ocean-height', `${height}px`);
      }
    };

    setOceanHeight(); // Panggil saat awal
    window.addEventListener('resize', setOceanHeight); // Panggil lagi jika ukuran window berubah

    return () => window.removeEventListener('resize', setOceanHeight);
  }, []);

  return (
    <div className="relative">
      {/* Scroll Indicator di sisi kanan */}
      <div className="hidden 2xl:block">
        <ScrollIndicator />
      </div>

      {/* Floating Footer di bawah */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <main className="normal-scroll-container">
        {' '}
        {/* Ganti class name */}
        <Suspense fallback={<PageLoader sectionName="hero" />}>
          <section id="hero">
            <Hero />
          </section>
        </Suspense>
        <div ref={oceanRef} className="relative ocean-background">
          <div className="particle-wrapper" aria-hidden="true">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
          <Suspense fallback={<PageLoader sectionName="about" />}>
            <section id="about">
              <About />
            </section>
          </Suspense>
          <Suspense fallback={<PageLoader sectionName="skills" />}>
            <section id="skills">
              <Skills />
            </section>
          </Suspense>
          <Suspense fallback={<PageLoader sectionName="projects" />}>
            <section id="projects">
              <Projects />
            </section>
          </Suspense>
          <Suspense fallback={<PageLoader sectionName="contact" />}>
            <section id="contact">
              <ContactForm />
            </section>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
