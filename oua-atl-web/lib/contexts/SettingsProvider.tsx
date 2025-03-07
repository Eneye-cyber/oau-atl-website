"use client";

import { useEffect, useState } from "react";
import json from "@/lib/pages/siteSchema.json"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const getData = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/settings`, { cache: "no-store" });
    if (!response.ok) throw new Error(response.statusText);
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return json;
  }
};

export default function SettingsProvider({ children }: { children: (data: any, loading: boolean) => React.ReactNode }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getData().then((settings) => {
      setData(settings);
      setLoading(false);
    });
  }, []);

  return <>{children(data, loading)}</>;
}
