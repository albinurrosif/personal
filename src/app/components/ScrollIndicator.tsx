'use client';

import { useState, useEffect, useRef } from 'react';

export default function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    // Setup IntersectionObserver
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

    // Setup MutationObserver untuk detect ketika sections ditambahkan ke DOM
    mutationObserverRef.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Ketika ada perubahan di DOM, coba observe semua sections
          sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element && observerRef.current && !element.hasAttribute('data-observed')) {
              observerRef.current.observe(element);
              element.setAttribute('data-observed', 'true');
            }
          });
        }
      });
    });

    // Start observing the document
    mutationObserverRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Initial observe
    setTimeout(() => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element && observerRef.current) {
          observerRef.current.observe(element);
          element.setAttribute('data-observed', 'true');
        }
      });
    }, 100);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
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
      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <button key={section.id} onClick={() => scrollToSection(section.id)} className={`flex items-center gap-3 group transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`} aria-label={`Scroll to ${section.label}`}>
            <span
              className={`w-3 h-3 rounded-full transition-all duration-300`}
              style={{
                background: isActive ? 'var(--primary-color)' : 'var(--muted-color)',
                boxShadow: isActive ? '0 0 0 4px var(--primary-color-alpha)' : 'none',
              }}
            />
            <span
              className={`text-sm font-medium transition-all duration-300`}
              style={{
                color: isActive ? 'var(--primary-color)' : 'var(--muted-color)',
                opacity: isActive ? 1 : 0.7,
                fontWeight: '500',
              }}
            >
              {section.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
