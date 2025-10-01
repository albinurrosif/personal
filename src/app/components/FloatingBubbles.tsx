'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper (tidak diubah)
const random = (min: number, max: number): number => Math.random() * (max - min) + min;

// Custom Hook (tidak diubah)
const useResponsiveValue = (mobileValue: number, tabletValue: number, desktopValue: number) => {
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
const createParticle = (maxSize: number) => {
  return {
    id: Date.now() + Math.random(),
    top: `${random(10, 90)}%`,
    left: `${random(10, 90)}%`,
    size: random(2, maxSize),
    duration: random(15, 30),
    driftX: random(-100, 100),
    driftY: random(-100, 100),
    blur: random(2, 6),
  };
};

// --- Tipe & Interface (sudah benar) ---
type ParticleType = {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: number;
  driftX: number;
  driftY: number;
  blur: number;
};

interface ParticleProps {
  particle: ParticleType;
  onComplete: () => void;
}

function Particle({ particle, onComplete }: ParticleProps) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/25"
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
        x: [0, particle.driftX],
        y: [0, particle.driftY],
      }}
      onAnimationComplete={onComplete}
      transition={{
        duration: particle.duration,
        ease: 'easeInOut',
        times: [0, 0.2, 0.8, 1],
      }}
    />
  );
}

// --- Komponen Utama ---
export default function FloatingParticles() {
  const particleCount = useResponsiveValue(20, 30, 40);
  const maxParticleSize = useResponsiveValue(8, 12, 15);
  const [particles, setParticles] = useState<ParticleType[]>([]);

  useEffect(() => {
    const initialParticles = Array.from({ length: particleCount }).map(() => createParticle(maxParticleSize));
    setParticles(initialParticles);
  }, [particleCount, maxParticleSize]);

  // --- PERBAIKAN ERROR BUILD DI SINI ---
  const handleAnimationComplete = (id: number) => {
    // Tipe 'any' diubah menjadi 'number'
    setParticles((prev) => prev.filter((p) => p.id !== id));
    setTimeout(() => {
      setParticles((prev) => [...prev, createParticle(maxParticleSize)]);
    }, random(1000, 3000));
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <Particle key={particle.id} particle={particle} onComplete={() => handleAnimationComplete(particle.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}
