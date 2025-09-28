'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
  const [text, setText] = useState('Bee');

const smoothScroll = (targetId: string) => {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

  useEffect(() => {
    const words = ['Bee', 'Albi'];
    let index = 0;

    const interval = setInterval(() => {
      const target = words[index];
      const chars = '!$&?;<>-_\\/()[]{}—=+*^?#~________';

      let count = 0;
      const scrambleInterval = setInterval(() => {
        let temp = '';
        for (let i = 0; i < target.length; i++) {
          temp += chars[Math.floor(Math.random() * chars.length)];
        }
        setText(temp);
        count++;

        if (count === 5) {
          clearInterval(scrambleInterval);
          setText(target);
          index = (index + 1) % words.length;
        }
      }, 100);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
        <span className="whitespace-nowrap">Hi, I&apos;m </span>
        <span className="inline-block relative w-[100px] h-[1.2em] align-middle">
          {' '}
          {/* Container dengan fixed height */}
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full font-mono text-center" style={{ color: 'var(--primary-sky)' }}>
            {text}
          </span>
        </span>
      </motion.h1>

      {/* Subheading */}
      <p className="text-lg sm:text-xl max-w-xl mb-6 relative z-10 opacity-90">
        <Typewriter words={['Aspiring Software Developer', 'React Enthusiast', 'Learning Next.js & Tailwind']} loop={0} cursor cursorStyle="|" typeSpeed={70} deleteSpeed={50} delaySpeed={1500} />
      </p>

      {/* CTA buttons - Floating Bubbles */}
      <motion.div className="flex flex-col sm:flex-row gap-6 relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
        {/* Projects Bubble */}
        <motion.button onClick={() => smoothScroll('projects')} className="px-8 py-4 font-semibold rounded-full transition-all duration-300 hero-bubble-primary" whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
          View Projects
        </motion.button>

        {/* Contact Bubble */}
        <motion.button onClick={() => smoothScroll('contact')} className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hero-bubble-secondary" whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
          Get In Touch
        </motion.button>
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
