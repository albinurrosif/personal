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
      <h1 className="text-3xl sm:text-5xl font-bold mb-4 flex items-center gap-x-2">
        <span>Hi, I&apos;m</span>
        <span className="inline-block relative w-[4ch] text-center">
          <span className="text-[var(--primary-sky)] font-mono">{text}</span>
        </span>
      </h1>

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
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10 -mb-1 " style={{ transform: 'scale(1.2)' }}>
        {/* Tinggi responsive, pattern SAMA */}
        <div className="relative w-[200%] animate-wave flex h-36 sm:h-40 md:h-56 lg:h-80  ">
          <svg className="w-1/2 h-full " viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              d="M0,128L80,117.3C160,107,320,85,480,101.3C640,117,800,171,960,181.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              fill="var(--ocean-surface)"
            />
          </svg>
          <svg className="w-1/2 h-full " viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              d="M0,128L80,117.3C160,107,320,85,480,101.3C640,117,800,171,960,181.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              fill="var(--ocean-surface)"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
