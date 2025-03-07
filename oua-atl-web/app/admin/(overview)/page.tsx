'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DataTable from '@/app/ui/DataTable';
import { Separator } from "@/components/ui/separator";
import { FaChevronRight } from "react-icons/fa6";
import StatsOverview from '@/app/ui/StatsOverview';
import { fetchData } from '@/lib/utils/client/api';
import { DonationTable } from '@/lib/utils/tables';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from 'sonner';

const Page = () => {
  const [data, setData] = useState({
    donations: { data: [], error: false },
    enquiries: { data: [], error: false },
    events: { data: 0, error: false },
    projects: { data: 0, error: false },
    overdue: { data: 0, error: false },
    subscribers: { data: 0, error: false },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const results = await Promise.all([
        fetchData('donations/latest'),
        fetchData('/contact/latest'),
        fetchData('physical-events/latest/count'),
        fetchData('projects/active/count'),
        fetchData('projects/overdue/count'),
        fetchData('physical-events/latest/count'),
      ]);
  
      setData({
        donations: {
          data: results[0].payload ?? [] ,
          error: results[0].error || false,
        },
        enquiries: {
          data: results[1].payload ?? [] ,
          error: results[1].error || false,
        },
        events: {
          data: results[2].payload ?? 0,
          error: results[2].error || false,
        },
        projects: {
          data: results[3].payload ?? 0,
          error: results[3].error || false,
        },
        overdue: {
          data: results[4].payload ?? 0,
          error: results[4].error || false,
        },
        subscribers: {
          data: results[5].payload ?? 0,
          error: results[5].error || false,
        },
      });
      results.forEach((result, i) => {
        if (result.error) {
          console.error('Error fetching data:', result.message);
          toast.error('Error fetching data', {description: result.message})
        }
        console.log(i, result)
  
      })
      setLoading(false);
    };
  
    getData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

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
        <StatsOverview label="Active alumni" value={data.subscribers.data} />
        <StatsOverview label="Ongoing Projects" value={data.projects.data} />
        <StatsOverview label="Upcoming Events" value={data.events.data} />
        <StatsOverview label="Overdue Projects" value={data.overdue.data} />
      </div>
      
      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-3 mt-12">
        <div className="overflow-auto lg:col-span-8">
          {data.donations.error ? (
            <p className="text-red-500">Failed to load donations.</p>
          ) : (
            <DataTable title="Latest Donations" columns={DonationTable} data={data.donations.data} />
          )}

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

            {data.enquiries.error ? (
              <p className="text-red-500">Failed to load enquiries.</p>
            ) : (
              <ul className="text-sm text-gray-600 space-y-4 my-6 min-h-24">
                {data.enquiries.data.map((enquiry: any, index) => (
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
            )}

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
