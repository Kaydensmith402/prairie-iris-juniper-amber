import { useState, useEffect } from 'react';

export interface Profile {
  displayName: string;
  preferredName?: string;
  rank: string;
  role: string;
  callsign: string;
  collarNumber: string;
  department: string;
  status: 'On Duty' | 'Off Duty' | 'Training' | 'On Leave';
  email: string;
  bio: string;
  avatar: string | null; // data URL
}

const defaultProfile: Profile = {
  displayName: 'Kayden Smith',
  rank: 'Police Constable',
  role: 'Control Room Operator',
  callsign: 'Control-21',
  collarNumber: '1234',
  department: 'Control Room',
  status: 'On Duty',
  email: 'user@example.com',
  bio: '',
  avatar: null,
};

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile>(() => {
    const stored = localStorage.getItem('police-net-profile');
    return stored ? JSON.parse(stored) : defaultProfile;
  });

  const updateProfile = (updates: Partial<Profile>) => {
    const newProfile = { ...profile, ...updates };
    setProfile(newProfile);
    localStorage.setItem('police-net-profile', JSON.stringify(newProfile));
  };

  return { profile, updateProfile };
};
