'use client';

import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMysql } from 'react-icons/si';

const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: <FaReact className="text-sky-400" size={40} /> },
      { name: 'Next.js', icon: <SiNextdotjs className="text-foreground" size={40} /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-500" size={40} /> },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: <FaNodeJs className="text-green-500" size={40} /> },
      { name: 'MySQL', icon: <SiMysql style={{ color: '#4479A1' }} size={40} /> },
    ],
  },
  {
    category: 'Tools',
    items: [{ name: 'Git', icon: <FaGitAlt className="text-orange-500" size={40} /> }],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-background text-foreground">
      {/* Title */}
      <motion.h2 className="text-3xl sm:text-5xl font-bold mb-12 text-center " initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        Skills
      </motion.h2>

      {/* Skills grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-12 max-w-5xl">
        {skills.map((group, i) => (
          <motion.div key={i} className="flex flex-col items-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.2 }}>
            <h3 className="text-xl font-semibold mb-6 ">{group.category}</h3>
            <div className="grid grid-cols-2 gap-6">
              {group.items.map((skill, j) => (
                <div key={j} className="flex flex-col items-center justify-center gap-2 group">
                  <div className="group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                  <span className="text-sm text-gray-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
