import { FaChevronRight } from "react-icons/fa6";
import type { Metadata } from "next";

// import Tabs from '@/app/ui/Tabs'
// import StatsFeed from "./ui/StatsFeed";
// import StatLoader from "@/app/ui/loaders/StatLoader";
import { fetchData } from "@/lib/utils/api";
import { PaginatedResponse, EnquiryCollection } from "@/app/lib/types";
import { Separator } from "@/components/ui/separator";
import { PaginationComponent } from "@/components/ui/pagination";
import EnquiryCard from "./ui/EnquiryCard";

export const metadata: Metadata = {
  title: "Enquiries | Dashboard",
  description: "...",
};

async function getData(
  pageNumber: number
): Promise<PaginatedResponse<EnquiryCollection[]>> {
  const data = await fetchData(`/contact?page=${pageNumber}`);
  return data;
}

const page = async ({
  searchParams,
}: {
  searchParams: { status: string; page: string };
}) => {
  const page = Number(searchParams.page) || 1;
  const data = await getData(page);
  const enquiries = data.payload?.data ?? [];

  return (
    <article className="p-6 container space-y-6 flex-1 flex flex-col">
      <div className="flex items-end justify-between py-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Enquiries</span>
            <span>
              {" "}
              <FaChevronRight />{" "}
            </span>
            <span>List</span>
          </div>
          <h1 className="text-3xl font-bold">Contact Inquiries</h1>
        </div>
      </div>

      {/* Backend has no endpoint for displaying contact enquiries stats  */}
      {/* <Suspense fallback={(
          <div className="grid md:grid-cols-2 gap-6">
            <StatLoader />
            <StatLoader />
          </div>
        )}
      >
        <StatsFeed />
      </Suspense> */}

      {/* Backend has no endpoint for filtering closed and open enquiries  */}
      {/* <section className=" py-4">
        <Tabs tabs={[{label: 'Open Enquiries', value: null}, {label: 'Closed Enquiries', value: 'history'}]} />
      </section> */}

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div className="">
          {enquiries.length > 0 ? (
            <section className="grid md:grid-cols-2 gap-4 ">
              {enquiries.map((enquiry, index) => (
                <EnquiryCard {...enquiry} key={index} />
              ))}
            </section>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No enquiries found.</p>
              <p className="text-gray-400">
                Try adjusting your filters or come back later.
              </p>
            </div>
          )}

          {enquiries.length > 0 && <Separator className="my-6" />}

          {enquiries.length > 0 && (
            <PaginationComponent
              path={"/admin/enquiries"}
              page={page}
              total={data?.payload?.totalPages || 1}
            />
          )}
        </div>
      </section>
    </article>
  );
};

export default page;
