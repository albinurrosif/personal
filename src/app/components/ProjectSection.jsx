'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'My Portfolio',
    description: 'A personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion.',
    image: '/project/2.jpg',
    link: 'https://example.com',
    tech: ['Next.js', 'Tailwind', 'Framer Motion'],
  },
  {
    title: 'E-Commerce',
    description: 'An online store platform with product catalog, cart, and checkout features.',
    image: '/project/3.jpg',
    link: 'https://example.com',
    tech: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Blog Platform',
    description: 'A modern blog system with markdown support, authentication, and search.',
    image: '/project/4.jpg',
    link: 'https://example.com',
    tech: ['Next.js', 'TypeScript', 'Prisma'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 bg-background text-foreground flex flex-col justify-center items-center">
      <div className="container mx-auto px-6">
        {/* Title */}
        <motion.h2 className="text-3xl sm:text-5xl font-bold mb-12 text-center " initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          Projects
        </motion.h2>

        {/* Grid of projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden rounded-2xl shadow-lg flex flex-col bg-background-slate "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Image */}
              <div className="relative h-48 w-full">
                <Image src={project.image} alt={`${project.title} screenshot`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-2 ">{project.title}</h3>
                <p className="text-gray-300 text-sm flex-1">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
