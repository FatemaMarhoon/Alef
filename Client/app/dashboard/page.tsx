"use client";
import React from "react";
import ChartThree from "@/components/Charts/ChartThree";
import ProgressBar from "@/components/Charts/ProgressBar";
import Upcoming from "@/components/Charts/Upcoming";
import StatisticsCards from "@/components/Charts/StatisticsCards";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const Dashboard: React.FC = () => {
  return (
    <>
    <Breadcrumb pageName="Dashboard"></Breadcrumb>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <Upcoming />
        <ChartThree />
        <ProgressBar />
        <StatisticsCards />
      </div>
    </>
  );
};

export default Dashboard;
