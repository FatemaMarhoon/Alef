"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getApplications } from "@/services/applicationsService";
import { Application } from "@/types/application";
import ReactApexChart from 'react-apexcharts';
import { getGrades } from "@/services/gradeCapacityService";
import { GradeCapacity } from "@/types/gradeCapacity";
import { getStudents } from "@/services/studentService";

export default function ProgressBar() {

    const [loading, setLoading] = useState(true);
    const [gradesCurrentCapacity, setGradesCurrentCapacity] = useState<{ grade: string, current: number }[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch grades and capacities
                const grades: GradeCapacity[] = await getGrades();

                // Calculate remaining capacity and update the series state
                let gradesCurrent: { grade: string, current: number }[] = [];
                const applicationsData = await getApplications();
                const applications: Application[] = applicationsData.data;
                for (const grade of grades) {
                    const currentStudents = await getStudents(grade.grade);
                    const currentApplications = applications.filter((application) => application.grade == grade.grade && (application.status == "Accepted" || application.status == "Pending"));
                    const totalCurrent = currentApplications.length + currentStudents.length;
                    console.log("Grade: ", grade, " has: ", totalCurrent);
                    //calculate percantage 
                    const percantage = (totalCurrent / Number(grade.capacity)) * 100;
                    gradesCurrent.push({ grade: grade.grade, current: Number(percantage.toFixed(1)) });
                }
                setGradesCurrentCapacity(gradesCurrent);
                setLoading(false);

            } catch (error: any) {
                console.log(error)
            }
        }

        fetchData();
    }, []);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
            <div className="mb-6 justify-between gap-4 sm:flex">
                <div>
                    <h5 className="text-xl font-semibold text-black dark:text-white">
                        Grades Capacity
                    </h5>
                </div>
                <div>

                </div>
            </div>
            {loading &&
                <div className="h-4 w-4 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            }
            <div className="mb-2">
                {/* Display bars for each grade */}
                {gradesCurrentCapacity.map(({ grade, current }, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <div className="w-1/4 pr-4">
                            <span className="text-sm font-semibold">{grade}</span>
                        </div>
                        <div className="flex-1 h-5 bg-gray-200 rounded overflow-hidden">
                            <div
                                className="h-full bg-primary"
                                style={{ width: `${current}%` }}
                            ></div>
                        </div>
                        <div className="w-1/4 pl-4">
                            <span className="text-sm font-semibold">{current}%</span>
                        </div>
                    </div>
                ))}

            </div>

            {/* ... (existing chart code) */}
        </div>
    );
}
