"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PaginatedResponse } from "@/app/lib/types";
import { fetchData } from "@/lib/utils/client/api";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExecutiveProfiles() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const data: PaginatedResponse<any[]> = await fetchData("/executives");
        const formattedMembers =
          data.payload?.data?.map((item: any) => ({
            ...item,
            is_active: item.is_active ? "Active" : "Inactive",
          })) || [];
        setMembers(formattedMembers);
      } catch (error) {
        console.error("Error fetching executives:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (loading) return <Skeleton className='w-full h-32' />

  return (
    <>
      {members.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <Card key={member.full_name}>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Image
                  alt={member.full_name}
                  className="rounded-full mb-4"
                  height={100}
                  src={member.image_url}
                  style={{
                    aspectRatio: "100/100",
                    objectFit: "cover",
                  }}
                  width={100}
                />
                <h3 className="font-bold">{member.full_name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {member.position_assigned}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            No Executives Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            We couldn’t find any executive profiles at the moment. Please check
            back later.
          </p>
        </div>
      )}
    </>
  );
}
