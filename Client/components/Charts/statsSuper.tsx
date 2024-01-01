"use client";
import React, { useEffect, useState } from "react";


import { getPreschools } from "@/services/preschoolService";
import CardDataStats from "@/components/CardDataStats";
import Image from "next/image";
import { getRequests } from "@/services/requestService";
import { getAllUsers } from "@/services/userService";

export default function StatisticsCards() {

    const [totalStudents, setTotalStudents] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0);
    const [totalTeachers, setTotalTeachers] = useState(0);

    const [totalPreschools, settotalPreschools] = useState(0);
    const [totalRquests, settotalRquests] = useState(0);
    const [totalUsers, settotalUsers] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {

                const preschools = await getPreschools();
                const requests = await getRequests();
                const users = await getAllUsers();

                settotalPreschools(preschools.length);
                settotalRquests(requests.length);
                settotalUsers(users.length);

            } catch (error: any) {
                console.log(error)
            }
        }

        fetchData();
    }, []);

    return (
        <div className="col-span-12 grid grid-cols-12 gap-4  xl:col-span-6">
            <div className="col-span-4">
                <CardDataStats title="Total Preschools" total={String(totalPreschools)}>
                    <Image
                        className="fill-primary dark:fill-white"
                        width="20"
                        height="22"
                        src="school.svg"
                        alt="preschools"
                    />
                </CardDataStats>
            </div>
            <div className="col-span-4">
                <CardDataStats title="Total Requests" total={String(totalRquests)}>
                    <Image
                        className="fill-primary dark:fill-white"
                        width="20"
                        height="22"
                        src="subscription.svg"
                        alt="preschools"
                    />
                </CardDataStats>
            </div>
            <div className="col-span-4">
                <CardDataStats title="Total Users" total={String(totalUsers)} >
                    <Image
                        className="fill-primary dark:fill-white"
                        width="20"
                        height="22"
                        src="users-alt.svg"
                        alt="users"
                    />
                </CardDataStats>
            </div>
        </div>
    );
}

