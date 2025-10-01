'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import React from 'react';
import { useInView } from 'framer-motion';
import FloatingBubbles from './FloatingBubbles';

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    setLoading(true);
    const timeInput = form.current.querySelector<HTMLInputElement>('input[name="time"]');
    if (timeInput) {
      timeInput.value = new Date().toLocaleString();
    }
    try {
      await emailjs.sendForm('service_yjg8hwa', 'template_9y7t3tn', form.current, '925Zfv3oupGP8ea7J');
      toast.success('✅ Message sent successfully!');
      form.current.reset();
    } catch {
      toast.error('❌ Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  // Animasi floating yang lebih ringan dan halus
  const floatingAnimation = {
    floating: {
      y: [0, -4, 0], // Pergerakan y dikurangi agar lebih subtil
      transition: {
        duration: 6, // Durasi diperpanjang agar lebih lambat dan tenang
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    // Perubahan utama ada di className section ini
    <section ref={sectionRef} id="contact" className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden contact-section">
      <FloatingBubbles />

      {/* Title (Tidak diubah) */}
      <h2 className="text-3xl sm:text-5xl font-bold mb-12 text-center z-10 section-title">Contact Me</h2>

      {/* Contact Form (Tidak diubah) */}
      <motion.div className="relative z-10 w-full max-w-md" variants={floatingAnimation} animate="floating">
        <form ref={form} onSubmit={sendEmail} className="w-full space-y-6 p-8 rounded-2xl shadow-2xl contact-form">
          {/* Form Fields */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <input type="text" name="name" placeholder="Your Name" className="w-full p-4 rounded-xl border-2 form-input outline-none" required disabled={loading} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.6, delay: 0.5 }}>
            <input type="email" name="email" placeholder="Your Email" className="w-full p-4 rounded-xl border-2 form-input outline-none" required disabled={loading} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.6, delay: 0.6 }}>
            <textarea name="message" placeholder="Your Message" className="w-full p-4 rounded-xl border-2 form-input h-32 resize-none outline-none" required disabled={loading} />
          </motion.div>

          <input type="hidden" name="time" />

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }} transition={{ duration: 0.6, delay: 0.7 }}>
            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-3 p-4 rounded-xl font-semibold shadow-lg transition-all duration-300 submit-button">
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Sending...
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    ➤
                  </motion.span>
                </>
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
}
