'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper (tidak diubah)
const random = (min, max) => Math.random() * (max - min) + min;

// Custom Hook (tidak diubah)
const useResponsiveValue = (mobileValue, tabletValue, desktopValue) => {
  const [value, setValue] = useState(desktopValue);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateValue = () => {
      if (window.innerWidth < 768) setValue(mobileValue);
      else if (window.innerWidth < 1024) setValue(tabletValue);
      else setValue(desktopValue);
    };
    updateValue();
    window.addEventListener('resize', updateValue);
    return () => window.removeEventListener('resize', updateValue);
  }, [mobileValue, tabletValue, desktopValue]);
  return value;
};

// --- FUNGSI UNTUK MEMBUAT PROPERTI PARTIKEL ACAK ---
const createParticle = (maxSize) => {
  return {
    id: Date.now() + Math.random(),
    // Posisi awal acak di seluruh area section
    top: `${random(10, 90)}%`,
    left: `${random(10, 90)}%`,
    // Ukuran partikel yang lebih kecil
    size: random(2, maxSize),
    // Durasi hidup yang sangat panjang dan pelan
    duration: random(15, 30),
    // Jarak tempuh acak ke arah horizontal (bisa ke kiri atau kanan)
    driftX: random(-100, 100),
    // Jarak tempuh acak ke arah vertikal (bisa ke atas atau bawah)
    driftY: random(-100, 100),
    blur: random(2, 6),
  };
};

// --- KOMPONEN PARTIKEL TUNGGAL ---
function Particle({ particle, onComplete }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/25" // Opacity diubah agar lebih redup
      style={{
        left: particle.left,
        top: particle.top,
        width: particle.size,
        height: particle.size,
        filter: `blur(${particle.blur}px)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        // Animasikan posisi x dan y ke tujuan acak
        x: [0, particle.driftX],
        y: [0, particle.driftY],
      }}
      onAnimationComplete={onComplete}
      transition={{
        duration: particle.duration,
        ease: 'easeInOut',
        // Ease in dan out yang lebih panjang dan smooth
        times: [0, 0.2, 0.8, 1],
      }}
    />
  );
}

// --- Komponen Utama ---
export default function FloatingParticles() {
  // Nama komponen diubah agar lebih sesuai
  const particleCount = useResponsiveValue(20, 30, 40); // Jumlah partikel disesuaikan
  const maxParticleSize = useResponsiveValue(8, 12, 15); // Ukuran partikel jauh lebih kecil

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const initialParticles = Array.from({ length: particleCount }).map(() => createParticle(maxParticleSize));
    setParticles(initialParticles);
  }, [particleCount, maxParticleSize]);

  const handleAnimationComplete = (id) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
    setTimeout(() => {
      setParticles((prev) => [...prev, createParticle(maxParticleSize)]);
    }, random(1000, 3000));
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
           {' '}
      <AnimatePresence>
               {' '}
        {particles.map((particle) => (
          <Particle key={particle.id} particle={particle} onComplete={() => handleAnimationComplete(particle.id)} />
        ))}
             {' '}
      </AnimatePresence>
         {' '}
    </div>
  );
}
