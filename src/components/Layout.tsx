
import React from 'react';
import Navigation from './Navigation';
import { Toaster } from '@/components/ui/sonner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-bookish-maroon">
      <div className="container mx-auto pt-8 pb-16 px-4">
        <div className="page-border min-h-[calc(100vh-6rem)]">
          <Navigation />
          <main className="px-4 py-6 sm:px-8 md:px-12">
            {children}
          </main>
          <footer className="border-t border-bookish-maroon/30 py-4 px-6 text-center">
            <p className="text-sm text-bookish-maroon/70">
              &copy; {new Date().getFullYear()} Spring Book Club. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Layout;
