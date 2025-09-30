'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
      className="about-section min-h-screen flex flex-col justify-center items-center px-6 text-center relative -mt-1"
      style={{
        background: `linear-gradient(to bottom, var(--ocean-surface), var(--ocean-middle))`,
        color: 'var(--text-color)',
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: Math.random() * 12 + 3,
              height: Math.random() * 12 + 3,
              left: `${Math.random() * 100}%`,
              top: '100%',
            }}
            animate={{
              y: [0, -Math.random() * 600 - 200],
              x: [0, Math.random() * 60 - 30],
              opacity: [0, 0.9, 0],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              times: [0, 0.6, 1],
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ))}
      </div>

      {/* Title */}
      <h2 className="text-3xl sm:text-5xl font-bold mb-6 relative z-10 section-title" style={{ color: 'var(--primary-ocean)' }}>
        About Me
      </h2>

      <div
        className="relative max-w-3xl mx-auto p-8 rounded-2xl shadow-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.15)', // transparan di light
          backdropFilter: 'blur(12px)', // efek kaca
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.3)', // border halus
          color: 'var(--text-color)',
        }}
      >
        <p className="text-lg sm:text-xl leading-relaxed">
          Hi, I’m <span className="font-semibold text-[var(--primary-ocean)]">Bee</span>. I’m currently learning <span className="font-medium text-[var(--primary-ocean)]">React, Next.js, and Tailwind CSS</span>. My goal is to become
          confident in building modern web applications and share my journey along the way.
        </p>
      </div>
    </section>
  );
}
