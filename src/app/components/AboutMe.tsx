'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
      className="about-ocean min-h-screen flex flex-col justify-center items-center px-6 text-center relative"
      style={{
        background: `linear-gradient(to bottom, var(--ocean-surface), var(--ocean-middle))`,
        color: 'var(--text-color)',
      }}
    >
      {/* Title */}
      <motion.h2 className="text-3xl sm:text-5xl font-bold mb-6 relative z-10 section-title" style={{ color: 'var(--primary-ocean)' }} initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        About Me
      </motion.h2>

      <motion.div
        className="relative max-w-3xl mx-auto p-8 rounded-2xl shadow-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.15)', // transparan di light
          backdropFilter: 'blur(12px)', // efek kaca
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.3)', // border halus
          color: 'var(--text-color)',
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-lg sm:text-xl leading-relaxed">
          Hi, I’m <span className="font-semibold text-[var(--primary-ocean)]">Bee</span>. I’m currently learning <span className="font-medium text-[var(--primary-ocean-light)]">React, Next.js, and Tailwind CSS</span>. My goal is to become
          confident in building modern web applications and share my journey along the way.
        </p>
      </motion.div>
    </section>
  );
}
