"use client";

import { useEffect, useState } from "react";
import DataTable from "@/app/ui/DataTable";
// import { Separator } from "@/components/ui/separator";
import { PaginatedResponse } from "@/app/lib/types";
import { fetchData } from "@/lib/utils/client/api";
import { ExecutiveMembersColumns } from "@/lib/utils/tables";
import { FetchError } from "@/components/ui/fetch-error";
import Loading from './loading';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE; // Use NEXT_PUBLIC for client-side env vars

const ExecutiveMembersPage = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const data: PaginatedResponse<any[]> = await fetchData("/executives");
        const formattedMembers =
          data?.payload?.data?.map((item: any) => ({
            ...item,
            is_active: item.is_active ? "Active" : "Inactive",
          })) ?? [];

        setMembers(formattedMembers);
      } catch (err: any) {
        console.error("Error fetching executives:", err);
        setError("Failed to load executive members.");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <FetchError message={error} />;

  return (
    <section className="bg-white ring-1 ring-gray-950/5 rounded p-6">
      <div>
        <DataTable
          path="members/executive"
          title="Executive Members"
          idKey="exec_id"
          columns={ExecutiveMembersColumns}
          data={members}
          showActions={true}
        />
      </div>
    </section>
  );
};

export default ExecutiveMembersPage;
