"use client";

import { useState } from "react";
import Image from "next/image";
import { projectListing } from "@/types/types";
import { cn, formatPrice, para } from "@/utils/helpers";
import { BudgetIcon } from "@/assets/budget-icon";
import { HouseIcon } from "@/assets/house-icon";
import { LocationIcon } from "@/assets/location-icon";
import { CalendarIcon } from "@/assets/utility";
import { PropscoreRating } from "@/assets/PropsochRating";

interface ListViewProps {
  projects: projectListing[];
}

export default function ListView({ projects }: ListViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Property List</h2>
      <div className="flex-1 overflow-y-auto space-y-4">
        {currentProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex gap-4"
          >
            <Image
              src={project.image}
              alt={project.alt}
              width={150}
              height={100}
              className={cn(
                "rounded-md object-cover flex-shrink-0",
                project.projectStatus === "soldOut" && "grayscale"
              )}
            />
            <div className="flex-1 min-w-0">
              <h3 className={cn(para({ size: "lg", color: "dark" }), "font-semibold truncate")}>
                {project.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <LocationIcon width={16} height={16} />
                <span className={para({ color: "dark", size: "sm" })}>{project.micromarket}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <BudgetIcon width={16} height={16} />
                <span className={para({ color: "dark", size: "sm" })}>
                  {formatPrice(project.minPrice, false)} - {formatPrice(project.maxPrice, false)}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <HouseIcon width={16} height={16} />
                <span className={para({ color: "dark", size: "sm" })}>
                  {project.typologies?.join(", ") || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className={para({ color: "dark", size: "sm" })}>
                  <CalendarIcon height={16} width={16} className="inline mr-1" />
                  {new Date(project.possessionDate).toLocaleDateString('en-US')}
                </span>
                <PropscoreRating
                  rating={project.propscore}
                  width={80}
                  height={20}
                  className="w-max"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}