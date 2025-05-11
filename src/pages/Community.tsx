
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import CommunitySection from '@/components/CommunitySection';

const Community = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif italic text-center mb-8">Our Community</h1>
        
        <Card className="border border-bookish-maroon/20 mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-6">
              <Users className="h-12 w-12 text-bookish-maroon" />
            </div>
            <h2 className="text-2xl font-serif text-center text-bookish-maroon mb-4">Connect with Fellow Readers</h2>
            <p className="text-center text-bookish-dark/80 mb-4">
              Our community section is designed to help members connect, share ideas, and engage in meaningful discussions about literature.
            </p>
            <p className="text-center text-bookish-dark/80">
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
