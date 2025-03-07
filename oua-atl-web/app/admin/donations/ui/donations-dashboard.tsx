'use client';

import { useState, useEffect } from "react";
import DataTable from "@/app/ui/DataTable";
import { Separator } from "@/components/ui/separator";
import { PaginationComponent } from "@/components/ui/pagination";
import { fetchData } from "@/lib/utils/client/api";
import { DonationTable } from "@/lib/utils/tables";
import { PaginatedResponse, DonationCollection } from "@/app/lib/types";
import LoadingSpinner from '@/components/LoadingSpinner';
import { useSearchParams } from 'next/navigation'

const DonationsDashboard = () => {
  // get query params
  const searchParams = useSearchParams()
  

  const [donationsResponse, setDonationsResponse] = useState<
    PaginatedResponse<DonationCollection[]> | null
  >(null);
  const [donationsTotal, setDonationsTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const page = Number(searchParams?.get('page') ?? 1)

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [donations, sumTotalResponse] = await Promise.all([
          fetchData(`donations?page=${page}`),
          fetchData("/donations/sum-total"),
        ]);

        if (donations.error || sumTotalResponse.error) {
          setError(true);
        } else {
          setDonationsResponse(donations);
          setDonationsTotal(sumTotalResponse.payload);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [page]);

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 h-96">
        <div className="p-6 container text-center text-red-600">
          Failed to load data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <article className="p-6 container">
      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div className="flex items-end justify-between py-6">
          {donationsTotal === null ? (
            <div className="text-red-500 text-sm">
              Failed to load total donations. Please try again later.
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <span>Total amount donated</span>
              </div>
              <h1 className="text-2xl font-semibold">${donationsTotal}</h1>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        {donationsResponse === null ? (
          <div className="text-red-500 text-sm">
            Failed to load donations data. Please check your connection or try
            again later.
          </div>
        ) : (
          <>
            <DataTable title="Donations" columns={DonationTable} data={donationsResponse.payload.data} />
            <Separator className="my-6 bg-gray-950/5" />
            <PaginationComponent
              path={"/admin/donations"}
              page={page}
              total={donationsResponse.payload.totalPages || 1}
            />
          </>
        )}
      </section>
    </article>
  );
};

export default DonationsDashboard;
