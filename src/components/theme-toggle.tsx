import { useState } from 'react';
import { getTheme, setTheme } from '@/lib/theme';

export const ThemeToggle = () => {
  const [theme, setThemeState] = useState(getTheme());

  const cycleTheme = () => {
    const next: Record<string, 'light' | 'dark' | 'system'> = {
      light: 'dark',
      dark: 'system',
      system: 'light',
    };
    const newTheme = next[theme];
    setThemeState(newTheme);
    setTheme(newTheme);
  };

  const icon = {
    light: '☀️',
    dark: '🌙',
    system: '🖥️',
  }[theme];

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      title="Toggle theme"
    >
      {icon}
    </button>
  );
};
