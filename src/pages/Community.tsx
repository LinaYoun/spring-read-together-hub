
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import CommunitySection from '@/components/CommunitySection';

const Community = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-2">
        <h1 className="text-3xl sm:text-4xl font-serif italic text-center mb-6 sm:mb-8">Our Community</h1>
        
        <Card className="border border-bookish-maroon/20 mb-6 sm:mb-8">
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-bookish-maroon" />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-center text-bookish-maroon mb-3 sm:mb-4">Connect with Fellow Readers</h2>
            <p className="text-center text-bookish-dark/80 mb-3 sm:mb-4 text-sm sm:text-base">
              Our community section is designed to help members connect, share ideas, and engage in meaningful discussions about literature.
            </p>
            <p className="text-center text-bookish-dark/80 text-sm sm:text-base">
              Member forums and profiles coming soon.
            </p>
          </CardContent>
        </Card>
        
        <CommunitySection />
      </div>
    </Layout>
  );
};

export default Community;
