"use client"; // This ensures it's a client-side component

import { useEffect, useState } from "react";
import HeroSection from "@/app/ui/HeroSection";
import PricingCard from "@/app/ui/cards/PricingCard";
import { PageData } from "@/app/lib/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import json from "@/lib/pages/pageSchema.json";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const MembersAreaPage = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/content?slug=members_area`, {
          cache: "no-store", // Ensures fresh data on every request
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        setPageData(result.data.pages["members_area"]);
      } catch (err) {
        setPageData(json.pages["members_area"]);

        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if(loading) return <LoadingSpinner />
  

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!pageData) {
    return <p className="text-center text-gray-500">No data available.</p>;
  }

  const hero = pageData.sections.find((item) => item.slug === "members-area-hero-section");
  const mainContent = pageData.sections.find((item) => item.slug === "members-area-page-mid-section");
  const subscriptionContent = pageData.sections.find((item) => item.slug === "subscription-section");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {hero && <HeroSection data={hero.content[0]} />}

        {mainContent && (
          <section className="w-full py-12 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6 space-y-8">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
                {mainContent.header}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {mainContent.content[0]?.text ??
                  `MEMBERSHIP OF THIS WEBSITE IS OPEN TO ALL THOSE WHO HAVE ATTENDED
                  THE UNIVERSITY OF IFE/ OBAFEMI AWOLOWO UNIVERSITY, ILE IFE, NIGERIA.`}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {mainContent.content[1]?.text ??
                  "IF YOU WOULD LIKE TO CONTINUE AS A REGISTERED USER, YOU MAY DO SO BELOW."}
              </p>
            </div>
          </section>
        )}

        {subscriptionContent && (
          <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    {subscriptionContent.header ?? "Choose Your Membership Plan"}
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    {subscriptionContent.subheader ?? "Select the perfect plan for your needs."}
                  </p>
                </div>
              </div>
              <div id="subscribe" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {subscriptionContent.content.map((plan) => (
                  <PricingCard key={plan.title} plan={plan} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MembersAreaPage;
