'use client'
import { useEffect, useState } from 'react';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Event } from '@/types/event';
import { createEvent, deleteEvent, getEventById, getEvents } from '@/services/eventsService';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useSuccessMessageContext } from '../../components/SuccessMessageContext';
import CreateEventModal from '../../components/Calender/createModal'
import SuccessAlert from '@/components/SuccessAlert';
import { AxiosError } from 'axios';
import Link from 'next/link';
import EditEventModal from '../../components/Calender/editEventModal';

import ErrorAlert from '@/components/ErrorAlert';

const Calendar = () => {
  const router = useRouter();
  const { successMessage, setSuccessMessage } = useSuccessMessageContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [error, setError] = useState();
  const monthOptions: Intl.DateTimeFormatOptions = { month: 'long' };
  const yearOptions: Intl.DateTimeFormatOptions = { year: 'numeric' };
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

  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditEventModalOpen(true);
    closeModal();
  };

  const closeEditModal = () => {
    setIsEditEventModalOpen(false);
  };

  const closeModal = () => {
    // setSelectedEvent(undefined);
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

  async function handleCreateEvent(newEvent: { event_name: string; event_date: Date; notes: string; notify_parents: boolean; notify_staff: boolean; public_event: boolean; classes: number[] | undefined; }) {
    try {
      console.log("creating")
      // Call the createEvent function from your service
      const response = await createEvent(
        newEvent.event_name,
        newEvent.event_date,
        newEvent.notes,
        newEvent.notify_parents,
        newEvent.notify_staff,
        newEvent.public_event,
        newEvent.classes);
      if (response.status == 200 || response.status == 201) {
        setSuccessMessage(response.data.message);
        fetchEvents();
      }
      else if (response.status == 500 || response.status == 400 || response.status == 404) {
        throw Error(response.data.message)
      }
    } catch (error: any) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  };

  async function handleDelete(id: number) {
    try {
      console.log("Start delete function");
      if (confirm("Are you sure you want to delete this event?")) {
        const response = await deleteEvent(id);
        if (response.status === 200 || response.status === 201) {
          closeModal(); // Close the modal
          setSuccessMessage(response.data.message);
          router.refresh();
        } else if (response.status === 400 || response.status === 404 || response.status === 500) {
          setError(response.data.message);
        }
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      }
    }
  }



  return (
    <>
      <Breadcrumb pageName="Calendar" />
      {/* Add Event Button */}
      {successMessage && <SuccessAlert message={successMessage} />}
      <div className="flex justify-end mb-4">
        <button className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90"
          onClick={() => setIsAddEventModalOpen(true)}>Add Event</button>
      </div>

      <CreateEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onCreate={handleCreateEvent}
        onSuccess={() => {
          // Fetch updated events after successful creation
          fetchEvents();
        }}
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
      {!isEditEventModalOpen && isModalOpen && selectedEvent && (
        <Dialog open={isModalOpen} onClose={closeModal} className="modal">
          <DialogContent className="modal-body">
            {error && <ErrorAlert message={error} />}
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">Event Details</h3>
            </div>
            <button onClick={() => openEditModal()}>
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                  fill=""
                />
                <path
                  d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                  fill=""
                />
              </svg>
            </button>
            <button onClick={() => handleDelete(selectedEvent.id)}>
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                  fill=""
                />
                <path
                  d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                  fill=""
                />
                <path
                  d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                  fill=""
                />
                <path
                  d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                  fill=""
                />
              </svg>
            </button>
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

      {selectedEvent &&
        <EditEventModal
          isOpen={isEditEventModalOpen}
          onClose={closeEditModal}
          onSuccess={() => {
            // Fetch updated events after successful creation
            fetchEvents();
          }}
          event={selectedEvent} // Pass the selectedEvent to be edited
        />
      }
    </>
  );
};

export default Calendar;
