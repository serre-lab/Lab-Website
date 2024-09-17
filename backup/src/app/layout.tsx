'use client';
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';


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
    console.log('IT HAS ADMIN IN IT')
    // Render payload page without layout
    return (
      <>
      {children}
      </>
    );
    // return <div>{children}</div>;
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
