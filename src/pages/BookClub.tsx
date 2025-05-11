
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BookClub = () => {
  return (
    <Layout>
      <h1 className="text-4xl font-serif italic text-center mb-8">Book Club</h1>
      
      <Tabs defaultValue="current" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="current" className="text-bookish-maroon data-[state=active]:bg-bookish-maroon/10">Current Reading</TabsTrigger>
          <TabsTrigger value="schedule" className="text-bookish-maroon data-[state=active]:bg-bookish-maroon/10">Reading Schedule</TabsTrigger>
          <TabsTrigger value="history" className="text-bookish-maroon data-[state=active]:bg-bookish-maroon/10">Past Books</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <Card className="border border-bookish-maroon/20">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-bookish-maroon">The Midnight Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-56 h-72 bg-gray-200 flex items-center justify-center border border-bookish-maroon/20">
                    <span className="text-gray-500">Book Cover</span>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <p className="mb-4 italic text-bookish-dark/70">By Matt Haig (2020)</p>
                  <p className="mb-4">
                    Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?
                  </p>
                  <p className="mb-4">
                    A dazzling novel about all the choices that go into a life well lived, from the internationally bestselling author of Reasons to Stay Alive and How To Stop Time.
                  </p>
                  <div className="mt-6">
                    <h3 className="font-serif text-bookish-maroon text-lg mb-2">Discussion Questions</h3>
                    <ul className="list-disc list-inside space-y-2 text-bookish-dark/80">
                      <li>What would your midnight library contain?</li>
                      <li>How does Nora's perception of her life change throughout the story?</li>
                      <li>What does this book teach us about regret and second chances?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card className="border border-bookish-maroon/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif text-bookish-maroon mb-4">Reading Schedule 2025</h2>
              <div className="space-y-4">
                <div className="border-b border-bookish-maroon/20 pb-4">
                  <h3 className="font-serif text-bookish-maroon text-lg">May</h3>
                  <p className="font-medium">The Midnight Library by Matt Haig</p>
                  <p className="text-sm text-bookish-dark/70">Discussion: May 15, 2025</p>
                </div>
                <div className="border-b border-bookish-maroon/20 pb-4">
                  <h3 className="font-serif text-bookish-maroon text-lg">June</h3>
                  <p className="font-medium">Klara and the Sun by Kazuo Ishiguro</p>
                  <p className="text-sm text-bookish-dark/70">Discussion: June 19, 2025</p>
                </div>
                <div className="border-b border-bookish-maroon/20 pb-4">
                  <h3 className="font-serif text-bookish-maroon text-lg">July</h3>
                  <p className="font-medium">The Four Winds by Kristin Hannah</p>
                  <p className="text-sm text-bookish-dark/70">Discussion: July 17, 2025</p>
                </div>
                <div>
                  <h3 className="font-serif text-bookish-maroon text-lg">August</h3>
                  <p className="font-medium">Project Hail Mary by Andy Weir</p>
                  <p className="text-sm text-bookish-dark/70">Discussion: August 21, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card className="border border-bookish-maroon/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif text-bookish-maroon mb-4">Our Reading History</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-bookish-maroon text-lg">2024</h3>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-bookish-dark/80">
                    <li>The Song of Achilles by Madeline Miller</li>
                    <li>Cloud Cuckoo Land by Anthony Doerr</li>
                    <li>The Lincoln Highway by Amor Towles</li>
                    <li>The Christie Affair by Nina de Gramont</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-bookish-maroon text-lg">2023</h3>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-bookish-dark/80">
                    <li>The Midnight Library by Matt Haig</li>
                    <li>Lessons in Chemistry by Bonnie Garmus</li>
                    <li>Tomorrow, and Tomorrow, and Tomorrow by Gabrielle Zevin</li>
                    <li>Demon Copperhead by Barbara Kingsolver</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-bookish-maroon text-lg">2022</h3>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-bookish-dark/80">
                    <li>The Seven Husbands of Evelyn Hugo by Taylor Jenkins Reid</li>
                    <li>Book Lovers by Emily Henry</li>
                    <li>Sea of Tranquility by Emily St. John Mandel</li>
                    <li>The Paris Apartment by Lucy Foley</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default BookClub;
