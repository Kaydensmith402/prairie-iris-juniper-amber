// src/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar'; // you have this already
import { initTheme } from '@/lib/theme';
import { initSound } from '@/lib/sound';
import { useEffect } from 'react';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  useEffect(() => {
    initTheme();
    initSound(); // preload notification sound
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-primary">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
