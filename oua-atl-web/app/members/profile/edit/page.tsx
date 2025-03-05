"use client"; // Ensures this runs on the client side

import { useEffect, useState } from "react";
import { UserProfile } from "@/app/lib/types";
import EditProfileForm from "@/app/ui/forms/members/EditProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  fetchData } from "@/lib/utils/client/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/lib/contexts/AuthProvider";

const EditProfilePage = () => {
  const [userDetails, setUserDetails] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const id = user.id;
        if (!id) throw new Error("User ID not found");

        const url = `/users/${id}/profile`;
        const result = await fetchData(url);

        if (!result.payload) {
          throw new Error(result.message || "Failed to fetch user profile");
        }

        setUserDetails(result.payload);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !userDetails) {
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

  return (
    <div className="bg-gray-100 flex-1">
      <div className="p-4 sm:p-6 lg:p-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl md:text-3xl font-bold">
              Edit Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <section className="space-y-2">
              <h2 className="text-xl font-semibold opacity-60">
                User profile form
              </h2>
              <EditProfileForm user={userDetails} />
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfilePage;
