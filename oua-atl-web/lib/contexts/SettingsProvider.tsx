// app/ui/shared/SettingsProvider.tsx
import { ReactNode } from "react";

const baseUrl = process.env?.APP_URL ?? "http://localhost:3000";

const getData = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/settings`, { cache: "no-store" });
    if (!response.ok) throw new Error(response.statusText);
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
};

// Wrapper that fetches settings
export default async function SettingsProvider({ children }: { children: (data: any) => ReactNode }) {
  const data = await getData();
  return <>{children(data)}</>;
}
