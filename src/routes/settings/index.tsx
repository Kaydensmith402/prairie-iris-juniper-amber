// src/routes/settings/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { getTheme, setTheme } from '@/lib/theme';

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
});

type Preferences = {
  appearance: 'light' | 'dark' | 'system';
  compactMode: boolean;
  showSidebarLabels: boolean;
  reduceAnimations: boolean;
  clockFormat: '12h' | '24h';
  incidentAlerts: boolean;
  supervisorAlerts: boolean;
  checklistReminders: boolean;
  systemNotifications: boolean;
  notificationSound: boolean;
  showRank: boolean;
  showCallsign: boolean;
  showDepartment: boolean;
};

const defaultPrefs: Preferences = {
  appearance: 'system',
  compactMode: false,
  showSidebarLabels: true,
  reduceAnimations: false,
  clockFormat: '24h',
  incidentAlerts: true,
  supervisorAlerts: true,
  checklistReminders: true,
  systemNotifications: true,
  notificationSound: true,
  showRank: true,
  showCallsign: true,
  showDepartment: true,
};

const getPrefs = (): Preferences => {
  const stored = localStorage.getItem('police-net-preferences');
  return stored ? { ...defaultPrefs, ...JSON.parse(stored) } : defaultPrefs;
};

const savePrefs = (prefs: Preferences) => {
  localStorage.setItem('police-net-preferences', JSON.stringify(prefs));
};

function SettingsPage() {
  const [prefs, setPrefs] = useState<Preferences>(getPrefs);

  useEffect(() => {
    // Apply appearance on load
    setTheme(prefs.appearance);
  }, []);

  const update = <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    const updated = { ...prefs, [key]: value };
    setPrefs(updated);
    savePrefs(updated);
    if (key === 'appearance') setTheme(value as any);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-8">
      <h1 className="text-2xl font-bold text-primary">Preferences</h1>

      {/* Appearance */}
      <section className="bg-panel border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Appearance</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Theme</label>
            <select
              value={prefs.appearance}
              onChange={(e) => update('appearance', e.target.value as any)}
              className="w-full p-2 border border-border rounded bg-bg-secondary text-primary"
            >
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
              <option value="system">🖥️ System</option>
            </select>
          </div>
        </div>
      </section>

      {/* Interface */}
      <section className="bg-panel border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Interface</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.compactMode}
              onChange={(e) => update('compactMode', e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-primary">Compact mode (denser spacing)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.showSidebarLabels}
              onChange={(e) => update('showSidebarLabels', e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-primary">Show sidebar labels</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.reduceAnimations}
              onChange={(e) => update('reduceAnimations', e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-primary">Reduce animations</span>
          </label>
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Clock format</label>
            <select
              value={prefs.clockFormat}
              onChange={(e) => update('clockFormat', e.target.value as any)}
              className="w-full p-2 border border-border rounded bg-bg-secondary text-primary"
            >
              <option value="12h">12‑hour</option>
              <option value="24h">24‑hour</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-panel border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Notifications</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.incidentAlerts}
              onChange={(e) => update('incidentAlerts', e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-primary">Incident alerts</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.supervisorAlerts}
              onChange={(e) => update('supervisorAlerts', e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-primary">Supervisor alerts</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.checklistReminders}
              onChange={(e) => update('checklistReminders', e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-primary">Checklist reminders</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.systemNotifications}
              onChange={(e) => update('systemNotifications', e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-primary">System notifications</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.notificationSound}
              onChange={(e) => update('notificationSound', e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-primary">Notification sound</span>
          </label>
        </div>
      </section>

      {/* Profile Visibility */}
      <section className="bg-panel border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Profile Display</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.showRank}
              onChange={(e) => update('showRank', e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-primary">Show rank</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.showCallsign}
              onChange={(e) => update('showCallsign', e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-primary">Show callsign</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.showDepartment}
              onChange={(e) => update('showDepartment', e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-primary">Show department</span>
          </label>
        </div>
      </section>
    </div>
  );
}
