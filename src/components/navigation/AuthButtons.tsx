
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AuthButtonsProps {
  isMobile: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isMobile, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

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

  if (isMobile) {
    return (
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
    );
  }

  return (
    <>
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
    </>
  );
};

export default AuthButtons;
