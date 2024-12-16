import { Metadata } from 'next';
import Link from 'next/link';
import DataTable from '@/app/ui/DataTable';
import { Separator } from "@/components/ui/separator";
import { FaChevronRight } from "react-icons/fa6";
import StatsOverview from '@/app/ui/StatsOverview';
import { fetchData } from '@/lib/utils/api';
import { DonationTable } from '@/lib/utils/tables';

export const metadata: Metadata = {
  title: "Dashboard | Great Ife Alumni",
  description: 'Admin dashboard overview of the Great Ife Alumni platform.',
};

async function getData(): Promise<any[]> {
  const latestDonations = fetchData('donations/latest');
  const latestEnquiries = fetchData('/contact/latest');
  const eventStats = fetchData('physical-events/latest/count');
  const projectsStats = fetchData('projects/active/count');
  const overdueStats = fetchData('projects/overdue/count');
  const subscribersStats = fetchData('physical-events/latest/count');

  // Wait for both promises to resolve
  const results = await Promise.all([
    latestDonations, 
    latestEnquiries, 
    eventStats, 
    projectsStats, 
    overdueStats, 
    subscribersStats, 
  ]);
  
  return results;
}

const Page = async () => {
  const [ donations, enquiries, events, projects, overdue, subscribers] = await getData();
;

  return (
    <article className="p-6 container">
      <div className="flex items-end justify-between py-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
            <span>Admin</span>
            <span><FaChevronRight /></span>
            <span>Overview</span>
          </div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <StatsOverview label="Active alumni" value={subscribers.payload ?? 0} />
        <StatsOverview label="Ongoing Projects" value={projects.payload ?? 0} />
        <StatsOverview label="Upcoming Events" value={events?.payload ?? 0} />
        <StatsOverview label="Overdue Projects" value={overdue?.payload ?? 0} />
      </div>
      

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-3 mt-12">
        <div className="overflow-auto lg:col-span-8">
          <DataTable title="Latest Donations" columns={DonationTable} data={donations.payload} />

          <Separator className="my-4" />

          <div className="flex">
            <Link
              href="/admin/donations"
              className="inline-block w-full sm:w-fit px-4 py-2 text-center bg-primary text-white rounded-md shadow hover:bg-primary-light"
            >
              View Donations
            </Link>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-3 sm:p-6">
            <div className="py-2">
              <h4 className="font-bold text-2xl leading-tight">Latest Enquiries</h4>
              <p className="text-gray-600 text-sm">Latest contact messages</p>
            </div>

            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-1 bg-indigo-700 rounded-full w-full"></div>
            </div>

            <ul className="text-sm text-gray-600 space-y-4 my-6 min-h-24">
              {enquiries.payload.map((enquiry: any, index: number) => (
                <li className="flex gap-2" key={index}>
                  <div>
                    <h4 className="font-semibold leading-tight">{enquiry.full_name}</h4>
                    <div className="flex items-center">
                      <div className="flex h-1 w-1 rounded-full bg-nero-black mr-1.5" />
                      <p className="font-medium">{enquiry.message}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <Link
                href="/admin/enquiries"
                className="inline-block px-4 py-2 w-full text-center bg-primary text-white rounded-md shadow hover:bg-primary-light"
              >
                View all
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </article>
  );
};

export default Page;
