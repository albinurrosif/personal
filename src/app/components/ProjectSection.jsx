'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const projects = [
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
    image: '/project/3.jpg',
    link: '#',
    isComingSoon: true,
  },
];

function ProjectCard({ project, index }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const formatDescription = (text) => {
    return text.split('\n').map((line, idx) => (
      <span key={idx}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <motion.div
      whileHover={{ scale: project.isComingSoon ? 1.02 : 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="relative group overflow-hidden rounded-2xl shadow-lg flex flex-col bg-background-slate h-full w-full max-w-md" // max-w-md untuk batas lebar maksimal
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Image Container */}
      <a href={project.link} target="_blank" rel="noopener noreferrer" className={`block ${project.isComingSoon ? 'pointer-events-none' : ''}`}>
        <div className="relative h-48 w-full flex-shrink-0 overflow-hidden">
          <Image
            src={project.image}
            alt={project.isComingSoon ? 'Coming soon project' : `${project.title} screenshot`}
            fill
            className={`object-cover transition-transform duration-500 ${project.isComingSoon ? 'filter blur-[2px] brightness-30 group-hover:scale-110' : 'group-hover:scale-110'}`}
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </a>

      {/* Content Area */}
      <div
        className={`p-5 flex flex-col flex-grow min-h-[200px] relative bg-gradient-to-br from-gray-900/95 via-background-slate to-black/80 rounded-b-2xl ${
          project.isComingSoon ? '!bg-gradient-to-br from-gray-900/95 via-background-slate to-black/95' : ''
        }`}
      >
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] z-0 pointer-events-none"></div>
        {/* Untuk Project Real */}
        {!project.isComingSoon && (
          <div className="relative z-10">
            <h3 className="text-xl font-semibold mb-3 text-foreground">{project.title}</h3>

            <div className="text-sm mb-3 flex-grow min-h-[60px] text-gray-300">{showFullDescription && project.fullDescription ? formatDescription(project.fullDescription) : project.description}</div>

            {project.fullDescription && (
              <button onClick={toggleDescription} className="text-primary hover:text-primary/80 text-xs font-medium mb-3 self-start transition-colors duration-200 border-b border-primary/30 hover:border-primary/60 z-20">
                {showFullDescription ? '▲ Read Less' : '▼ Read More'}
              </button>
            )}

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((tag, i) => (
                <span key={i} className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Untuk Coming Soon */}
        {project.isComingSoon && (
          <>
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center p-4">
              <div className="text-4xl mb-4 animate-pulse">🚧</div>
              <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
              <p className="text-white/80 text-sm mb-4">New project in development</p>
              <div className="w-full max-w-[160px] bg-white/20 rounded-full h-1.5 mb-4 overflow-hidden">
                <div className="bg-white h-full rounded-full animate-pulse" style={{ width: '65%' }}></div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-auto">
                <span className="px-2 py-1 text-xs rounded-md bg-white/20 text-white/90">In Progress</span>
              </div>
            </div>

            {/* <div className="absolute top-3 right-3 z-30">
              <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping"></div>
            </div> */}
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Tentukan layout berdasarkan jumlah project
  const getContainerClass = () => {
    if (projects.length === 1) {
      return 'flex justify-center'; // 1 project: tengah saja
    } else if (projects.length === 2) {
      return 'flex flex-wrap justify-center'; // 2 projects: berdampingan di tengah
    } else {
      return 'flex flex-wrap justify-center'; // 3+ projects: grid normal
    }
  };

  // Tentukan lebar card berdasarkan jumlah project
  const getCardWidthClass = () => {
    if (projects.length === 1) {
      return 'w-full max-w-md'; // 1 project: lebar medium di tengah
    } else if (projects.length === 2) {
      return 'w-full md:w-[calc(50%-20px)] max-w-md'; // 2 projects: setengah lebar di desktop
    } else {
      return 'w-full md:w-[calc(50%-20px)] lg:w-[calc(33.333%-20px)] max-w-md'; // 3+ projects: responsive grid
    }
  };

  return (
    <section ref={ref} style={{ opacity: isInView ? 1 : 0 }} id="projects" className="min-h-screen py-20 bg-background text-foreground flex flex-col justify-center items-center">
      <div className="container mx-auto px-6">
        <motion.h2 className="text-3xl sm:text-5xl font-bold mb-12 text-center" initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          Projects
        </motion.h2>

        {/* Flexbox container dengan layout dinamis */}
        <div className={`${getContainerClass()} gap-5 mx-auto`}>
          {projects.map((project, index) => (
            <div key={index} className={`${getCardWidthClass()} flex-shrink-0 min-h-[400px]`}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <motion.div className="text-center py-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-2xl font-semibold mb-2">Projects Under Construction</h3>
            <p className="text-gray-400">Coming Soon!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
