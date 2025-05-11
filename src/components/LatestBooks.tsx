
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "/placeholder.svg",
    description: "Between life and death there is a library, and within that library, the shelves go on forever."
  },
  {
    id: 2,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover: "/placeholder.svg",
    description: "From the Nobel Prize-winning author, a story about the human heart."
  },
  {
    id: 3,
    title: "The Four Winds",
    author: "Kristin Hannah",
    cover: "/placeholder.svg",
    description: "An epic novel of love and heroism and hope, set against the Great Depression."
  }
];

const LatestBooks = () => {
  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif italic text-bookish-maroon">This Month's Readings</h2>
        <Button variant="link" className="text-bookish-maroon hover:text-bookish-dark font-serif">
          View All Books
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book.id} className="border border-bookish-maroon/20 bg-bookish-light hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="h-40 flex justify-center items-center bg-bookish-maroon/5 mb-2">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-full object-contain border border-bookish-maroon/20"
                />
              </div>
              <CardTitle className="text-xl font-serif text-bookish-maroon">{book.title}</CardTitle>
              <CardDescription className="font-medium text-bookish-dark/70">{book.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-bookish-dark/80">{book.description}</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full text-bookish-maroon border-bookish-maroon/30 hover:bg-bookish-maroon/10">
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LatestBooks;
