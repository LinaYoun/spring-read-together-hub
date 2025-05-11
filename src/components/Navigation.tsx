
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Search, Home, BookOpen, FileText, Archive, Calendar, Users, Menu, X, UserPlus, LogIn } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const navItems = [{
    title: "Home",
    path: "/",
    icon: Home
  }, {
    title: "About Us",
    path: "/about",
    icon: FileText
  }, {
    title: "Book Club",
    path: "/book-club",
    icon: BookOpen
  }, {
    title: "Resources",
    path: "/archive",
    icon: Archive
  }, {
    title: "Calendar",
    path: "/calendar",
    icon: Calendar
  }, {
    title: "Community",
    path: "/community",
    icon: Users
  }, {
    title: "Contact",
    path: "/contact",
    icon: Mail
  }];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const NavLinks = () => (
    <ul className={`${isMobile ? 'flex flex-col space-y-4' : 'flex space-x-8'} py-2`}>
      {navItems.map(item => (
        <li key={item.path}>
          <Link 
            to={item.path} 
            className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-all text-bookish-maroon hover:bg-bookish-maroon/10
              ${isActive(item.path) ? "bg-bookish-maroon/10 font-medium border border-bookish-maroon/30 rounded-full" : ""}`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="flex justify-between items-center py-4 px-4 sm:px-6 border-b border-bookish-maroon/30">
        <div className="flex items-center">
          {isMobile && (
            <Sheet>
              <SheetTrigger className="mr-2 text-bookish-maroon">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-64 sm:w-80 bg-bookish-cream">
                <div className="py-6">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          )}
          <Link to="/" className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-bookish-maroon" />
          </Link>
        </div>
        
        <Link to="/" className="text-xl sm:text-2xl md:text-3xl font-serif italic text-bookish-maroon font-bold">
          Spring Book Club
        </Link>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden sm:flex items-center text-bookish-maroon hover:bg-bookish-maroon/10" 
            asChild
          >
            <Link to="/login">
              <LogIn className="h-4 w-4 mr-1" />
              로그인
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden sm:flex items-center text-bookish-maroon hover:bg-bookish-maroon/10" 
            asChild
          >
            <Link to="/signup">
              <UserPlus className="h-4 w-4 mr-1" />
              회원가입
            </Link>
          </Button>
          
          <div className="relative">
            {isMobile ? (
              isSearchActive ? (
                <div className="absolute right-0 top-0 flex items-center">
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="pl-2 pr-8 py-1 bg-transparent border-b border-bookish-maroon/50 focus:outline-none focus:border-bookish-maroon text-sm w-full" 
                    autoFocus
                    onBlur={() => setIsSearchActive(false)}
                  />
                  <X 
                    className="absolute right-2 h-4 w-4 text-bookish-maroon/70 cursor-pointer" 
                    onClick={() => setIsSearchActive(false)}
                  />
                </div>
              ) : (
                <Search 
                  className="h-5 w-5 text-bookish-maroon/70 cursor-pointer" 
                  onClick={() => setIsSearchActive(true)}
                />
              )
            ) : (
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="pl-2 pr-8 py-1 bg-transparent border-b border-bookish-maroon/50 focus:outline-none focus:border-bookish-maroon text-sm" 
                />
                <Search className="absolute right-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-bookish-maroon/70" />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {!isMobile && (
        <nav className="flex justify-center items-center border-b border-bookish-maroon/30">
          <NavLinks />
        </nav>
      )}
      
      {/* 모바일 로그인 및 회원가입 버튼 */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-10 flex flex-col gap-2">
          <Button 
            className="bg-bookish-maroon hover:bg-bookish-dark shadow-lg rounded-full"
            asChild
          >
            <Link to="/login">
              <LogIn className="h-4 w-4 mr-1" />
              로그인
            </Link>
          </Button>
          <Button 
            className="bg-bookish-maroon hover:bg-bookish-dark shadow-lg rounded-full"
            asChild
          >
            <Link to="/signup">
              <UserPlus className="h-4 w-4 mr-1" />
              회원가입
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default Navigation;
