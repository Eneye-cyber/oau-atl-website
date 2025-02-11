
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
  

  // Wait for both promises to resolve
  try {
    const contacts = await getStats('contact');
    const arr = contacts.payload.data

    const active = arr.filter((item: any) => item.closed === false)
    return [active.length, arr.length - active.length];
} catch (error) {
      console.log(error)
      return [0, 0];
}

  
}

const StatsFeed = async () => {
  const [upcoming, past] = await getData();
  // console.log([events, projects, overdue, subscribers])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <StatsOverview label="Active Enquiries" value={upcoming} />
      <StatsOverview label="Closed Enquiries" value={past} />
    </div>
  )
}

export default StatsFeed