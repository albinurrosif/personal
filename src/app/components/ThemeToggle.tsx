'use client';

import { useTheme } from '@/app/contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`w-14 h-14
        fixed bottom-6 right-6 z-50 p-3 rounded-full 
        hover:scale-110 transition-transform duration-300
        shadow-2xl hover:shadow-3xl
      `}
      style={{
        background: isDarkMode ? 'linear-gradient(135deg, var(--primary-ocean), var(--primary-ocean-light))' : 'linear-gradient(135deg, var(--primary-sky), var(--primary-sky-light))',
        color: isDarkMode ? '#fff7b2' : '#0f172a',
        // Shadow 3D effect dengan glow untuk dark mode
        boxShadow: isDarkMode
          ? `0 5px 10px -5px rgba(255, 247, 178, 0.3),
       0 5px 10px -5px rgba(255, 247, 178, 0.2),
       inset 0 -2px 5px rgba(255, 247, 178, 0.1),
       0 0 20px rgba(255, 247, 178, 0.15)` // Glow effect
          : '0 15px 30px -5px rgba(15, 23, 42, 0.3), 0 8px 15px -5px rgba(15, 23, 42, 0.2), inset 0 -3px 8px rgba(255, 255, 255, 0.5)',
        border: isDarkMode
          ? '2px solid rgba(255, 247, 178, 0.3)' // Border lebih terang
          : '2px solid rgba(5, 0, 0, 0.1)',
      }}
    >
      {/* Icon yang lebih besar */}
      <span className="text-2xl flex items-center justify-center">{isDarkMode ? '☀️' : '🌙'}</span>

      {/* Ring pulse dengan efek lebih tebal */}
      <span className="absolute inset-0 rounded-full border-1 border-current animate-ping opacity-50" />
    </button>
  );
}
