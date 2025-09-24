'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import React from 'react';

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;
    setLoading(true);

    // isi field hidden time
    const timeInput = form.current.querySelector<HTMLInputElement>('input[name="time"]');
    if (timeInput) {
      timeInput.value = new Date().toLocaleString();
    }

    try {
      await emailjs.sendForm('service_yjg8hwa', 'template_9y7t3tn', form.current, '925Zfv3oupGP8ea7J');
      toast.success('✅ Message sent successfully!');
      form.current.reset();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('❌ Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-background text-foreground">
      <motion.h2 className="text-3xl sm:text-5xl font-bold mb-12 text-center " initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        Contact Me
      </motion.h2>

      <motion.form ref={form} onSubmit={sendEmail} className="w-full max-w-md space-y-4 bg-background-slate p-6 rounded-2xl shadow-lg" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <input type="text" name="name" placeholder="Your Name" className="w-full p-3 rounded-md bg-background text-foreground border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition" required />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-md bg-background text-foreground border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition"
          required
        />
        <textarea name="message" placeholder="Your Message" className="w-full p-3 rounded-md bg-background text-foreground border border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition h-32" required />
        <input type="hidden" name="time" />

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 p-3 rounded-md font-semibold shadow-md transition ${loading ? 'bg-gray-500 cursor-not-allowed text-white' : 'bg-primary text-white hover:bg-primary-dark'}`}
        >
          {loading && <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </motion.form>
    </section>
  );
}
