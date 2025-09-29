'use client';

import { motion } from 'framer-motion';
import { FaHtml5, FaCss3, FaReact, FaNodeJs, FaGitAlt, FaLaravel, FaFigma } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMysql, SiJavascript } from 'react-icons/si';
import React from 'react';

// Data skills
const skillCategories = [
  {
    category: 'Frontend',
    items: [
      { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: FaCss3, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'React', icon: FaReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: 'currentColor' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
      { name: 'Express.js', icon: FaNodeJs, color: '#000000' },
      { name: 'Laravel', icon: FaLaravel, color: '#FF2D20' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    ],
  },
  {
    category: 'Tools & Others',
    items: [
      { name: 'Git', icon: FaGitAlt, color: '#F05032' },
      { name: 'Figma', icon: FaFigma, color: '#F24E1E' },
    ],
  },
];

// Animations
const floatingAnimation = {
  floating: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      y: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
      rotate: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

type Skill = {
  name: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  color: string;
};

// Skill Bubble Component
const SkillBubble = ({ skill, index }: { skill: Skill; index: number }) => {
  const IconComponent = skill.icon;

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl group cursor-pointer relative overflow-hidden skill-bubble"
      variants={floatingAnimation}
      animate="floating"
      whileHover={{
        y: -8,
        scale: 1.05,
        transition: { type: 'spring', stiffness: 300 },
      }}
      custom={index}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
      <motion.div className="mb-2 sm:mb-3 transition-transform duration-300 z-10" whileHover={{ scale: 1.2, rotate: 5 }}>
        <IconComponent size={32} style={{ color: skill.color }} />
      </motion.div>
      <span className={`text-xs sm:text-sm font-semibold text-center z-10`} style={{ color: 'var(--text-color)' }}>
        {skill.name}
      </span>
    </motion.div>
  );
};

// Category Bubble dengan background yang kontras
const CategoryBubble = ({ category }: { category: string }) => (
  <motion.div className="w-full max-w-xs p-4 rounded-2xl mb-6 mx-auto category-bubble" whileHover={{ y: -5, scale: 1.02 }} variants={floatingAnimation} animate="floating">
    <h3 className="text-lg sm:text-xl font-bold text-center category-title">{category}</h3>
  </motion.div>
);

export default function SkillSection() {
  return (
    <section
      id="skills"
      className={`min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-16 sm:py-20 relative overflow-hidden`}
      style={{
        background: `var(--ocean-middle)`,
        color: 'var(--text-color)',
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: Math.random() * 15 + 5,
              height: Math.random() * 15 + 5,
              left: `${Math.random() * 100}%`,
              top: '100%',
            }}
            animate={{
              y: [0, -Math.random() * 600 - 200],
              x: [0, Math.random() * 60 - 30],
              opacity: [0, 0.9, 0],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              times: [0, 0.6, 1],
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.h2 className="text-4xl sm:text-5xl font-bold mb-12 sm:mb-16 text-center z-10 px-4 section-title" initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        Skills & Technologies
      </motion.h2>

      {/* Skills Grid */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 max-w-6xl w-full z-10 px-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-50px' }}>
        {skillCategories.map((category) => (
          <motion.div key={category.category} className="flex flex-col items-center" variants={itemAnimation}>
            <CategoryBubble category={category.category} />
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-xs">
              {category.items.map((skill, skillIndex) => (
                <SkillBubble key={skill.name} skill={skill} index={skillIndex} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
