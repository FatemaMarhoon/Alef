"use client";
import React, { useEffect, useState } from "react";
import ChartThree from "@/components/Charts/ChartThree";
import Requests from "@/components/Charts/requestsChart";
import SuperStats from "@/components/Charts/statsSuper";

import ProgressBar from "@/components/Charts/ProgressBar";
import Upcoming from "@/components/Charts/Upcoming";
import StatisticsCards from "@/components/Charts/StatisticsCards";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { currentUserRole } from "@/services/authService";

const Dashboard: React.FC = () => {
  const [role, setRole] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {

        const userRole = await currentUserRole();
        setRole(String(userRole));
        console.log("role", role);


      } catch (error) {
        console.error("Error fetching :", error);

      }
    };

    fetchData(); // Call the async function

  }, [role]);

  return (
    <>
      <Breadcrumb pageName="Dashboard"></Breadcrumb>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {(role === 'Admin') && (
          <>
            <Upcoming />
            <ChartThree />
            <ProgressBar />
            <StatisticsCards />
          </>
        )}
        {(role === 'Super Admin') && (
          <>
            <Requests />
            <SuperStats />
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
