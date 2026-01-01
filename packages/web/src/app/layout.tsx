import { Providers } from './providers';
import PortalHeaderBar from '@/components/PortalHeaderBar/PortalHeaderBar';
import MainLayout from '@/components/MainLayout/MainLayout';
import { AlertsToast } from '@/components/AlertsToast/AlertsToast';
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
