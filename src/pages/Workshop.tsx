
import React from 'react';
import Layout from '@/components/Layout';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Calendar, Users, BookOpen } from 'lucide-react';

const Workshop = () => {
  const upcomingWorkshops = [
    {
      id: 1,
      title: "Creative Writing Workshop",
      date: "June 15, 2025",
      image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1170&auto=format&fit=crop",
      participants: 12
    },
    {
      id: 2,
      title: "Book Analysis Techniques",
      date: "July 3, 2025",
      image: "https://images.unsplash.com/photo-1562932831-afcfe48b5786?q=80&w=1074&auto=format&fit=crop",
      participants: 8
    }
  ];

  return (
    <Layout>
      <div className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif italic text-bookish-maroon mb-6">Literary Workshops</h1>
          <p className="text-bookish-dark max-w-2xl mx-auto">
            Enhance your reading and writing skills through our interactive workshops. Led by experienced facilitators, 
            these sessions provide valuable insights and practical techniques for literary appreciation and creative expression.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {upcomingWorkshops.map((workshop) => (
            <div key={workshop.id} className="border border-bookish-maroon/20 rounded-lg overflow-hidden transition-all hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <AspectRatio ratio={16/9} className="bg-gradient-to-b from-bookish-light to-bookish-cream">
                  <img 
                    src={workshop.image} 
                    alt={workshop.title} 
                    className="w-full h-full object-cover" 
                  />
                </AspectRatio>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl text-bookish-maroon mb-2">{workshop.title}</h3>
                <div className="flex items-center text-bookish-dark/70 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{workshop.date}</span>
                </div>
                <div className="flex items-center text-bookish-dark/70">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">{workshop.participants} participants</span>
                </div>
                <div className="mt-4">
                  <button className="text-bookish-maroon border border-bookish-maroon/50 px-4 py-2 rounded text-sm hover:bg-bookish-maroon hover:text-bookish-cream transition-colors">
                    Register Interest
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-bookish-light/50 rounded-lg max-w-3xl mx-auto text-center">
          <BookOpen className="w-8 h-8 mx-auto text-bookish-maroon mb-3" />
          <h3 className="text-xl font-serif text-bookish-maroon mb-2">Suggest a Workshop</h3>
          <p className="text-bookish-dark mb-4">
            Have an idea for a workshop? We welcome suggestions from our community members!
          </p>
          <button className="bg-bookish-maroon text-bookish-cream px-5 py-2 rounded hover:bg-bookish-dark transition-colors">
            Submit Your Idea
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Workshop;
