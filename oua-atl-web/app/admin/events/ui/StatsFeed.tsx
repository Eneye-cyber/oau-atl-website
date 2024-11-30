
import StatsOverview from '@/app/ui/StatsOverview';
const baseUrl = process.env.API_BASE;

async function getStats(path: string) {
  const url = `${baseUrl}/${path}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies
    cache: 'no-store', // Force no caching for fresh data
  });
  return res.json();
}

async function getData(): Promise<any[]> {
  // Fetch data from your API here
  const upcomingEvent = getStats('physical-events/latest/count');
  const pastEvent = getStats('physical-events/history/count');

  // Wait for both promises to resolve
  try {
    const [upcoming, past] = await Promise.all([upcomingEvent, pastEvent ]);
    return [upcoming, past];
} catch (error) {
      console.log(error)
      const result = {message: "", payload: 0};
      const [upcoming, past] = [result, result]
      return [upcoming, past];
}

  
}

const StatsFeed = async () => {
  const [upcoming, past] = await getData();
  // console.log([events, projects, overdue, subscribers])
  return (
    <div className="grid md:grid-cols-2 gap-6">
        <StatsOverview label="Upcoming Events" value={upcoming.payload} />
        <StatsOverview label="Past Events" value={past.payload} />
      </div>
  )
}

export default StatsFeed