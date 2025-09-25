'use client';

import { useState, useEffect, useRef } from 'react';

export default function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef(null);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          threshold: [0.3, 0.5, 0.7],
          rootMargin: '-20% 0px -20% 0px',
        }
      );
    }

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`flex items-center gap-3 group transition-all duration-300 ${activeSection === section.id ? 'scale-110' : 'scale-100'}`}
          aria-label={`Scroll to ${section.label}`}
        >
          <span className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === section.id ? 'bg-primary ring-4 ring-primary/20' : 'bg-gray-600 group-hover:bg-gray-400'}`} />
          <span className={`text-sm font-medium transition-all duration-300 ${activeSection === section.id ? 'opacity-100 text-primary font-bold' : 'opacity-70 text-gray-400'}`}>{section.label}</span>
        </button>
      ))}
    </div>
  );
}
