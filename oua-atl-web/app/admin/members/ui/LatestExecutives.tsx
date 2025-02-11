"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE; // Use NEXT_PUBLIC_ for client access

const LatestExecutives = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `${baseUrl}/executives/latest`;
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "force-cache", // Allow Next.js to cache
        });

        if (res.ok) {
          const result = await res.json();
          setMembers(result.payload.slice(0, 3)); // Limit to 3 members
        } else {
          throw new Error(res.statusText);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setMembers([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="py-2">
        <h4 className="font-bold text-2xl leading-tight">Newest Executives</h4>
        <p className="text-gray-600 text-sm">
          Latest additions to the executive board
        </p>
      </div>

      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-1 bg-indigo-700 rounded-full" style={{ width: "100%" }}></div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : members.length > 0 ? (
        <ul className="text-sm text-gray-600 space-y-3 my-6">
          {members.map((item, index) => (
            <li key={index} className="flex gap-2">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-nero-black mt-1" />
              <div>
                <h4 className="font-semibold text-lg leading-tight">{item.full_name}</h4>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Position assigned:</span>{" "}
                  {item.position_assigned}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No new additions</p>
      )}

      <div className="mt-4">
        <Link
          href="/admin/members/executive"
          className="inline-block px-4 py-2 w-full text-center bg-primary text-white rounded-md shadow hover:bg-primary-light"
        >
          View all
        </Link>
      </div>
    </div>
  );
};

export default LatestExecutives;
