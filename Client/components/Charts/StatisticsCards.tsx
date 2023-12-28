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
import CardDataStats from "@/components/CardDataStats";
import Image from "next/image";
import { getStaff } from "@/services/staffService";
import { getClasses } from "@/services/classService";

export default function StatisticsCards() {

    const [totalStudents, setTotalStudents] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0);
    const [totalTeachers, setTotalTeachers] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const students = await getStudents();
                const staff = await getStaff();
                const teachers = staff.filter((staff) => staff.staff_role_name == "Teacher");
                const classes = await getClasses();
                setTotalStudents(students.length);
                setTotalClasses(classes.length);
                setTotalTeachers(teachers.length);

            } catch (error: any) {
                console.log(error)
            }
        }

        fetchData();
    }, []);

    return (
        <div className="col-span-12 grid grid-cols-12 gap-4  xl:col-span-6">
            <div className="col-span-4">
                <CardDataStats title="Total Classes" total={String(totalClasses)}>
                    <Image
                        className="fill-primary dark:fill-white"
                        width="20"
                        height="22"
                        src="chalkboard-user copy.svg"
                        alt="classes"
                    />
                </CardDataStats>
            </div>
            <div className="col-span-4">
                <CardDataStats title="Total Students" total={String(totalStudents)}>
                    <Image
                        className="fill-primary dark:fill-white"
                        width="20"
                        height="22"
                        src="child-head (2).svg"
                        alt="students"
                    />
                </CardDataStats>
            </div>
            <div className="col-span-4">
                <CardDataStats title="Total Teachers" total={String(totalTeachers)} >
                    <Image
                        className="fill-primary dark:fill-white"
                        width="20"
                        height="22"
                        src="file-user (1) copy.svg"
                        alt="teachers"
                    />
                </CardDataStats>
            </div>
        </div>
    );
}

