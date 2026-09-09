import { useProfile } from '@/store/profile';
import { Link } from '@tanstack/react-router';

export const PersonnelCard = ({ compact = false }: { compact?: boolean }) => {
  const { profile } = useProfile();

  const initials = profile.displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bg-panel border border-border rounded-lg p-4 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-gray-200 overflow-hidden">
        {profile.avatar ? (
          <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <h3 className="mt-2 text-lg font-semibold text-primary">{profile.displayName}</h3>
      <p className="text-sm text-secondary">{profile.rank}</p>
      <p className="text-sm text-secondary">{profile.role}</p>
      {!compact && (
        <>
          <p className="text-sm text-secondary mt-1">Callsign: {profile.callsign}</p>
          <p className="text-sm text-secondary">Collar: {profile.collarNumber}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className={`h-2 w-2 rounded-full ${profile.status === 'On Duty' ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="text-sm text-secondary">{profile.status}</span>
          </div>
        </>
      )}
      <Link to="/profile" className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline">
        View Profile
      </Link>
    </div>
  );
};
