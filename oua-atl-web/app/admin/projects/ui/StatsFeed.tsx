
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
  return res.json().catch(() => ({message: res.statusText}));
}

async function getData(): Promise<any[]> {
  
  const fetchactive = getStats('projects/active/count');
  const fetchcomplete = getStats('projects/completed/count');
  const fetchoverdue = getStats('projects/overdue/count');

  // Wait for both promises to resolve
  try {
    const [active, complete, overdue] = await Promise.all([fetchactive, fetchcomplete, fetchoverdue ]);
    return [active, complete, overdue];
} catch (error) {
      console.log(error)
      const result = {message: "", payload: 0};
      const [active, complete, overdue] = [result, result, result]
      return [active, complete, overdue];
}

  
}

const StatsFeed = async () => {
  const [active, complete, overdue] = await getData();
  // console.log([events, projects, overdue, subscribers])
  return (
    <div className="grid md:grid-cols-3 gap-6">
        <StatsOverview label="Active Projects" value={active.payload} />
        <StatsOverview label="Completed Projects" value={complete.payload} />
        <StatsOverview label="Overdue Projects" value={overdue.payload} />
      </div>
  )
}

export default StatsFeed