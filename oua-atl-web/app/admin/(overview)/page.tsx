import { Metadata } from 'next';
import { Suspense } from 'react'
import Link from 'next/link';
import DataTable from '@/app/ui/DataTable';
import { Separator } from "@/components/ui/separator";
import { FaChevronRight } from "react-icons/fa6";
import StatsFeed from './ui/StatsFeed';
import StatLoader from '@/app/ui/loaders/StatLoader';

export const metadata: Metadata = {
  title: "Dashboard | Great Ife Alumni",
};

const baseUrl = process.env.API_BASE;

async function getLatestDonations() {
  const url = `${baseUrl}/donations/latest`;
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

async function getLatestEnquiries() {
  const url = `${baseUrl}/contact/latest`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    cache: 'no-store', // Force no caching for fresh data
  });
  return res.json();
}

async function getData(): Promise<any[]> {
  // Fetch data from your API here
  const latestDonations = getLatestDonations();
  const latestEnquiries = getLatestEnquiries();

  // Wait for both promises to resolve
  const [donations, enquiries] = await Promise.all([latestDonations, latestEnquiries]);
  return [donations, enquiries];
}

const Page = async () => {
  const [donations, enquiries] = await getData();

  // console.log('Donations:', donations);
  // console.log('Enquiries:', enquiries);

  const columns = [
    { key: 'index', label: 's/n' },
    { key: 'name', label: 'Full name' },
    { key: 'project', label: 'Project' },
    { key: 'amount', label: 'Amount donated' },
    { key: 'date', label: 'Date' },
  ];

  const data = [
    { index: 1, name: 'Funke Ajoke', project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 2, name: 'Sunny Ade', project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 3, name: 'Bayo Bayero', project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 4, name: 'Sunny Ade', project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
    { index: 5, name: 'Bayo Bayero', project: "Restoration project", amount: "$100", date: "Aug 5, 2025" },
  ];

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

      <Suspense fallback={(
          <div className="grid md:grid-cols-4 gap-4">
            <StatLoader />
            <StatLoader />
            <StatLoader />
            <StatLoader />
          </div>
        )}
      >
        <StatsFeed />
      </Suspense>
      

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-3 mt-12">
        <div className="overflow-auto lg:col-span-8">
          <DataTable title="Latest Donations" columns={columns} data={donations.payload} />

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
              <div className="h-1 bg-indigo-700 rounded-full" style={{ width: "100%" }}></div>
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
