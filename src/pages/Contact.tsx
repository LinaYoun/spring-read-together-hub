
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif italic text-center mb-8">Contact Us</h1>
        
        <Card className="border border-bookish-maroon/20 mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-serif text-bookish-maroon mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-bookish-maroon mr-4" />
                <div>
                  <h3 className="font-medium text-bookish-dark">Email</h3>
                  <p className="text-bookish-dark/70">info@springbookclub.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-bookish-maroon mr-4" />
                <div>
                  <h3 className="font-medium text-bookish-dark">Phone</h3>
                  <p className="text-bookish-dark/70">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-bookish-maroon mr-4" />
                <div>
                  <h3 className="font-medium text-bookish-dark">Meeting Location</h3>
                  <p className="text-bookish-dark/70">
                    Spring Book Club<br />
                    123 Literary Lane<br />
                    Booksville, CA 94123
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-bookish-maroon/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-serif text-bookish-maroon mb-4">Send a Message</h2>
            <p className="mb-6 text-bookish-dark/70">
              Have a question or want to join the club? Send us a message and we'll get back to you as soon as possible.
            </p>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-bookish-dark mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-3 py-2 border border-bookish-maroon/30 rounded-md focus:outline-none focus:ring-1 focus:ring-bookish-maroon"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-bookish-dark mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-3 py-2 border border-bookish-maroon/30 rounded-md focus:outline-none focus:ring-1 focus:ring-bookish-maroon"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-bookish-dark mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-3 py-2 border border-bookish-maroon/30 rounded-md focus:outline-none focus:ring-1 focus:ring-bookish-maroon"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-bookish-dark mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-3 py-2 border border-bookish-maroon/30 rounded-md focus:outline-none focus:ring-1 focus:ring-bookish-maroon"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="px-4 py-2 bg-bookish-maroon text-bookish-cream rounded-md hover:bg-bookish-dark transition-colors"
              >
                Send Message
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Contact;
