
import React from 'react';
import Navigation from './Navigation';
import { Toaster } from '@/components/ui/sonner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-bookish-maroon">
      <div className="container mx-auto pt-4 sm:pt-8 pb-8 sm:pb-16 px-2 sm:px-4">
        <div className="page-border min-h-[calc(100vh-4rem)]">
          <Navigation />
          <main className="px-3 sm:px-4 md:px-8 lg:px-12 py-4 sm:py-6">
            {children}
          </main>
          <footer className="border-t border-bookish-maroon/30 py-3 sm:py-4 px-4 sm:px-6 text-center">
            <p className="text-xs sm:text-sm text-bookish-maroon/70">
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
