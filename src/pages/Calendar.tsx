
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';

const Calendar = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-2">
        <h1 className="text-3xl sm:text-4xl font-serif italic text-center mb-6 sm:mb-8">Event Calendar</h1>
        
        <Card className="border border-bookish-maroon/20 mb-6 sm:mb-8">
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <CalendarIcon className="h-10 w-10 sm:h-12 sm:w-12 text-bookish-maroon" />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-center text-bookish-maroon mb-3 sm:mb-4">Upcoming Book Club Events</h2>
            <p className="text-center text-bookish-dark/80 mb-3 sm:mb-4 text-sm sm:text-base">
              Our calendar feature is coming soon. Here you'll be able to:
            </p>
            <ul className="list-disc list-inside space-y-1 sm:space-y-2 max-w-lg mx-auto text-bookish-dark/80 text-sm sm:text-base">
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
