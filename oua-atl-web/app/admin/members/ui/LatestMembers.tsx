"use client";

import { useEffect, useState } from "react";
import DataTable from "@/app/ui/DataTable";
import { RegularMembersColumn } from "@/lib/utils/tables";
import { PaginatedResponse, RegularMemberCollection } from "@/app/lib/types";
import { fetchData } from "@/lib/utils/client/api";
import { FetchError } from "@/components/ui/fetch-error";
import Loading from "../regular/loading";

const LatestMembers = () => {
  const [members, setMembers] = useState<RegularMemberCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const data: PaginatedResponse<RegularMemberCollection[]> =
          await fetchData("/users");
        if (data.error) {
          throw new Error(data.message);
        }

        setMembers(data.payload.data);
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return <FetchError error={error ? error : null} showDetails={!!error} />;

  return (
    <>
      <DataTable
        title="Latest Members"
        columns={RegularMembersColumn}
        data={members}
        showActions={false}
      />
    </>
  );
};

export default LatestMembers;
