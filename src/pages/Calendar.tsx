
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';

const Calendar = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif italic text-center mb-8">Event Calendar</h1>
        
        <Card className="border border-bookish-maroon/20 mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-6">
              <CalendarIcon className="h-12 w-12 text-bookish-maroon" />
            </div>
            <h2 className="text-2xl font-serif text-center text-bookish-maroon mb-4">Upcoming Book Club Events</h2>
            <p className="text-center text-bookish-dark/80 mb-4">
              Our calendar feature is coming soon. Here you'll be able to:
            </p>
            <ul className="list-disc list-inside space-y-2 max-w-lg mx-auto text-bookish-dark/80">
              <li>View upcoming book discussions and events</li>
              <li>Register for workshops and meetings</li>
              <li>Subscribe to our event calendar</li>
              <li>Receive reminders about upcoming sessions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Calendar;
