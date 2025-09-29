'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useRef, ReactNode } from 'react';
import { useInView } from 'framer-motion';

interface Project {
  title?: string;
  description?: string;
  fullDescription?: string;
  image: string;
  link: string;
  tech?: string[];
  isComingSoon?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const projects: Project[] = [
  {
    title: 'Inventaris Barang SMKN 1 Sumenep',
    description: 'An inventory management system for schools with QR code tracking.',
    fullDescription:
      'A School Asset & Inventory Management System built on the Laravel (PHP) framework.\n\nIt features a hybrid tracking system to manage both bulk supplies and individual assets using unique, system-generated QR codes. With role-based access for Admins, Operators, and Teachers, the application streamlines the entire asset lifecycle—from inventory and location tracking to borrowing and maintenance—ensuring accountability through a comprehensive activity log.',
    image: '/project/Dashboard-Admin-Web-Inventaris-SMKN-1-Sumenep-09-25-2025_06_42_PM.png',
    link: 'https://github.com/albinurrosif/inventaris-smkn-1-sumenep.git',
    tech: ['Laravel', 'Bootstrap', 'MySQL'],
  },
  {
    image: '/project/2.jpg',
    link: '#',
    isComingSoon: true,
  },
];

function ProjectCard({ project, index }: ProjectCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: '-50px' });

  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  const formatDescription = (text: string): ReactNode[] =>
    text.split('\n').map((line, idx) => (
      <span key={idx}>
        {line}
        <br />
      </span>
    ));

  return (
    <motion.div
      ref={cardRef}
      className="relative group overflow-hidden rounded-2xl shadow-lg flex flex-col h-full w-full max-w-md mx-auto"
      style={{
        background: 'rgba(15, 23, 42, 0.8)',
        color: '#f1f5f9',
        backdropFilter: 'blur(12px)',
      }}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      whileHover={{
        y: -5,
        transition: { type: 'spring', stiffness: 300 },
      }}
    >
      {/* Floating animation untuk SEMUA card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 1.5,
        }}
        className="w-full h-full flex flex-col"
      >
        {/* Image Section */}
        <a
          href={project.isComingSoon ? '#' : project.link}
          target={project.isComingSoon ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className={`block ${project.isComingSoon ? 'pointer-events-none cursor-default' : ''}`}
          aria-label={project.isComingSoon ? 'Coming soon project' : `View ${project.title} project`}
        >
          <div className="relative h-48 w-full flex-shrink-0 overflow-hidden">
            <Image
              src={project.image}
              alt={project.isComingSoon ? 'Coming soon project' : `${project.title} screenshot`}
              fill
              className={`object-cover transition-transform duration-500 ${project.isComingSoon ? 'filter blur-[2px] brightness-50' : 'group-hover:scale-105'}`}
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </a>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow relative">
          {/* Project normal content */}
          {!project.isComingSoon && (
            <div className="relative z-10 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>

              <div className="text-sm mb-3 flex-grow min-h-[60px] opacity-90">{project.description}</div>

              {/* Read More button */}
              {project.fullDescription && (
                <button
                  onClick={toggleDescription}
                  className="text-[var(--primary-ocean)] hover:text-[var(--primary-sky)] text-xs font-medium mb-3 self-start transition-colors duration-200 border-b border-[var(--primary-ocean)]/40 hover:border-[var(--primary-sky)]/60"
                >
                  {showFullDescription ? '▲ Read Less' : '▼ Read More'}
                </button>
              )}

              {/* Full Description */}
              {showFullDescription && project.fullDescription && <div className="text-sm mb-3 opacity-90 bg-white/5 p-3 rounded-lg">{formatDescription(project.fullDescription)}</div>}

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech?.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-2 py-1 font-bold text-xs rounded-md"
                    style={{
                      backgroundColor: 'var(--primary-ocean)',
                      color: 'var(--text-color)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Coming soon */}
          {project.isComingSoon && (
            <div className="flex flex-col flex-grow justify-center items-center space-y-8 py-6">
              {/* Badge compact */}
              <div
                className="px-6 py-3 rounded-full font-bold text-lg shadow-lg"
                style={{
                  backgroundColor: 'var(--primary-ocean)',
                  color: 'var(--text-color)',
                }}
              >
                COMING SOON
              </div>

              {/* Simple status */}
              <div className="text-center">
                <div
                  className="w-20 h-0.5 rounded-full mx-auto mb-2"
                  style={{
                    backgroundColor: 'var(--primary-ocean)',
                    opacity: 0.4,
                  }}
                ></div>
                <div className="text-xs opacity-60">In Progress</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const getContainerClass = (): string => {
    if (projects.length === 1) return 'flex justify-center';
    return 'flex flex-wrap justify-center';
  };

  const getCardWidthClass = (): string => {
    if (projects.length === 1) return 'w-full max-w-md';
    if (projects.length === 2) return 'w-full md:w-[calc(50%-24px)] max-w-md';
    return 'w-full md:w-[calc(50%-24px)] lg:w-[calc(33.333%-24px)] max-w-md';
  };

  return (
    <section ref={ref} id="projects" className="relative min-h-screen py-20 flex flex-col justify-center items-center overflow-hidden projects-section">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0" />

      {/* Efek laut dalam subtle */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/5 via-transparent to-blue-600/10"></div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/25"
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

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-3xl sm:text-5xl font-bold mb-12 text-center section-title"
          style={{ color: 'var(--primary-ocean)' }}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          Projects
        </motion.h2>

        <motion.div className={`${getContainerClass()} gap-6 mx-auto`} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          {projects.map((project, index) => (
            <div key={index} className={`${getCardWidthClass()} flex-shrink-0 min-h-[400px] mb-6`}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
