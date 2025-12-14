import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Context-aware notifications
const notifications = [
  { trigger: 'upload', message: 'Image compression started', delay: 1000 },
  { trigger: 'upload', message: 'Upload complete - 3 images added', delay: 3000 },
  { trigger: 'scroll', message: 'New posts available - Scroll to refresh', delay: 30000 },
  { trigger: 'storage', message: 'Storage: 4.2 MB used', delay: 60000 },
  { trigger: 'background', message: 'Feed refreshed', delay: 120000 },
];

// Trigger based on user actions, not just random
