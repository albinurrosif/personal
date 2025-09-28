'use client';

import { useTheme } from '@/app/contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} className="theme-toggle">
      <span>{isDarkMode ? '☀️' : '🌙'}</span>
    </button>
  );
}
