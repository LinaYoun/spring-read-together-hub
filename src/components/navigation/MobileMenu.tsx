
import React from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavLinks from './NavLinks';

const MobileMenu: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger className="mr-2 text-bookish-maroon">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-64 sm:w-80 bg-bookish-cream">
        <div className="py-6">
          <NavLinks isMobile={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
