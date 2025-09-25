'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center px-6 bg-background text-foreground text-center">
      {/* Title */}
      <motion.h2 className="text-3xl sm:text-5xl font-bold mb-6 text-foreground" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        About Me
      </motion.h2>

      {/* Description */}
      <motion.p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-gray-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        Hi, I’m <span className="font-semibold text-primary">Bee</span>. I’m currently learning <span className="font-medium text-gray-300">React, Next.js, and Tailwind CSS</span>. My goal is to become confident in building modern web
        applications and share my journey along the way.
      </motion.p>
    </section>
  );
}
