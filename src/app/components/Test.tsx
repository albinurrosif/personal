'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
    title: '',
    description: '',
    image: '/project/3.jpg',
    link: '#',
    tech: [],
    isComingSoon: true, // Fixed typo: isCominSoon -> isComingSoon
  },
];

// Component untuk project card yang terpisah
function ProjectCard({ project, index, totalProjects }) {
  // Added totalProjects prop
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Format teks dengan line breaks
  const formatDescription = (text) => {
    return text.split('\n').map((line, idx) => (
      <span key={idx}>
        {line}
        <br />
      </span>
    ));
  };

  // Format posisi
  const getPositionClass = () => {
    if (totalProjects === 1) return 'md:col-start-2';
    if (totalProjects === 2) return index === 0 ? 'md:col-start-2 lg:col-start-1' : 'md:col-start-2 lg:col-start-3';
    return '';
  };

  return (
    <motion.div
      key={index}
      whileHover={{ scale: project.isComingSoon ? 1 : 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group overflow-hidden rounded-2xl shadow-lg flex flex-col bg-background-slate h-full ${project.isComingSoon ? 'opacity-80' : ''} ${getPositionClass()}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Overlay Coming Soon */}
      {project.isComingSoon && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-500/20 via-blue-500/20 to-black/90 z-20"></div>
          {/* Pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] z-30"></div>
          {/* Main coming soon content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center z-40 text-center px-4">
            {/* Animated icon */}
            <div className="text-6xl mb-4 animate-pulse">🚀</div>
            {/* Main title */}
            <h3 className="text-sm font-semibold text-white">Coming Soon</h3>
            {/* Subtitle */}
            <p className="text-white/80 text-sm mb-4 max-w-xs">Something amazing is in the works</p>

            {/* Animated dots */}
            <div className="flex space-x-2 mb-6">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
          {/* Floating elements */}
          <div className="absolute top-4 right-4 z-30">
            <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
          </div>
        </>
      )}

      {/* Pulse animation */}
      {project.isComingSoon && (
        <div className="absolute inset-0 z-5">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-blue-500/10 animate-pulse rounded-2xl"></div>
        </div>
      )}

      {/* Image */}
      <a href={project.link} target="_blank" rel="noopener noreferrer" className={`block ${project.isComingSoon ? 'pointer-events-none' : ''}`}>
        <div className="relative h-48 w-full flex-shrink-0">
          <Image src={project.image} alt={`${project.title} screenshot`} fill className={`object-cover transition-transform duration-500 ${project.isComingSoon ? 'filter grayscale-[30%]' : 'group-hover:scale-110'}`} />

          {/* Gradient Overlay */}
          {project.isComingSoon && ( // Fixed: project.isComingSoon
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          )}
        </div>
      </a>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow min-h-[200px]">
        <h3 className={`text-xl font-semibold mb-3 ${project.isComingSoon ? 'text-gray-400' : ''}`}>{project.title}</h3>

        {/* Description */}
        <div className={`text-sm mb-3 flex-grow min-h-[60px] ${project.isComingSoon ? 'text-gray-500' : 'text-gray-300'}`}>
          {showFullDescription && project.fullDescription ? formatDescription(project.fullDescription) : project.description}
        </div>

        {/* Read More Button */}
        {project.fullDescription && !project.isComingSoon && (
          <button onClick={toggleDescription} className="text-primary hover:text-primary/80 text-xs font-medium mb-3 self-start transition-colors duration-200">
            {showFullDescription ? '▲ Read Less' : '▼ Read More'}
          </button>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-gray-600/30">
          {project.tech.map((tag, i) => (
            <span key={i} className={`px-2 py-1 text-xs rounded-md ${project.isComingSoon ? 'bg-gray-600/30 text-gray-400' : 'bg-primary/10 text-primary'}`}>
              {tag}
            </span>
          ))}
        </div>

        {/* Coming soon elements */}
        {project.isComingSoon && (
          <div className="">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-xs text-gray-500">Working on something...</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 bg-background text-foreground flex flex-col justify-center items-center">
      <div className="container mx-auto px-6">
        {/* Title */}
        <motion.h2 className="text-3xl sm:text-5xl font-bold mb-12 text-center" initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          Projects
        </motion.h2>

        {/*  */}
        <div className={`flex flex-wrap justify-center gap-8 ${projects.length === 1 ? 'max-w-md' : projects.length === 2 ? 'max-w-3xl' : 'max-w-6xl'} mx-auto`}>
          {projects.map((project, index) => (
            <div key={index} className={`${projects.length >= 3 ? 'w-full md:w-[calc(50%-32px)] lg:w-[calc(33.333%-32px)]' : projects.length === 2 ? 'w-full md:w-[calc(50%-32px)]' : 'w-full md:w-96'} flex`}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        {/* Tidak ada project */}
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
