'use client'
import { useEffect, useState } from 'react';
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { Event } from '@/types/event';
import { createEvent, getEventById, getEvents } from '@/services/eventsService';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import CreateEventModal from './createModal';

const Calendar = () => {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const monthOptions = { month: 'long' };
  const yearOptions = { year: 'numeric' };
  const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const openModal = async (eventsForDay: any[]) => {
    // Select the first event for simplicity. Adjust as needed.
    const firstEvent = eventsForDay[0];
    await getEventById(firstEvent.id).then((event) => {
      setSelectedEvent(event);
      setIsModalOpen(true);
    })
  };


  const closeModal = () => {
    setSelectedEvent(undefined);
    setIsModalOpen(false);
  };

  const renderCalendarDays = () => {
    const days = [];
    let currentWeek = [];

    for (let i = 0; i < daysInMonth + startDay; i++) {
      const day = i - startDay + 1;
      const isCurrentMonth = i >= startDay;

      const dayClasses = `ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31 ${isCurrentMonth ? 'text-black dark:text-white' : 'text-gray'}`;

      const eventsForDay = events.filter(event => {
        const eventDate = new Date(event.event_date);
        return (
          eventDate.getFullYear() === currentMonth.getFullYear() &&
          eventDate.getMonth() === currentMonth.getMonth() &&
          eventDate.getDate() === day
        );
      });

      currentWeek.push(
        <td key={i} className={dayClasses} onClick={() => openModal(eventsForDay)}>
          {isCurrentMonth && (
            <>
              <span className="font-medium">{day}</span>
              <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
                <span className="group-hover:text-primary md:hidden">More</span>
                {eventsForDay.map(event => (
                  <div className="event invisible absolute left-2 z-99 mb-1 flex w-full flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left max-w-[160px] opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:max-w-[150px] md:opacity-100">
                    <div key={event.id} className="event-details">
                      <span className="event-name text-sm font-semibold text-black dark:text-white">
                        {event.event_name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </td>
      );

      // Start a new row (week) when reaching the end of a week or the end of the month
      if ((i + 1) % 7 === 0 || i === daysInMonth + startDay - 1) {
        days.push(<tr key={days.length} className="grid grid-cols-7">{currentWeek}</tr>);
        currentWeek = [];
      }
    }

    return days;
  };

  async function fetchEvents() {
    try {
      const eventsData = await getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async (newEvent: { event_name: string; event_date: Date; notes: string; notify_parents: boolean; notify_staff: boolean; public_event: boolean; classes: number[] | undefined; }) => {
    try {
      console.log("creating")
      // Call the createEvent function from your service
      if (newEvent.event_name && newEvent.event_date && newEvent.notes)
        await createEvent(
          newEvent.event_name,
          newEvent.event_date,
          newEvent.notes,
          newEvent.notify_parents,
          newEvent.notify_staff,
          newEvent.public_event,
          newEvent.classes).then(() => {
            fetchEvents();
          });

    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Calendar" />
      {/* Add Event Button */}

      <div className="flex justify-end mb-4">
        <button className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90"
          onClick={() => setIsAddEventModalOpen(true)}>Add Event</button>
      </div>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onCreate={handleCreateEvent}
      />
      {/* Calendar Section Start */}
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between p-4 text-black dark:text-white font-medium" >
          <button onClick={prevMonth}>&lt; Previous</button>
          <h2>{currentMonth.toLocaleDateString(undefined, monthOptions)} {currentMonth.toLocaleDateString(undefined, yearOptions)}</h2>
          <button onClick={nextMonth}>Next &gt;</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              {weekdayNames.map((day, index) => (
                <th key={index} className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderCalendarDays()}
          </tbody>
        </table>
      </div>
      {/* Calendar Section End */}

      {/* Event Details Modal */}
      {isModalOpen && selectedEvent && (
        <Dialog open={isModalOpen} onClose={closeModal} className="modal">
          <DialogContent className="modal-body">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">Event Details</h3>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Event Title</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {String(selectedEvent.event_name)}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Event Date</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {String(selectedEvent.event_date)}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Notes</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {selectedEvent.notes}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Public Event</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {selectedEvent.public_event ? 'Yes' : 'No'}
                  </dd>
                </div>
                {!selectedEvent.public_event && (
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Associated Classes</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {selectedEvent.Classes?.map((classItem) => (
                        <p key={classItem.id} className="mr-2">
                          {classItem.class_name}
                        </p>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </DialogContent>
          <DialogActions className="modal-footer">
            <Button onClick={closeModal} className="modal-close-btn">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

    </>
  );
};

export default Calendar;

// import Breadcrumb from "../Breadcrumbs/Breadcrumb";

// const Calendar = () => {
//   return (
//     <>
//       <Breadcrumb pageName="Calendar" />

//       {/* <!-- ====== Calendar Section Start ====== --> */}
//       <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <table className="w-full">
//           <thead>
//             <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
//               <th className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Sunday </span>
//                 <span className="block lg:hidden"> Sun </span>
//               </th>
//               <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Monday </span>
//                 <span className="block lg:hidden"> Mon </span>
//               </th>
//               <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Tuesday </span>
//                 <span className="block lg:hidden"> Tue </span>
//               </th>
//               <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Wednesday </span>
//                 <span className="block lg:hidden"> Wed </span>
//               </th>
//               <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Thursday </span>
//                 <span className="block lg:hidden"> Thur </span>
//               </th>
//               <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Friday </span>
//                 <span className="block lg:hidden"> Fri </span>
//               </th>
//               <th className="flex h-15 items-center justify-center rounded-tr-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
//                 <span className="hidden lg:block"> Saturday </span>
//                 <span className="block lg:hidden"> Sat </span>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* <!-- Line 1 --> */}
//             <tr className="grid grid-cols-7">
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   1
//                 </span>
//                 <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
//                   <span className="group-hover:text-primary md:hidden">
//                     More
//                   </span>
//                   <div className="event invisible absolute left-2 z-99 mb-1 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[190%] md:opacity-100">
//                     <span className="event-name text-sm font-semibold text-black dark:text-white">
//                       Redesign Website
//                     </span>
//                     <span className="time text-sm font-medium text-black dark:text-white">
//                       1 Dec - 2 Dec
//                     </span>
//                   </div>
//                 </div>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   2
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   3
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   4
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   5
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   6
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   7
//                 </span>
//               </td>
//             </tr>
//             {/* <!-- Line 1 --> */}
//             {/* <!-- Line 2 --> */}
//             <tr className="grid grid-cols-7">
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   8
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   9
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   10
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   11
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   12
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   13
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   14
//                 </span>
//               </td>
//             </tr>
//             {/* <!-- Line 2 --> */}
//             {/* <!-- Line 3 --> */}
//             <tr className="grid grid-cols-7">
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   15
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   16
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   17
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   18
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   19
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   20
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   21
//                 </span>
//               </td>
//             </tr>
//             {/* <!-- Line 3 --> */}
//             {/* <!-- Line 4 --> */}
//             <tr className="grid grid-cols-7">
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   22
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   23
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   24
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   25
//                 </span>
//                 <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
//                   <span className="group-hover:text-primary md:hidden">
//                     More
//                   </span>
//                   <div className="event invisible absolute left-2 z-99 mb-1 flex w-[300%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[290%] md:opacity-100">
//                     <span className="event-name text-sm font-semibold text-black dark:text-white">
//                       App Design
//                     </span>
//                     <span className="time text-sm font-medium text-black dark:text-white">
//                       25 Dec - 27 Dec
//                     </span>
//                   </div>
//                 </div>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   26
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   27
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   28
//                 </span>
//               </td>
//             </tr>
//             {/* <!-- Line 4 --> */}
//             {/* <!-- Line 5 --> */}
//             <tr className="grid grid-cols-7">
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   29
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   30
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   31
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   1
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   2
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   3
//                 </span>
//               </td>
//               <td className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
//                 <span className="font-medium text-black dark:text-white">
//                   4
//                 </span>
//               </td>
//             </tr>
//             {/* <!-- Line 5 --> */}
//           </tbody>
//         </table>
//       </div>
//       {/* <!-- ====== Calendar Section End ====== --> */}
//     </>
//   );
// };

// export default Calendar;
