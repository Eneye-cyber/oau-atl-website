"use client";

import { useEffect, useState } from "react";
import { EventCard } from "@/app/ui/Cards";
import { fetchData } from "@/lib/utils/client/api";
import { EventCollection, PaginatedResponse } from "@/app/lib/types";

export default function UpcomingEvents() {
  const [events, setEvents] = useState<EventCollection[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const data: PaginatedResponse<EventCollection[]> = await fetchData(
          "/physical-events/latest"
        );
        setEvents(data.payload?.data ?? []);
        setError(data.error ?? false);
        setErrorMessage(data.message);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (loading) return (<div className="flex flex-col items-center gap-4">
    {/* Spinner */}
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75 border-l-transparent"></div>

    {/* Loading Text */}
    <p className="text-lg font-semibold text-gray-600">Loading, please wait...</p>
  </div>)

  if (!events.length) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {error ? 'Backend Error' :'No Events Found'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {(error && errorMessage) ? errorMessage :"We couldn’t find any upcoming events at the moment. Please check back later."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl mb-3 font-bold">Upcoming Events</h1>

      <ul className="py-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-6 md:gap-4">
        {events.map((event, index) => (
          <li key={index}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
}
