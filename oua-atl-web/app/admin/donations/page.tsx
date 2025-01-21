import { Metadata } from "next";
import DataTable from "@/app/ui/DataTable";
import { Separator } from "@/components/ui/separator";
import { PaginationComponent } from "@/components/ui/pagination";

import { fetchData } from "@/lib/utils/api";
import { DonationTable } from "@/lib/utils/tables";
import { PaginatedResponse, DonationCollection } from "@/app/lib/types";

export const metadata: Metadata = {
  title: "Donations | Great Ife Alumni",
};

async function getData(
  pageNumber: number
): Promise<{
  donationsResponse: PaginatedResponse<DonationCollection[]>;
  donationsTotal: { message: string; payload: number; error?: boolean };
}> {
  const donationsRequest = fetchData(`donations?page=${pageNumber}`);
  const sumTotalRequest = fetchData("/donations/sum-total");

  // Wait for both promises to resolve
  const [donations, sumTotalResponse] = await Promise.all([
    donationsRequest,
    sumTotalRequest,
  ]);

  return { donationsResponse: donations, donationsTotal: sumTotalResponse };
}

const page = async ({ searchParams }: { searchParams: { page: string } }) => {
  const page = Number(searchParams.page) || 1;

  const { donationsResponse, donationsTotal } = await getData(page);

  const columns = DonationTable;
  const donations = donationsResponse.payload.data;

  return (
    <article className="p-6 container ">
      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div className="flex items-end justify-between py-6">
          {donationsTotal.error ? (
            <div className="text-red-500 text-sm">
              Failed to load total donations. Please try again later.
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <span>Total amount donated</span>
              </div>
              <h1 className="text-2xl font-semibold">
                ${donationsTotal.payload}
              </h1>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        {donationsResponse.error ? (
          <div className="text-red-500 text-sm">
            Failed to load donations data. Please check your connection or try
            again later.
          </div>
        ) : (
          <>
            <DataTable title="Donations" columns={columns} data={donations} />

            <Separator className="my-6 bg-gray-950/5" />

            <PaginationComponent
              path={"/admin/donations"}
              page={page}
              total={donationsResponse?.payload?.totalPages || 1}
            />
          </>
        )}
      </section>
    </article>
  );
};

export default page;
