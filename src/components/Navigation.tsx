import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Search, Home, BookOpen, ShoppingBag, Briefcase, FileText, Archive } from 'lucide-react';
const Navigation = () => {
  const location = useLocation();
  const navItems = [{
    title: "Home",
    path: "/",
    icon: Home
  }, {
    title: "Shop",
    path: "/shop",
    icon: ShoppingBag
  }, {
    title: "Book Club",
    path: "/book-club",
    icon: BookOpen
  }, {
    title: "Workshop",
    path: "/workshop",
    icon: Briefcase
  }, {
    title: "About",
    path: "/about",
    icon: FileText
  }, {
    title: "Archive",
    path: "/archive",
    icon: Archive
  }];
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  return <>
      <div className="flex justify-between items-center py-4 px-6 border-b border-bookish-maroon/30">
        <Link to="/" className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-bookish-maroon" />
        </Link>
        <Link to="/" className="text-3xl font-serif italic text-bookish-maroon font-bold">Spring Book Club</Link>
        <div className="relative">
          <input type="text" placeholder="Search" className="pl-2 pr-8 py-1 bg-transparent border-b border-bookish-maroon/50 focus:outline-none focus:border-bookish-maroon text-sm" />
          <Search className="absolute right-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-bookish-maroon/70" />
        </div>
      </div>
      
      <nav className="flex justify-center items-center border-b border-bookish-maroon/30">
        <ul className="flex space-x-8 py-2">
          {navItems.map(item => <li key={item.path}>
              <Link to={item.path} className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-all text-bookish-maroon hover:bg-bookish-maroon/10
                  ${isActive(item.path) ? "bg-bookish-maroon/10 font-medium border border-bookish-maroon/30 rounded-full" : ""}`}>
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            </li>)}
        </ul>
      </nav>
    </>;
};
export default Navigation;