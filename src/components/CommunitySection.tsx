
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CommunitySection = () => {
  return (
    <section className="mb-16">
      <div className="bg-bookish-maroon/10 rounded-lg p-8 border border-bookish-maroon/20 text-center">
        <h2 className="text-3xl font-serif italic text-bookish-maroon mb-4">Join our Community</h2>
        <p className="text-bookish-dark mb-6 max-w-2xl mx-auto">
          Connect with fellow book lovers, participate in discussions, access exclusive content, and stay updated with all our club activities. We meet weekly to discuss great literature in English.
        </p>
        <div className="flex justify-center space-x-4">
          <Button className="bg-bookish-maroon hover:bg-bookish-dark text-bookish-cream">
            Sign Up <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="border-bookish-maroon text-bookish-maroon hover:bg-bookish-maroon/10">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
