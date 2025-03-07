"use client";

import { useState, useEffect } from "react";
import DataTable from "@/app/ui/DataTable";
import { Separator } from "@/components/ui/separator";
import { PaginatedResponse } from "@/app/lib/types";
import { fetchData } from "@/lib/utils/client/api";
import { FetchError } from "@/components/ui/fetch-error";
import Loading from "./loading";
import {RegularMembersColumn} from "@/lib/utils/tables";

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const data: PaginatedResponse<any[]> = await fetchData("/users");
        if(data.error) {
          throw new Error(data.message)
        }
        const transformedData =
          data.payload?.data.map((item: any) => ({
            ...item,
            is_active: item.is_active ? "Active" : "Inactive",
          })) ?? [];

        setMembers(transformedData);
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setError((err as Error));
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);


  if (loading) return <Loading />;
  if (error) return <FetchError error={error ? error : null} showDetails={!!error} />;

  return (
    <section className="bg-white ring-1 ring-gray-950/5 rounded p-6">
      <DataTable
        path="members/regular"
        idKey="user_id"
        title="Regular Members"
        showActions={true}
        columns={RegularMembersColumn}
        data={members}
      />
      <Separator className="my-6 bg-gray-950/5" />
    </section>
  );
}
