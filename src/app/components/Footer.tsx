'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer className="bg-background-slate text-foreground/70 py-6 mt-20" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">&copy; {currentYear} Albinur. All rights reserved.</p>
        <div className="flex gap-6 text-lg">
          <a aria-label="GitHub Profile" href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
            <FaGithub className="w-6 h-6" />
          </a>
          <a aria-label="LinkedIn Profile" href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a aria-label="Email" href="mailto:yourname@example.com" className="hover:text-primary transition">
            <FaEnvelope className="w-6 h-6" />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
