
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Hero = () => {
  return (
    <div className="relative overflow-hidden mb-16">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 relative">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto md:mx-0 overflow-hidden border-4 border-bookish-maroon rounded-full">
            <AspectRatio ratio={1/1} className="bg-gradient-to-b from-bookish-light to-bookish-cream">
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop" 
                  alt="Open Book" 
                  className="w-full h-full object-cover opacity-90" 
                />
              </div>
            </AspectRatio>
          </div>
          <div className="absolute -top-2 left-1/2 md:left-1/3 transform -translate-x-1/2 w-full">
            <div className="border-2 border-bookish-maroon w-40 mx-auto" style={{
              borderBottom: 'none',
              borderLeft: 'none',
              borderRight: 'none',
            }}></div>
          </div>
          <div className="absolute -bottom-2 left-1/2 md:left-1/3 transform -translate-x-1/2 w-full">
            <div className="border-2 border-bookish-maroon w-40 mx-auto" style={{
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
            }}></div>
          </div>
        </div>
        <div className="md:w-1/2 pt-8 md:pt-0 text-center md:text-left">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif italic mb-6 text-bookish-maroon">
            Just One<br />More Page...
          </h1>
          <p className="text-bookish-dark mb-6 max-w-xl">
            Spring Book Club is a community of passionate readers who gather to discuss English books and literature. Join us for reading sessions, workshops, and lively discussions in a cozy atmosphere.
          </p>
          <Button className="bg-bookish-maroon hover:bg-bookish-dark text-bookish-cream">
            Join our Community <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
