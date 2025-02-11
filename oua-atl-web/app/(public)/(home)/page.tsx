import HeroSlider from "@/app/(public)/(home)/section/HeroSlider";
import MidSection from "@/app/(public)/(home)/section/MidSection";
import { Suspense } from "react";
import TableLoader from "@/app/ui/loaders/TableLoader";
import PastProjects from "@/app/ui/PastProjects";
import EventSection from "@/app/(public)/(home)/section/EventSection";
import ExtraSection from "@/app/(public)/(home)/section/ExtraSection";
import BannerSection from "@/app/(public)/(home)/section/BannerSection";
import { Section } from "@/app/lib/types";
import AdBannerSection from "@/app/(public)/(home)/section/AdBannerSection";
import json from "@/lib/pages/pageSchema.json";

const baseUrl = process.env?.APP_URL ?? "http://localhost:3000"

// Fetch the `home` object
const getData = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/content?slug=home`,{
      cache: "default"
    });
    const result = await response.json().catch(() => ({message: response.statusText}));
    return result.data.pages.home;
  } catch (error) {
    console.log('home_error', error)
    return json.pages.home
  }
};


const page = async () => {
  // Fetch the JSON data
  const homeData = await getData();

  return (
    <>
      <section aria-label="hero h-full md:max-h-hero">
        <div className="w-full">
          <HeroSlider data={homeData.sections.find((s: Section) => s.slug === "home-hero-section")} />
        </div>
      </section>
      <BannerSection data={homeData.sections.find((s: Section) => s.slug === "strip-banner")} />

      <MidSection data={homeData.sections.find((s: Section) => s.slug === "home-page-mid-section")} />

      {/* <section className="py-20 my-12 px-3 bg-gray-100">
        <div className="container">
          <Suspense fallback={<TableLoader />}>
            <PastProjects data={homeData.sections.find((s: Section) => s.slug === "projects")} />
          </Suspense>
        </div>
      </section> */}

      <section className="py-20 pad">
        <div className="container">
          {
            homeData.sections.find((s: Section) => s.slug === "physical-events") &&
            <EventSection data={homeData.sections.find((s: Section) => s.slug === "physical-events")} />
          }
    
        </div>
      </section>

     <AdBannerSection data={homeData.sections.find((s: Section) => s.slug === "ad-banner")}  />

      <section className="py-20 pad">
        <div className="container">
          <Suspense fallback={<TableLoader />}>
            <ExtraSection data={homeData.sections.find((s: Section) => s.slug === "home-grid-section")} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default page;

