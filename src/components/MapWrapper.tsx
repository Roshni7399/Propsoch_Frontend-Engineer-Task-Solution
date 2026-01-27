"use client";

import dynamic from "next/dynamic";
import { PropertyListing } from "@/data/property-listing";

const DiscoveryMap = dynamic(() => import("@/components/discovery-map"), { ssr: false });

interface MapWrapperProps {
  allFilteredData: typeof PropertyListing;
}

export default function MapWrapper({ allFilteredData }: MapWrapperProps) {
  return <DiscoveryMap allFilteredData={allFilteredData} />;
}