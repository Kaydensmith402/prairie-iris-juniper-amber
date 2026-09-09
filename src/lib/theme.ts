export const getTheme = (): 'light' | 'dark' | 'system' => {
  return (localStorage.getItem('police-net-theme') as any) || 'system';
};

export const setTheme = (theme: 'light' | 'dark' | 'system') => {
  localStorage.setItem('police-net-theme', theme);
  applyTheme(theme);
};

export const applyTheme = (theme: 'light' | 'dark' | 'system') => {
  const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolved = theme === 'system' ? (systemIsDark ? 'dark' : 'light') : theme;
  document.documentElement.setAttribute('data-theme', resolved);
};

// Listen for system changes
export const initTheme = () => {
  const theme = getTheme();
  applyTheme(theme);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getTheme() === 'system') applyTheme('system');
  });
};
