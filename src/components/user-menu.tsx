import { useState, useRef, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { useProfile } from '@/store/profile';

export const UserMenu = () => {
  const { profile } = useProfile();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = profile.displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-200 overflow-hidden">
          {profile.avatar ? (
            <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            initials
          )}
        </div>
        <span className="hidden sm:inline text-sm font-medium text-primary">
          {profile.displayName}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-panel border border-border rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-200 overflow-hidden">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <div>
                <p className="font-semibold text-primary">{profile.displayName}</p>
                <p className="text-xs text-secondary">{profile.rank}</p>
                <p className="text-xs text-secondary">{profile.role}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className={`h-2 w-2 rounded-full ${profile.status === 'On Duty' ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-xs text-secondary">{profile.status}</span>
                </div>
              </div>
            </div>
          </div>
          <Link to="/profile" className="block px-4 py-2 text-sm text-primary hover:bg-gray-100 dark:hover:bg-gray-700">
            My Profile
          </Link>
          <Link to="/profile?edit=true" className="block px-4 py-2 text-sm text-primary hover:bg-gray-100 dark:hover:bg-gray-700">
            Edit Profile
          </Link>
          <Link to="/settings" className="block px-4 py-2 text-sm text-primary hover:bg-gray-100 dark:hover:bg-gray-700">
            Preferences
          </Link>
          <Link to="/profile?tab=activity" className="block px-4 py-2 text-sm text-primary hover:bg-gray-100 dark:hover:bg-gray-700">
            Activity
          </Link>
          <Link to="/notifications" className="block px-4 py-2 text-sm text-primary hover:bg-gray-100 dark:hover:bg-gray-700">
            Notifications
          </Link>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
