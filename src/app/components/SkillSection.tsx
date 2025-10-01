'use client';

import { motion } from 'framer-motion';
import { FaHtml5, FaCss3, FaReact, FaNodeJs, FaGitAlt, FaLaravel, FaFigma } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMysql, SiJavascript } from 'react-icons/si';
import React, { useMemo, useState } from 'react';
import FloatingBubbles from './FloatingBubbles'

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
    y: [-1.5, 1.5, -1.5],
    rotate: [-1, 1, -1],
    transition: {
      y: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
      rotate: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  },
};

type Skill = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number }>;
  color: string;
};

// Skill Bubble Component - LARGER FOR CAROUSEL
const SkillBubble = ({ skill, index }: { skill: Skill; index: number }) => {
  const IconComponent = skill.icon;

  return (
    <motion.div
      className="flex flex-col items-center justify-center rounded-2xl group cursor-pointer relative overflow-hidden skill-bubble
                 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32
                 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6"
      style={{ aspectRatio: '1 / 1' }}
      variants={floatingAnimation}
      animate="floating"
      whileHover={{
        y: -8,
        scale: 1.1,
        transition: { type: 'spring', stiffness: 400, damping: 10 },
      }}
      custom={index}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
      <motion.div className="mb-1 sm:mb-1.5 md:mb-2 transition-transform duration-300 z-10 flex items-center justify-center" whileHover={{ scale: 1.3, rotate: 5 }}>
        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10" style={{ color: skill.color }} />
      </motion.div>
      <span
        className="font-semibold text-center leading-tight 
                   text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg"
        style={{ color: 'var(--text-color)' }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
};

// Category Bubble
const CategoryBubble = ({ category }: { category: string }) => (
  <motion.div
    className="px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 rounded-2xl mb-4 sm:mb-5 md:mb-6 lg:mb-8 mx-auto category-bubble 
               max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px] xl:max-w-[220px]"
    whileHover={{ y: -4, scale: 1.05 }}
    variants={floatingAnimation}
    animate="floating"
  >
    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-center whitespace-nowrap category-title">{category}</h3>
  </motion.div>
);

const CategorySlide = ({ category, skills }: { category: string; skills: Skill[] }) => {
  // Mapping jumlah skill ke class grid
  const gridColsMap: { [key: number]: string } = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-2',
    5: 'grid-cols-3',
    6: 'grid-cols-3',
  };

  const gridColsClass = gridColsMap[skills.length] || 'grid-cols-3';

  return (
    <div className="flex-shrink-0 w-full h-full flex flex-col items-center justify-center px-4">
      <CategoryBubble category={category} />
      <div className={`grid ${gridColsClass} gap-4 sm:gap-5 md:gap-6 max-w-sm justify-items-center`}>
        {skills.map((skill, skillIndex) => (
          <SkillBubble key={skill.name} skill={skill} index={skillIndex} />
        ))}
      </div>
    </div>
  );
};

export default function SkillSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Fungsi untuk langsung ke slide tertentu
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      // Minimum swipe distance
      if (diff > 0) {
        // Swipe left - next slide (circular)
        setCurrentSlide((prev) => (prev + 1) % skillCategories.length);
      } else {
        // Swipe right - previous slide (circular)
        setCurrentSlide((prev) => (prev - 1 + skillCategories.length) % skillCategories.length);
      }
    }

    setTouchStart(null);
  };

  return (
    <section
      id="skills"
      className=" flex flex-col justify-start items-center px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden skills-section py-44 sm:py-52"
      style={{
        color: 'var(--text-color)',
      }}
    >
      <FloatingBubbles />

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center z-10 section-title">Skills & Technologies</h2>

      {/* Desktop/Tablet Layout - 3 Column Grid */}
      <motion.div
        className="hidden md:grid grid-cols-3 gap-6 md:gap-8 lg:gap-10 
                   max-w-4xl lg:max-w-5xl xl:max-w-7xl w-full 
                   z-10 px-4 md:px-6 pt-4 md:pt-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-30px' }}
      >
        {skillCategories.map((category) => (
          <motion.div key={category.category} className="flex flex-col items-center">
            <CategoryBubble category={category.category} />
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5 justify-items-center">
              {category.items.map((skill, skillIndex) => (
                <SkillBubble key={skill.name} skill={skill} index={skillIndex} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile Carousel*/}
      <div className="md:hidden w-full max-w-sm z-10 flex flex-col items-center">
        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-2xl w-full" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <motion.div className="flex pt-4 pb-4" animate={{ x: `-${currentSlide * 100}%` }} transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}>
            {skillCategories.map((category, index) => (
              <CategorySlide key={category.category} category={category.category} skills={category.items} />
            ))}
          </motion.div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center w-full mt-6 mb-2">
          <div className="flex gap-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-full px-4 py-3 border border-white/20 shadow-lg">
            {skillCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-150 shadow-lg' : 'bg-white/30 hover:bg-white/50'}`}
                title={category.category}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
