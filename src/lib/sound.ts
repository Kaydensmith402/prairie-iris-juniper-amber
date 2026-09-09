let audio: HTMLAudioElement | null = null;

export const initSound = () => {
  audio = new Audio('/sounds/notification.mp3');
  audio.preload = 'auto';
};

export const playNotificationSound = () => {
  const prefs = JSON.parse(localStorage.getItem('police-net-preferences') || '{}');
  if (prefs.notificationSound !== false && audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
};
