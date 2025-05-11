
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, BookOpen, Archive, Calendar, Users, Mail, LayoutDashboard } from 'lucide-react';

interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [{
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

const isActive = (path: string, currentPath: string): boolean => {
  if (path === '/' && currentPath === '/') return true;
  if (path !== '/' && currentPath.startsWith(path)) return true;
  return false;
};

interface NavLinksProps {
  isMobile: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ isMobile }) => {
  const location = useLocation();
  
  return (
    <ul className={`${isMobile ? 'flex flex-col space-y-4' : 'flex space-x-8'} py-2`}>
      {navItems.map(item => (
        <li key={item.path}>
          <Link 
            to={item.path} 
            className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-all text-bookish-maroon hover:bg-bookish-maroon/10
              ${isActive(item.path, location.pathname) ? "bg-bookish-maroon/10 font-medium border border-bookish-maroon/30 rounded-full" : ""}`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
