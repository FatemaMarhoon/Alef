"use client";
import React from "react";
import ChartThree from "@/components/Charts/ChartThree";
import dynamic from "next/dynamic";
import ProgressBar from "@/components/Charts/ProgressBar";
import Upcoming from "@/components/Charts/Upcoming";

const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
  ssr: false,
});

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <Upcoming />
        <ChartThree />
        <ProgressBar />
      </div>
    </>
  );
};

export default ECommerce;
