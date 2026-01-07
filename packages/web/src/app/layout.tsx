import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import { AlertsToast, MainLayout } from '@/components/common';
import type { MainLayoutProps } from '@/components/common/MainLayout/MainLayout.types';
import { Providers } from './providers';
import '@/theme/fonts.css';
import '@/theme/globals.css';

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'REVA Portal';

export const metadata = {
  title: `${siteName} — Smarter Appeals. Better Outcomes.`,
  description: `${siteName} combines advocacy expertise with intelligent tools to accelerate appeals, overturn denials, and optimize healthcare revenue.`,
};

const menuItems: MainLayoutProps['sidebarMenuItems'] = [
  {
    label: 'Jurisdictions',
    path: '/jurisdictions',
    icon: <AccountTreeIcon />,
  },
  {
    label: 'Organizations',
    path: '/organizations',
    icon: <BusinessIcon />,
  },
  {
    label: 'Platform Admins',
    path: '/platform-admins',
    icon: <AdminPanelSettingsIcon />,
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MainLayout headerOnTop sidebarMenuItems={menuItems} variant="filled">
            {children}
          </MainLayout>
          <AlertsToast />
        </Providers>
      </body>
    </html>
  );
}
