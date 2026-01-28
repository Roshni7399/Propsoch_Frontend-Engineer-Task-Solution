import { PropertyListing } from "@/data/property-listing";
import MapWrapper from "@/components/MapWrapper";
import type { Metadata } from "next";
import ListView from "@/components/ListView";
import { projectListing } from "@/types/types";

//TODO : Add meta data for this page
export const metadata: Metadata = {
  title: "Property Discovery - Explore Projects on Map and List",
  description: "Discover real estate projects with an interactive map and paginated list view. Find your ideal property in Bangalore and beyond.",
  keywords: ["real estate", "property listing", "map view", "Bangalore properties"],
  openGraph: {
    title: "Property Discovery",
    description: "Explore properties via map and list with pagination.",
    type: "website",
  },
};
// Page should serve via SSR
// Do not add "use client" declarative

// TODO: Create a List view for these properties.
// Use your own imagination while designing, please don't copy Propsoch's current UI.
// We don't like it either.
// Add pagination
// You can modify the Property Listing however you want. If you feel like creating an API and implementing pagination via that, totally your call.

export default async function Page() {
  return (
    <div className="w-screen h-screen flex">
      {/* Map Section */}
      <div className="flex-1">
        <MapWrapper allFilteredData={PropertyListing} />
      </div>
      {/* List Section */}
      <div className="w-1/3 border-l border-gray-200">
        <ListView projects={PropertyListing.projects as projectListing[]} />
      </div>
    </div>
  );
}
