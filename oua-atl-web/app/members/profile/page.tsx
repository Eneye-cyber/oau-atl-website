"use client"; // Ensures this component runs on the client side

import { useEffect, useState } from "react";
import UserProfile from "@/app/ui/cards/UserProfile";
import { fetchData } from "@/lib/utils/client/api";
import { useAuth } from '@/lib/contexts/AuthProvider';
import LoadingSpinner from "@/components/LoadingSpinner";

const UserProfilePage = () => {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const id = user.id; // Get the current user's ID
        if (!id) throw new Error("User ID not found");

        const url = `/users/${id}/profile`;
        const result = await fetchData(url);

        if (!result.payload) {
          throw new Error(result.message || "Failed to fetch user profile");
        }

        setUserData(result.payload);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !userData) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Something went wrong
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Please log out and try again later.
        </p>
      </div>
    );
  }

  return <UserProfile user={userData} />;
};

export default UserProfilePage;
