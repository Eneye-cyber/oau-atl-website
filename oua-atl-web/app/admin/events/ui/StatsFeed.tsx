'use client'; // This directive marks the component as a client-side component

import { useState, useEffect } from 'react';
import StatsOverview from '@/app/ui/StatsOverview';
import { fetchData } from '@/lib/utils/client/api';
import StatLoader from '@/app/ui/loaders/StatLoader';

const StatsFeed = () => {
  const [upcoming, setUpcoming] = useState<number | null>(null);
  const [past, setPast] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const [upcomingEvent, pastEvent] = await Promise.all([
          fetchData('physical-events/latest/count'),
          fetchData('physical-events/history/count'),
        ]);

        setUpcoming(upcomingEvent?.payload ?? 0);
        setPast(pastEvent?.payload ?? 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (<div className="grid md:grid-cols-2 gap-6">
      <StatLoader />
      <StatLoader />
    </div>);
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <StatsOverview label="Upcoming Events" value={upcoming ?? 0} />
      <StatsOverview label="Past Events" value={past ?? 0} />
    </div>
  );
};

export default StatsFeed;