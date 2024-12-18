
import StatsOverview from '@/app/ui/StatsOverview';
import { fetchData } from '@/lib/utils/api';

async function getData(): Promise<any[]> {
  // Fetch data from your API here
  const upcomingEvent = fetchData('physical-events/latest/count');
  const pastEvent = fetchData('physical-events/history/count');

  // Wait for both promises to resolve
  const [upcoming, past] = await Promise.all([upcomingEvent, pastEvent ]);
  return [upcoming, past];

}

const StatsFeed = async () => {

  const [upcoming, past] = await getData();
  // console.log([events, projects, overdue, subscribers])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <StatsOverview label="Upcoming Events" value={upcoming?.payload ?? 0} />
      <StatsOverview label="Past Events" value={past?.payload ?? 0} />
    </div>
  )
}

export default StatsFeed