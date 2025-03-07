"use client";

import { useEffect, useState } from "react";
import StatsOverview from "@/app/ui/StatsOverview";
import StatLoader from '@/app/ui/loaders/StatLoader';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

const fetchStats = async (path: string) => {
  try {
    const url = `${baseUrl}/${path}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    const data = await res.json();
    return data.payload ?? 0; // Ensure we return a valid number
  } catch (error) {
    console.error("Error fetching stats:", error);
    return 0; // Default to 0 in case of an error
  }
};

const StatsFeed = () => {
  const [stats, setStats] = useState({ active: 0, complete: 0, overdue: 0 });
  const [loading, setLoading] = useState(true); // 🔹 Loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading

      const [active, complete, overdue] = await Promise.all([
        fetchStats("projects/active/count"),
        fetchStats("projects/completed/count"),
        fetchStats("projects/overdue/count"),
      ]);

      setStats({ active, complete, overdue });
      setLoading(false); // Stop loading
    };

    fetchData();
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {loading ? (
        // 🔹 Show loading placeholders while data is being fetched
        <div className="grid md:grid-cols-3 gap-6">
          <StatLoader />
          <StatLoader />
          <StatLoader />
        </div>
      ) : (
        // 🔹 Show actual data once it's loaded
        <>
          <StatsOverview label="Active Projects" value={stats.active} />
          <StatsOverview label="Completed Projects" value={stats.complete} />
          <StatsOverview label="Overdue Projects" value={stats.overdue} />
        </>
      )}
    </div>
  );
};

export default StatsFeed;
