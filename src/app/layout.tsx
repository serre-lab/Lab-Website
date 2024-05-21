'use client';
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { HeaderSimple } from '@/components/Header/HeaderSimple';
import { FooterCentered } from '@/components/Footer/FooterCentered';
import { usePathname } from 'next/navigation';


// export const metadata = {
//   title: 'My Mantine app',
//   description: 'I have followed setup instructions carefully',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  console.log(pathname);
  if (pathname.includes('/admin')) {
    // Render payload page without layout
    return <>{children}</>;
  }
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <HeaderSimple />
          {children}
          <FooterCentered />
        </MantineProvider>
      </body>
    </html>
  );
}
