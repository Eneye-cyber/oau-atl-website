import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE; // Use NEXT_PUBLIC_ for frontend

export const updateUserProfile = async (userId: string, data: Record<string, any>) => {
  if (!API_BASE) {
    throw new Error("API_BASE environment variable is not set");
  }

  try {
    const url = `${API_BASE}/users/${userId}/profile`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure cookies are included
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(errorDetails?.message ?? "Profile update failed");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "An error occurred");
  }
};
