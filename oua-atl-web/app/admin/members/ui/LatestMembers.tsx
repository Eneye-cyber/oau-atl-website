"use client";

import { useEffect, useState } from "react";
import DataTable from "@/app/ui/DataTable";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE; // Use NEXT_PUBLIC_ for client-side access

const LatestMembers = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `${baseUrl}/users`;
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "force-cache", // Allow caching for static export compatibility
        });

        if (res.ok) {
          const result = await res.json();
          setData(result.payload?.data ?? []);
        } else {
          throw new Error(res.statusText);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setData([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const columns = [
    { key: "full_name", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "study_field", label: "Course of Study" },
    { key: "year_graduated", label: "Graduating Year" },
    { key: "status", label: "Status" },
  ];

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable title="Latest Members" columns={columns} data={data} showActions={false} />
      )}
    </>
  );
};

export default LatestMembers;
