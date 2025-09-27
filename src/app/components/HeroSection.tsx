'use client';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
  return (
    <section
      className="hero-sky relative min-h-screen flex flex-col justify-center items-center text-center"
      style={{
        background: `linear-gradient(to bottom, var(--sky-top), var(--sky-middle), var(--sky-bottom))`,
        color: 'var(--text-color)',
      }}
    >
      {/* Heading */}
      <motion.h1 className="text-4xl sm:text-6xl font-bold mb-4 relative z-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        Hi, I&apos;m <span style={{ color: 'var(--primary-sky)' }}>Bee</span>
      </motion.h1>

      {/* Subheading */}
      <p className="text-lg sm:text-xl max-w-xl mb-6 relative z-10 opacity-90">
        <Typewriter words={['Aspiring Software Developer', 'React Enthusiast', 'Learning Next.js & Tailwind']} loop={0} cursor cursorStyle="|" typeSpeed={70} deleteSpeed={50} delaySpeed={1500} />
      </p>

      {/* CTA buttons */}
      <motion.div className="flex gap-4 relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
        {/* Primary */}
        <a
          href="#projects"
          className="px-6 py-3 font-medium rounded-lg transition-colors"
          style={{
            backgroundColor: 'var(--primary-sky)',
            color: '#fff',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-sky-light)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-sky)')}
        >
          View Projects
        </a>

        {/* Outline */}
        <a
          href="#contact"
          className="px-6 py-3 rounded-lg border font-medium transition-colors"
          style={{
            borderColor: 'var(--text-color)',
            color: 'var(--text-color)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0f172a';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-color)';
          }}
        >
          Contact Me
        </a>
      </motion.div>

      {/* 🌊 Wave separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <div className="relative w-[200%] h-32 animate-wave flex">
          <svg className="w-1/2 h-full rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44C212.18,79.74,106.61,95.34,0,96V0H1200V96c-110.61-.66-221.22-2.12-331.83-5.13C757.42,87,642.31,73.15,527.2,59.45,458.1,51.54,389,43.64,321.39,56.44Z" fill="var(--ocean-surface)" />
          </svg>
          <svg className="w-1/2 h-full rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44C212.18,79.74,106.61,95.34,0,96V0H1200V96c-110.61-.66-221.22-2.12-331.83-5.13C757.42,87,642.31,73.15,527.2,59.45,458.1,51.54,389,43.64,321.39,56.44Z" fill="var(--ocean-surface)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
