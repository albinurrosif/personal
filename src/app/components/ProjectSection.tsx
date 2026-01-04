'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import FloatingBubbles from './FloatingBubbles';

// --- INTERFACE & DATA PROYEK (TIDAK DIUBAH) ---
interface Project {
  title?: string;
  description?: string;
  fullDescription?: string;
  image: string;
  link: {
    demo?: string;
    github?: string;
  };
  tech?: string[];
  isComingSoon?: boolean;
}

const projects: Project[] = [
  {
    title: 'Inventaris Barang SMKN 1 Sumenep',
    description: 'An inventory management system for schools with QR code tracking.',
    fullDescription:
      'A School Asset & Inventory Management System built on the Laravel (PHP) framework.\n\nIt features a hybrid tracking system to manage both bulk supplies and individual assets using unique, system-generated QR codes. With role-based access for Admins, Operators, and Teachers, the application streamlines the entire asset lifecycle—from inventory and location tracking to borrowing and maintenance—ensuring accountability through a comprehensive activity log.',
    image: '/project/Dashboard-Admin-Web-Inventaris-SMKN-1-Sumenep-09-25-2025_06_42_PM.png',
    link: { github: 'https://github.com/albinurrosif/inventaris-smkn-1-sumenep.git' },
    tech: ['Laravel', 'Bootstrap', 'MySQL'],
  },
  {
    title: 'Kumpulink - Link-in-Bio SaaS App',
    description: 'A full-stack SaaS web application (like Linktree) for creating custom public profile pages',
    fullDescription:
      'Built Kumpulink from scratch, a full-stack Software as a Service (SaaS) web application enabling users to create custom public profile pages to gather all their important links in one place. Key features include user authentication (Firebase Auth), a private dashboard for link management (CRUD via Firestore), dynamic public pages (/username), a copy-link button, responsive design (Mobile-First), and interactive notifications & modals.',
    image: '/project/image.png',
    link: { demo: 'https://kumpulink.vercel.app/' },
    tech: ['Javascript', 'Next.js', 'React', 'Tailwind CSS', 'daisyUI', 'Firebase Authentication', 'Firebase Firestore', 'Vercel'],
  },
  {
    title: 'MERN Notes App',
    description: 'A simple notes management web application built with React and Express.js.',
    fullDescription:
      'React Notes is a simple full-stack notes application built as a learning project for understanding ' +
      'RESTful API concepts using JavaScript. The application supports basic CRUD operations, allowing users ' +
      'to create, view, edit, and delete notes.\n\n' +
      'The frontend is built with React and styled using Tailwind CSS and daisyUI, including light and dark mode support. ' +
      'The backend exposes RESTful API endpoints to handle note data and demonstrates client–server communication ' +
      'in a typical full-stack JavaScript workflow.',
    image: '/project/image copy.png',
    link: { demo: 'https://react-notes-lime.vercel.app/' },
    tech: ['React', 'Tailwind CSS', 'daisyUI', 'Node.js', 'Express', 'MongoDB', 'REST API'],
  },
  // Tambahkan proyek lainnya di sini
  {
    image: '/project/2.jpg', // Ganti dengan gambar placeholder Anda
    link: { demo: '#', github: '#' },
    isComingSoon: true,
  },
];

// --- HELPER UNTUK FORMAT DESKRIPSI ---
const formatDescription = (text: string): ReactNode[] =>
  text.split('\n').map((line, idx) => (
    <span key={idx}>
      {line}
      <br />
    </span>
  ));

// --- KOMPONEN BARU: KARTU PROYEK ---
function ProjectCard({ project, onSelectProject }: { project: Project; onSelectProject: () => void }) {
  // Desain Kartu untuk Proyek "Coming Soon"
  if (project.isComingSoon) {
    return (
      <div className="group relative flex h-full min-h-[320px] w-full flex-col justify-center items-center overflow-hidden rounded-2xl shadow-lg border-2 border-dashed border-slate-600/70">
        <div className="absolute inset-0 bg-slate-900/50" />
        <div className="relative z-10 text-center">
          <h3 className="text-xl font-bold text-slate-300">COMING SOON</h3>
          <p className="text-sm text-slate-400 mt-1">New project in progress</p>
        </div>
      </div>
    );
  }

  // Desain Kartu untuk Proyek Normal
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl shadow-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
    >
      {/* Gambar Proyek */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image src={project.image} alt={`Screenshot of ${project.title}`} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Konten Teks */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-semibold text-slate-100">{project.title}</h3>
        <p className="mt-2 flex-grow text-sm leading-relaxed text-slate-300 line-clamp-3">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech?.map((tag) => (
            <span key={tag} className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={onSelectProject}
          className="mt-6 w-full rounded-lg bg-[var(--primary-ocean)] py-2.5 text-sm font-semibold shadow-lg transition-all duration-300 hover:bg-[var(--primary-ocean)] hover:scale-105 active:scale-95
"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
}

// --- KOMPONEN BARU: MODAL DETAIL PROYEK ---
function ProjectModal({ project, isOpen, onClose }: { project: Project | null; isOpen: boolean; onClose: () => void }) {
  if (!project) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 p-6 text-left align-middle shadow-xl transition-all">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Kolom Gambar */}
                  <div className="w-full h-64 md:h-auto relative overflow-hidden rounded-lg">
                    <Image src={project.image} alt={`Screenshot of ${project.title}`} fill className="object-cover" />
                  </div>

                  {/* Kolom Detail */}
                  <div className="flex flex-col">
                    <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-white">
                      {project.title}
                    </Dialog.Title>

                    <div className="mt-4 text-sm text-slate-300 space-y-4">{project.fullDescription ? formatDescription(project.fullDescription) : project.description}</div>

                    <div className="mt-6">
                      
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.tech?.map((tag) => (
                          <span key={tag} className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>  

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      {/* Container untuk tombol */}
                      {/* Tombol Demo (Hanya muncul jika project.link.demo ada) */}
                      {project.link.demo && (
                        <a
                          href={project.link.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          // Styling berbeda untuk aksi utama (demo)
                          className="flex-1 text-center rounded-lg bg-[var(--primary-ocean)] py-3 text-sm font-semibold text-foreground shadow-lg transition-all duration-300 hover:bg-[var(--primary-ocean)] hover:scale-105 active:scale-95
"
                        >
                          Launch App
                        </a>
                      )}
                      {/* Tombol GitHub (Hanya muncul jika project.link.github ada) */}
                      {project.link.github && (
                        <a
                          href={project.link.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          // Styling berbeda untuk aksi sekunder (kode)
                          className="flex-1 text-center rounded-lg bg-slate-700 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-slate-600 hover:scale-105"
                        >
                          {project.link.demo ? '</> View Code' : 'View Code in GitHub'} {/* Teks dinamis */}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

// --- KOMPONEN UTAMA: PROJECTS ---
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <section id="projects" className="relative items-center overflow-hidden projects-section py-44 sm:py-52">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full max-w-7xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 sm:mb-16 text-center section-title" style={{ color: 'var(--primary-ocean)' }}>
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} onSelectProject={() => openModal(project)} />
            ))}
          </div>
        </div>
      </section>

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={closeModal} />
    </>
  );
}
