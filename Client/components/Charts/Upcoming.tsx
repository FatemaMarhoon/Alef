"use client";
import React, { useEffect, useState } from "react";
import { getEvents } from "@/services/eventsService";
import { getAppointments } from "@/services/appointmentService";
import { Appointment } from "@/types/appointment";
import { MyEvent } from "@/types/event";

// ... (your imports)

export default function Upcoming() {
    const [upcomingItemsGrouped, setUpcomingItemsGrouped] = useState<{ [key: string]: (MyEvent | Appointment)[] }>({});
    const isEvent = (item: MyEvent | Appointment): item is MyEvent => 'event_name' in item;

    function formatDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        };

        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
        return formattedDate;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch events and appointments
                const events = await getEvents();
                const appointments = await getAppointments();

                // Combine events and appointments into a single array
                const combinedData = [...events, ...appointments];

                const futureItems = combinedData.filter((item) => {
                    const currentDate = new Date();

                    if (isEvent(item)) {
                        // For events, compare the event_date with the current date
                        const eventDate = new Date(item.event_date);
                        return eventDate > currentDate;
                    } else {
                        // For appointments, combine date and time and compare with the current date and time
                        const appointmentDate = new Date(item.date);

                        if (item.time) {
                            const [hours, minutes, seconds] = item.time.split(':');
                            appointmentDate.setHours(Number(hours));
                            appointmentDate.setMinutes(Number(minutes));
                            appointmentDate.setSeconds(Number(seconds));
                        }
                        return appointmentDate > currentDate;
                    }
                });

                // Sort the combined array based on date and time in ascending order
                futureItems.sort((a, b) => {
                    const dateA = isEvent(a) ? new Date(a.event_date) : new Date(a.date);
                    const timeA = isEvent(a) ? '00:00:00' : a.time;

                    const dateB = isEvent(b) ? new Date(b.event_date) : new Date(b.date);
                    const timeB = isEvent(b) ? '00:00:00' : b.time;

                    // Compare dates
                    if (dateA < dateB) return -1;
                    if (dateA > dateB) return 1;

                    // If dates are equal, compare times
                    if (timeA < timeB) return -1;
                    if (timeA > timeB) return 1;

                    // Dates and times are equal
                    return 0;
                });

                const topUpcoming = futureItems.slice(0, 3)
                // Group the top 3 items by date
                const groupedItems: { [key: string]: (MyEvent | Appointment)[] } = {};
                topUpcoming.forEach((item) => {
                    const dateKey = isEvent(item) ? item.event_date : item.date;
                    const key = dateKey instanceof Date ? dateKey.toISOString() : dateKey.toString();

                    if (!groupedItems[key]) {
                        groupedItems[key] = [];
                    }
                    groupedItems[key].push(item);
                });

                // Set state with grouped items
                setUpcomingItemsGrouped(groupedItems);

            } catch (error: any) {
                // Handle error
            }
        }

        fetchData();
    }, []);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
            <div className="mb-6 justify-between gap-4 sm:flex">
                <div>
                    <h5 className="text-xl font-semibold text-black dark:text-white">
                        Upcoming
                    </h5>
                </div>
                <div></div>
            </div>

            <div className="mb-2">
                <div className="relative col-span-12 px-6 space-y-6 sm:col-span-9">
                    {Object.entries(upcomingItemsGrouped).map(([date, items]) => (
                        <div key={date}>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{formatDate(new Date(date))}</h3>
                            {items.map((item) => (
                                <div key={item.id} className="col-span-12 space-y-12 mb-4 relative px-8 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-4 before:bg-gray-700">
                                    <div className={`flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] ${isEvent(item) ? "before:bg-alef-purple" : "before:bg-secondary"}`}>
                                        <time className="text-xs tracki uppercase dark:text-gray-400">
                                            {isEvent(item) ? "" : item.time.slice(0,5)}
                                        </time>
                                        {isEvent(item) ? item.event_name : "Evaluation Appointment"}
                                        {/* <p className="mt-1">{isEvent(item) ? item.public_event ? " Public Event" : item.Classes?.length : "For Applicant: " + item.Application?.student_name}</p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
