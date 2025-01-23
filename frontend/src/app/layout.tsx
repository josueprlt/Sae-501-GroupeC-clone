import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next/types';
import RootLayoutClient from '@/components/ui/rootLayoutClient';
import { Toaster } from "@/components/ui/sonner";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: "%s | L'agendary",
    default: "L'agendary",
  },
  icons: {
    icon: "/logo.svg",
  },
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="fr">
      <body className='flex flex-col min-h-screen'>
        <RootLayoutClient>{children}</RootLayoutClient>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;