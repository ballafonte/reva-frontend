import { Providers } from './providers';
import { AlertsToast, MainLayout, PortalHeaderBar } from '@/components/common';
import '@/theme/globals.css';

export const metadata = {
  title: 'Reva Frontend',
  description: 'Reva Frontend Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <PortalHeaderBar />
          <MainLayout>{children}</MainLayout>
          <AlertsToast />
        </Providers>
      </body>
    </html>
  );
}
