'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import React from 'react';
import { useInView } from 'framer-motion';

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

  // Floating animation variants - FIXED TypeScript
  const floatingAnimation = {
    floating: {
      y: [0, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <section ref={sectionRef} id="contact" className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 overflow-hidden contact-section">
      {/* Deep Ocean Background */}
      <div className="absolute inset-0 z-0 " />

      {/* Deep Ocean Effects */}
      <div className="absolute inset-0 z-0">
        {/* Deep sea bubbles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/10"
            style={{
              width: Math.random() * 15 + 5,
              height: Math.random() * 15 + 5,
              left: `${Math.random() * 100}%`,
              bottom: '-5%',
            }}
            animate={{
              y: [-100, window.innerHeight + 100],
              x: [0, Math.random() * 60 - 30],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Title dengan glow yang dikurangi */}
      <motion.h2 className="text-3xl sm:text-5xl font-bold mb-12 text-center z-10 section-title" initial={{ opacity: 0, y: -30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }} transition={{ duration: 0.8 }}>
        Contact Me
      </motion.h2>

      {/* Contact Form */}
      <motion.div className="relative z-10 w-full max-w-md" variants={floatingAnimation} animate="floating">
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          className="w-full space-y-6 p-8 rounded-2xl shadow-2xl contact-form"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
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
        </motion.form>
      </motion.div>

      
    </section>
  );
}
