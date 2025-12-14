import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme provider wrapper using next-themes
 * Handles dark mode with system preference detection
 */
export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
