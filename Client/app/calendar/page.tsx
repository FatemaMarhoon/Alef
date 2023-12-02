'use client'
import { useEffect, useState } from 'react';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Event } from '@/types/event';
import { createEvent, deleteEvent, getEventById, getEvents } from '@/services/eventsService';
import { useRouter } from 'next/navigation';
import { useSuccessMessageContext } from '../../components/SuccessMessageContext';
import CreateEventModal from '../../components/Calender/createModal'
import SuccessAlert from '@/components/SuccessAlert';
import { AxiosError } from 'axios';
import Link from 'next/link';
import EditEventModal from '../../components/Calender/editEventModal';

import ErrorAlert from '@/components/ErrorAlert';
import EventDetailsModal from '@/components/Calender/EventDetailsModal';
import CreateAppointmentModal from '@/components/Calender/createAppointmentModal';
import { createAppointment } from '@/services/appointmentService';

const Calendar = () => {
  const router = useRouter();
  const { successMessage, setSuccessMessage } = useSuccessMessageContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isAddApointmentModalOpen, setIsAddApointmentModalOpen] = useState(false);
  const [error, setError] = useState();
  const monthOptions: Intl.DateTimeFormatOptions = { month: 'long' };
  const yearOptions: Intl.DateTimeFormatOptions = { year: 'numeric' };
  const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  async function handleCreateAppointment(newAppointment: { date: string, time: string, application_id: number }) {
    //create logic 
    try {
      console.log("creating appointment")
      // Call the createEvent function from your service
      const response = await createAppointment(
        newAppointment.date,
        newAppointment.time,
        newAppointment.application_id,
      );
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
          fetchEvents();
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
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-primary text-white font-medium hover:bg-opacity-90"
            onClick={handleDropdownToggle}
          >
            Add
          </button>

          {isDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button onClick={() => setIsAddEventModalOpen(true)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  Add Event
                </button>
                <button onClick={() => setIsAddApointmentModalOpen(true)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  Add Appointment
                </button>
              </div>
            </div>
          )}
        </div>      </div>


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

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onCreate={handleCreateEvent}
        onSuccess={() => {
          // Fetch updated events after successful creation
          fetchEvents();
        }}
      />

      {/* Create Appointment Modal */}
      <CreateAppointmentModal
        isOpen={isAddApointmentModalOpen}
        onClose={() => setIsAddApointmentModalOpen(false)}
        onCreate={handleCreateAppointment}
        onSuccess={() => {
          // Fetch updated events after successful creation
          fetchEvents();
        }}
      />

      {/* Event Details Modal */}
      <EventDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedEvent={selectedEvent}
        onDelete={handleDelete}
        error={error}
        openEditModal={openEditModal}
      />

      {/* Edit Event Modal */}
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
