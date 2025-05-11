
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import LatestBooks from '@/components/LatestBooks';
import UpcomingEvents from '@/components/UpcomingEvents';
import CommunitySection from '@/components/CommunitySection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <LatestBooks />
      <UpcomingEvents />
      <CommunitySection />
    </Layout>
  );
};

export default Index;
