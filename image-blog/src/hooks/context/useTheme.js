import { useTheme as useNextTheme } from 'next-themes';

/**
 * Custom hook wrapper for theme
 */
export const useTheme = () => {
  return useNextTheme();
};
