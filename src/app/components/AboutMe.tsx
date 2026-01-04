'use client';
import { motion } from 'framer-motion';
import FloatingBubbles from './FloatingBubbles';

export default function About() {
  return (
    <section
      id="about"
      className="about-section items-center px-6 text-center relative py-44 sm:py-52" // [!code focus]
      style={{
        color: 'var(--text-color)',
      }}
    >
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 relative z-10 section-title" style={{ color: 'var(--primary-ocean)' }}>
        About Me
      </h2>

      <div
        className="relative max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl shadow-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.15)', // transparan di light
          backdropFilter: 'blur(12px)', // efek kaca
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.3)', // border halus
          color: 'var(--text-color)',
        }}
      >
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
           Hi, I’m <span className="font-semibold text-[var(--primary-ocean)]">Bee</span>. I build web applications using
          <span className="font-medium text-[var(--primary-ocean)]">React, Express.Js, Next.js, and Tailwind CSS</span>, and I’m continuously improving my skills by working on personal projects. My goal is to become a reliable fullstack
          JavaScript developer by building real-world applications and sharing my development journey.
        </p>
      </div>
    </section>
  );
}
