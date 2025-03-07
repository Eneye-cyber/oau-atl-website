'use client';

import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { fetchData } from "@/lib/utils/client/api";
import { PaginatedResponse, EnquiryCollection } from "@/app/lib/types";
import { Separator } from "@/components/ui/separator";
import { PaginationComponent } from "@/components/ui/pagination";
import EnquiryCard from "./EnquiryCard";
import LoadingSpinner from '@/components/LoadingSpinner';
import { useSearchParams } from 'next/navigation'
import { FetchError } from "@/components/ui/fetch-error"


const EnquiriesDashboard = () => {
  // get query params
  const searchParams = useSearchParams()

  const [enquiries, setEnquiries] = useState<EnquiryCollection[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const page = Number(searchParams?.get('page') ?? 1);
  // const status = searchParams?.get('status');

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(false);
      try {
        const data: PaginatedResponse<EnquiryCollection[]> = await fetchData(`/contact?page=${page}`);
        if (data.error) {
          setError(true);
        } else {
          setEnquiries(data.payload?.data || []);
          setTotalPages(data.payload?.totalPages || 1);
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
    return <FetchError />;
  }

  return (
    <article className="p-6 container space-y-6 flex-1 flex flex-col">
      <div className="flex items-end justify-between py-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Enquiries</span>
            <span>
              <FaChevronRight />
            </span>
            <span>List</span>
          </div>
          <h1 className="text-3xl font-bold">Contact Inquiries</h1>
        </div>
      </div>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div>
          {enquiries.length > 0 ? (
            <section className="grid md:grid-cols-2 gap-4">
              {enquiries.map((enquiry, index) => (
                <EnquiryCard {...enquiry} key={index} />
              ))}
            </section>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No enquiries found.</p>
              <p className="text-gray-400">Try adjusting your filters or come back later.</p>
            </div>
          )}

          {enquiries.length > 0 && <Separator className="my-6" />}

          {enquiries.length > 0 && (
            <PaginationComponent path={"/admin/enquiries"} page={page} total={totalPages} />
          )}
        </div>
      </section>
    </article>
  );
};

export default EnquiriesDashboard;
