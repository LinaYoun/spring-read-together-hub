
import React from 'react';
import Layout from '@/components/Layout';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Shop = () => {
  const featuredBooks = [
    {
      id: 1,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1074&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=987&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1076&auto=format&fit=crop"
    }
  ];

  return (
    <Layout>
      <div className="text-center py-12">
        <h1 className="text-4xl font-serif italic text-bookish-maroon mb-6">Book Shop</h1>
        <p className="text-bookish-dark max-w-2xl mx-auto mb-12">
          Our book shop section features recommended books for our club readings. Browse through our curated selection of literary works.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredBooks.map((book) => (
            <div key={book.id} className="group border border-bookish-maroon/20 rounded-lg overflow-hidden transition-all hover:shadow-lg p-4">
              <div className="h-64 overflow-hidden mb-4">
                <AspectRatio ratio={3/4} className="bg-gradient-to-b from-bookish-light to-bookish-cream">
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                  />
                </AspectRatio>
              </div>
              <h3 className="font-serif text-xl text-bookish-maroon">{book.title}</h3>
              <p className="text-bookish-dark/70">{book.author}</p>
              <p className="mt-2 text-sm italic text-bookish-dark/50">Coming soon</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
