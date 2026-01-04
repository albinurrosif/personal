'use client';

import { useTheme } from '@/app/contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="theme-toggle fixed right-4 bottom-20 md:bottom-6 z-50 transition-transform duration-150 active:scale-95
"
    >
      <span>{isDarkMode ? '☀️' : '🌙'}</span>
    </button>
  );
}
