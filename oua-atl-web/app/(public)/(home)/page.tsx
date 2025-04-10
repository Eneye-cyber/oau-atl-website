"use client";

import HeroSlider from "@/app/(public)/(home)/section/HeroSlider";
import MidSection from "@/app/(public)/(home)/section/MidSection";
import {  useEffect, useState } from "react";
import PastProjects from "@/app/ui/PastProjects";
import EventSection from "@/app/(public)/(home)/section/EventSection";
import ExtraSection from "@/app/(public)/(home)/section/ExtraSection";
import BannerSection from "@/app/(public)/(home)/section/BannerSection";
import { Section } from "@/app/lib/types";
import AdBannerSection from "@/app/(public)/(home)/section/AdBannerSection";
import json from "@/lib/pages/pageSchema.json";
import LoadingSpinner from "@/components/LoadingSpinner";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const HomePage = () => {
  const [homeData, setHomeData] = useState<{ sections: Section[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/content?slug=home`, { cache: "default" });
        if (!response.ok) throw new Error(response.statusText);
        const result = await response.json();
        setHomeData(result.data.pages.home);
      } catch (error) {
        setHomeData(json.pages.home)
        console.error("home_error", error);
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if(loading) return <LoadingSpinner />

  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700 p-6">
  //       <p className="text-lg font-semibold">{error}</p>
  //       <button
  //         onClick={() => {
  //           setError(null);
  //           setLoading(true);
  //           setHomeData(null);
  //         }}
  //         className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  //       >
  //         Retry
  //       </button>
  //     </div>
  //   );
  // }

  if (!homeData) return (
    <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700 p-6">
      <p className="text-lg font-semibold">Page data not found</p>
    </div>
  );;

  // Store `find()` results in variables to avoid multiple lookups
  const heroSection = homeData.sections.find((s) => s.slug === "home-hero-section");
  const bannerSection = homeData.sections.find((s) => s.slug === "strip-banner");
  const midSection = homeData.sections.find((s) => s.slug === "home-page-mid-section");
  const projectSection = homeData.sections.find((s) => s.slug === "projects");
  const eventSection = homeData.sections.find((s) => s.slug === "physical-events");
  const adBannerSection = homeData.sections.find((s) => s.slug === "ad-banner");
  const extraSection = homeData.sections.find((s) => s.slug === "home-grid-section");

  return (
    <>
      {heroSection && (
        <section aria-label="hero h-full md:max-h-hero">
          <div className="w-full">
            <HeroSlider data={heroSection} />
          </div>
        </section>
      )}

      {bannerSection && <BannerSection data={bannerSection} />}

      {midSection && <MidSection data={midSection} />}

      {projectSection && (
        <section className="py-20 my-12 px-3 bg-gray-100">
          <div className="container">
              <PastProjects data={projectSection} />
          </div>
        </section>
      )}

      {eventSection && (
        <section className="py-20 pad">
          <div className="container">
            <EventSection data={eventSection} />
          </div>
        </section>
      )}

      {adBannerSection && <AdBannerSection data={adBannerSection} />}

      {extraSection && (
        <section className="py-20 pad">
          <div className="container">
            <ExtraSection data={extraSection} />
          </div>
        </section>
      )}
    </>
  );
};

export default HomePage;