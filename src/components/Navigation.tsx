
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Import our new components
import NavLinks from './navigation/NavLinks';
import SearchBar from './navigation/SearchBar';
import AuthButtons from './navigation/AuthButtons';
import MobileMenu from './navigation/MobileMenu';

const Navigation = () => {
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check if user is logged in when component mounts
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);
  
  return (
    <>
      <div className="flex justify-between items-center py-4 px-4 sm:px-6 border-b border-bookish-maroon/30">
        <div className="flex items-center">
          {isMobile && <MobileMenu />}
          <Link to="/" className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-bookish-maroon" />
          </Link>
        </div>
        
        <Link to="/" className="text-xl sm:text-2xl md:text-3xl font-serif italic text-bookish-maroon font-bold">
          Spring Book Club
        </Link>
        
        <div className="flex items-center gap-2">
          <AuthButtons 
            isMobile={false} 
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn} 
          />
          
          <div className="relative">
            <SearchBar isMobile={isMobile} />
          </div>
        </div>
      </div>
      
      {!isMobile && (
        <nav className="flex justify-center items-center border-b border-bookish-maroon/30">
          <NavLinks isMobile={false} />
        </nav>
      )}
      
      {/* Mobile auth buttons */}
      {isMobile && (
        <AuthButtons 
          isMobile={true} 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
        />
      )}
    </>
  );
};

export default Navigation;
