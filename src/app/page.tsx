import { lazy, Suspense } from 'react';

const Hero = lazy(() => import('@/app/components/HeroSection'));
const About = lazy(() => import('@/app/components/AboutMe'));
const Projects = lazy(() => import('@/app/components/ProjectSection'));
const Skills = lazy(() => import('@/app/components/SkillSection'));
const ContactForm = lazy(() => import('@/app/components/ContactForm'));
const Footer = lazy(() => import('@/app/components/Footer'));

import PageLoader from '@/app/components/PageLoader';
import ScrollIndicator from '@/app/components/ScrollIndicator';

export default function Home() {
  return (
    <div className="relative">
      {/* Scroll Indicator di sisi kanan */}
      <ScrollIndicator />

      {/* Floating Footer di bawah */}
      <Suspense fallback={null}>
        <Footer /> {/* 🔥 Footer jadi component floating */}
      </Suspense>

      {/* Snap Sections */}
      <main className="snap-container">
        
        <Suspense fallback={<PageLoader sectionName="hero" />}>
          <section id="hero" className="snap-section">
            <Hero />
          </section>
        </Suspense>

        <Suspense fallback={<PageLoader sectionName="about" />}>
          <section id="about" className="snap-section">
            <About />
          </section>
        </Suspense>

        <Suspense fallback={<PageLoader sectionName="skills" />}>
          <section id="skills" className="snap-section">
            <Skills />
          </section>
        </Suspense>

        <Suspense fallback={<PageLoader sectionName="projects" />}>
          <section id="projects" className="snap-section">
            <Projects />
          </section>
        </Suspense>

        <Suspense fallback={<PageLoader sectionName="contact" />}>
          <section id="contact" className="snap-section">
            <ContactForm />
          </section>
        </Suspense>
      </main>
    </div>
  );
}
