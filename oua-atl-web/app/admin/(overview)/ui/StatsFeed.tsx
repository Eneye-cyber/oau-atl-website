
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
  const eventReq = getStats('physical-events/latest/count');
  const projectsReq = getStats('projects/active/count');
  const overdueReq = getStats('projects/overdue/count');
  const subscribersReq = getStats('physical-events/latest/count');

  // Wait for both promises to resolve
  const [events, projects, overdue, subscribers] = await Promise.all([eventReq, projectsReq, overdueReq, subscribersReq, ]);
  return [events, projects, overdue, subscribers];
  
}

const StatsFeed = async () => {
  const [events, projects, overdue, subscribers] = await getData();
  // console.log([events, projects, overdue, subscribers])
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <StatsOverview label="Active alumni" value={subscribers.payload ?? 0} />
      <StatsOverview label="Ongoing Projects" value={projects.payload ?? 0} />
      <StatsOverview label="Upcoming Events" value={events?.payload ?? 0} />
      <StatsOverview label="Overdue Projects" value={overdue?.payload ?? 0} />
    </div>
  )
}

export default StatsFeed