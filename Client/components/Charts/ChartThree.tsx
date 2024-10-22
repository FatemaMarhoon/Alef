"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getApplications } from "@/services/applicationsService";
import { Application } from "@/types/application";
import ReactApexChart from 'react-apexcharts';

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    type: "donut",
  },
  colors: ['#9EA1D4', "#7db0b0", "#FD8A8A", "#F1F7B5", "#AEB7C0"],
  labels: ["Pending", "Accepted", "Rejected", "Waitlist", "Cancelled"],
  legend: {
    show: true,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};


export default function ChartThree() {
  const [state, setState] = useState<ChartThreeState>({
    series: [],
  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await getApplications();
        const applications: Application[] = response.data;
        const pendings = applications.filter((application) => application.status == "Pending");
        const accepted = applications.filter((application) => application.status == "Accepted");
        const waitlist = applications.filter((application) => application.status == "Waitlist");
        const rejected = applications.filter((application) => application.status == "Rejected");
        const cancelled = applications.filter((application) => application.status == "Cancelled");

        // Update the series state with the lengths of each status
        setState({
          series: [pendings.length, accepted.length, rejected.length, waitlist.length, cancelled.length],
        });
        setLoading(false);
      } catch (error: any) {
        console.log(error.message)
      }
    }

    fetchApplications();

  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <div className="mb-6 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Applications
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          {loading &&
            <div className="h-4 w-4 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
          }
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

    </div>
  );
};
