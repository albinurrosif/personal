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
      </main>
    </div>
  );
}
