
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif italic text-center mb-8">About Our Book Club</h1>
        
        <Card className="mb-8 border border-bookish-maroon/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-serif text-bookish-maroon mb-4">Our Story</h2>
            <p className="mb-4">
              Spring Book Club was founded in 2020 by a group of passionate readers who wanted to create a community centered around English literature. What started as informal gatherings in a small café has grown into a vibrant community of book lovers from diverse backgrounds.
            </p>
            <p>
              Our mission is to foster a love for reading, provide a platform for meaningful discussions, and create connections through shared literary experiences. We believe that books have the power to transform, inspire, and unite people.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8 border border-bookish-maroon/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-serif text-bookish-maroon mb-4">What We Do</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Monthly book discussions on selected English novels</li>
              <li>Author workshops and creative writing sessions</li>
              <li>Reading retreats and literary events</li>
              <li>Book exchanges and recommendations</li>
              <li>Online discussions and resource sharing</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border border-bookish-maroon/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-serif text-bookish-maroon mb-4">Join Us</h2>
            <p className="mb-4">
              We welcome readers of all levels who are interested in English literature. Whether you're a native speaker or learning English as a second language, our club provides a supportive environment to engage with literature and improve your language skills.
            </p>
            <p>
              To become a member, simply fill out the registration form and attend our next meeting. Our membership is free, and we look forward to welcoming you to our community!
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;
