
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-6xl font-serif text-bookish-maroon mb-4">404</h1>
        <p className="text-xl text-bookish-dark mb-8">
          Oops! We couldn't find the page you were looking for.
        </p>
        <p className="mb-8 text-bookish-dark/70 max-w-md text-center">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Button className="bg-bookish-maroon hover:bg-bookish-dark text-bookish-cream">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
