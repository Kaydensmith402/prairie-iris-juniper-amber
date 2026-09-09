// src/components/header.tsx
import { Link } from '@tanstack/react-router';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserMenu } from '@/components/user-menu';

export const Header = () => {
  return (
    <header className="border-b border-border bg-panel px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-primary">
          PoliceNet
        </Link>
        <span className="text-xs text-secondary hidden sm:inline">
          Stonehaven Constabulary
        </span>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
};
