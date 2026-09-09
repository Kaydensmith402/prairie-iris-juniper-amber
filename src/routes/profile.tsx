// src/routes/profile.tsx
import { useState, useRef } from 'react';
import { createFileRoute, Link, useSearch } from '@tanstack/react-router';
import { useProfile } from '@/store/profile';
import { PersonnelCard } from '@/components/personnel-card';

// Predefined rank list (including "Other")
const RANKS = [
  'Chief Constable',
  'Deputy Chief Constable',
  'Assistant Chief Constable',
  'Chief Superintendent',
  'Superintendent',
  'Chief Inspector',
  'Inspector',
  'Sergeant',
  'Detective Sergeant',
  'Police Constable',
  'Detective Constable',
  'Special Constable',
  'PCSO',
  'Control Room Operator',
  'Control Room Supervisor',
  'Communications Officer',
  'Other',
];

// Sample activity log (stored separately in localStorage)
const getActivityLog = (): { date: string; action: string; module: string; status: string }[] => {
  const stored = localStorage.getItem('police-net-activity');
  if (stored) return JSON.parse(stored);
  const sample = [
    { date: new Date().toISOString(), action: 'Logged into PoliceNet', module: 'Auth', status: 'Completed' },
    { date: new Date(Date.now() - 3600000).toISOString(), action: 'Viewed Firearms Incident card', module: 'Tactics', status: 'Viewed' },
    { date: new Date(Date.now() - 7200000).toISOString(), action: 'Opened incident INC-2048', module: 'Incidents', status: 'Opened' },
    { date: new Date(Date.now() - 86400000).toISOString(), action: 'Updated profile details', module: 'Profile', status: 'Updated' },
  ];
  localStorage.setItem('police-net-activity', JSON.stringify(sample));
  return sample;
};

const addActivity = (action: string, module: string) => {
  const log = getActivityLog();
  const entry = { date: new Date().toISOString(), action, module, status: 'Completed' };
  log.unshift(entry);
  localStorage.setItem('police-net-activity', JSON.stringify(log));
};

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, updateProfile } = useProfile();
  const search = useSearch({ from: Route.id });
  const editMode = (search as any)?.edit === 'true';
  const [editing, setEditing] = useState(editMode);

  // Form state
  const [form, setForm] = useState(profile);
  const [customRank, setCustomRank] = useState('');
  const [selectedRank, setSelectedRank] = useState(profile.rank);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setForm((prev) => ({ ...prev, avatar: dataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setForm((prev) => ({ ...prev, avatar: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const saveProfile = () => {
    let finalRank = selectedRank;
    if (selectedRank === 'Other') finalRank = customRank || 'Other';
    const updated = { ...form, rank: finalRank };
    updateProfile(updated);
    addActivity('Updated profile details', 'Profile');
    setEditing(false);
  };

  const cancelEdit = () => {
    setForm(profile);
    setSelectedRank(profile.rank);
    setEditing(false);
  };

  const activityLog = getActivityLog();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">My Profile</h1>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Personnel Card (compact) */}
        <div className="md:col-span-1">
          <PersonnelCard compact />
        </div>

        {/* Right: Profile details / edit form */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-panel border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-primary mb-4">Profile Information</h2>
            {editing ? (
              <div className="space-y-4">
                {/* Avatar upload */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Profile Picture</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-gray-200 overflow-hidden">
                      {form.avatar ? (
                        <img src={form.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        form.displayName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-primary rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                      >
                        Upload
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                      <button
                        onClick={removeAvatar}
                        className="ml-2 px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Display Name */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Display Name</label>
                  <input
                    type="text"
                    value={form.displayName}
                    onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                    className="w-full p-2 border border-border rounded bg-bg-secondary text-primary"
                  />
                </div>

                {/* Rank dropdown + custom */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Rank</label>
                  <select
                    value={selectedRank}
                    onChange={(e) => setSelectedRank(e.target.value)}
                    className="w-full p-2 border border-border rounded bg-bg-secondary text-primary"
                  >
                    {RANKS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {selectedRank === 'Other' && (
                    <input
                      type="text"
                      placeholder="Enter custom rank"
                      value={customRank}
                      onChange={(e) => setCustomRank(e.target.value)}
                      className="w-full mt-2 p-2 border border-border rounded bg-bg-secondary text-primary"
                    />
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Role</label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full p-2 border border-border rounded bg-bg-secondary text-primary"
                  />
                </div>

                {/* Callsign */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Callsign</label>
                  <input
                    type="text"
                    value={form.callsign}
                    onChange={(e) => setForm({ ...form, callsign: e.target.value })}
                    className="w-full p-2 border border-border rounded bg-bg-secondary text-primary"
                  />
                </div>

                {/* Collar Number */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Collar Number</label>
                  <input
                    type="text"
                    value={form.collarNumber}
                    onChange={(e) => setForm({ ...form, collarNumber: e.target.value })}
                    className="w-full p-2 border border-border rounded bg-bg-secondary text-primary"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Department</label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full p-2 border border-border rounded bg-bg-secondary text-primary"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full p-2 border border-border rounded bg-bg-secondary text-primary"
                  >
                    <option value="On Duty">On Duty</option>
                    <option value="Off Duty">Off Duty</option>
                    <option value="Training">Training</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-2 border border-border rounded bg-bg-secondary text-primary"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Bio / About Me</label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    rows={3}
                    className="w-full p-2 border border-border rounded bg-bg-secondary text-primary"
                  />
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={saveProfile}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-primary rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-secondary">Display Name</span>
                  <span className="text-primary font-medium">{profile.displayName}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-secondary">Rank</span>
                  <span className="text-primary font-medium">{profile.rank}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-secondary">Role</span>
                  <span className="text-primary font-medium">{profile.role}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-secondary">Callsign</span>
                  <span className="text-primary font-medium">{profile.callsign}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-secondary">Collar Number</span>
                  <span className="text-primary font-medium">{profile.collarNumber}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-secondary">Department</span>
                  <span className="text-primary font-medium">{profile.department}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-secondary">Status</span>
                  <span className="text-primary font-medium">{profile.status}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-secondary">Email</span>
                  <span className="text-primary font-medium">{profile.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Bio</span>
                  <span className="text-primary font-medium">{profile.bio || 'Not set'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Activity Log */}
          <div className="bg-panel border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-primary mb-4">Activity Log</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {activityLog.map((entry, idx) => (
                <div key={idx} className="flex justify-between text-sm border-b border-border py-2">
                  <span className="text-primary">{entry.action}</span>
                  <span className="text-secondary">{new Date(entry.date).toLocaleString()}</span>
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded">
                    {entry.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
