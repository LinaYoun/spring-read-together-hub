
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Search, Home, BookOpen, FileText, Archive, Calendar, Users, Menu, X, UserPlus, LogIn, LayoutDashboard, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check if user is logged in when component mounts
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);
  
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
  }, {
    title: "Admin",
    path: "/admin",
    icon: LayoutDashboard
  }];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    // Clear any stored user data/session
    localStorage.removeItem('user');
    
    // Update login state
    setIsLoggedIn(false);
    
    // Show toast message
    toast.success("Logged out successfully");
    
    // Navigate to home page
    navigate('/');
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
          {!isLoggedIn ? (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden sm:flex items-center text-bookish-maroon hover:bg-bookish-maroon/10" 
                asChild
              >
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
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
                  Sign Up
                </Link>
              </Button>
            </>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden sm:flex items-center text-bookish-maroon hover:bg-bookish-maroon/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          )}
          
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
      
      {/* Mobile login, signup and logout buttons */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-10 flex flex-col gap-2">
          {!isLoggedIn ? (
            <>
              <Button 
                className="bg-bookish-maroon hover:bg-bookish-dark shadow-lg rounded-full"
                asChild
              >
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Link>
              </Button>
              <Button 
                className="bg-bookish-maroon hover:bg-bookish-dark shadow-lg rounded-full"
                asChild
              >
                <Link to="/signup">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Sign Up
                </Link>
              </Button>
            </>
          ) : (
            <Button 
              className="bg-bookish-maroon hover:bg-bookish-dark shadow-lg rounded-full"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default Navigation;
