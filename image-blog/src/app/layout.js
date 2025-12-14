import "./globals.css";

export const metadata = {
  title: "Image Blog - Infinite Scroll",
  description: "Modern image blog with infinite scroll and background notifications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
