'use client'
import { useEffect, useState } from 'react';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { MyEvent } from '@/types/event';
import { createEvent, deleteEvent, getEventById, getEvents } from '@/services/eventsService';
import { useSuccessMessageContext } from '../../components/SuccessMessageContext';
import CreateEventModal from '../../components/Calender/CreateEventModal'
import SuccessAlert from '@/components/SuccessAlert';
import { AxiosError } from 'axios';
import EditEventModal from '../../components/Calender/editEventModal';

import ErrorAlert from '@/components/ErrorAlert';
import DetailsModal from '@/components/Calender/DetailsModal';
import CreateAppointmentModal from '@/components/Calender/createAppointmentModal';
import { createAppointment, deleteAppointment, getAppointments } from '@/services/appointmentService';
import { Appointment } from '@/types/appointment';
import EditAppointmentModal from '@/components/Calender/EditAppointmentModal';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Calendar = () => {
  const { successMessage, setSuccessMessage } = useSuccessMessageContext();
  const [error, setError] = useState();
  const [appliedFilter, setAppliedFilter] = useState("");
  //calendar 
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthOptions: Intl.DateTimeFormatOptions = { month: 'long' };
  const yearOptions: Intl.DateTimeFormatOptions = { year: 'numeric' };
  const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const [selectedDayItems, setSelectedDayItems] = useState<{ eventsForDay: MyEvent[], appointmentsForDay: Appointment[] }>
    ({ eventsForDay: [], appointmentsForDay: [] });
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const nextMonth = () => { setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)); };
  const prevMonth = () => { setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)); };

  //General 
  const renderCalendarDays = () => {
    const days = [];
    let currentWeek = [];

    const isEvent = (item: MyEvent | Appointment): item is MyEvent => 'event_name' in item;

    for (let i = 0; i < daysInMonth + startDay; i++) {
      const day = i - startDay + 1;
      const isCurrentMonth = i >= startDay;

      const dayClasses = `ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31 ${isCurrentMonth ? 'text-black dark:text-white' : 'text-gray'}`;

      const eventsForDay = events.filter((event: MyEvent) => {
        const eventDate = new Date(event.event_date);
        return (
          eventDate.getFullYear() === currentMonth.getFullYear() &&
          eventDate.getMonth() === currentMonth.getMonth() &&
          eventDate.getDate() === day
        );
      });


      const temp = appointments.filter((appointment: Appointment) => {
        const appointmentDate = new Date(appointment.date);
        return (
          appointmentDate.getFullYear() === currentMonth.getFullYear() &&
          appointmentDate.getMonth() === currentMonth.getMonth() &&
          appointmentDate.getDate() === day
        );
      });

      const appointmentsForDay = temp.sort((a, b) =>
        Number(a.time.substring(0, 2)) - Number(b.time.substring(0, 2))
      );

      const hasMoreItems = eventsForDay.length + appointmentsForDay.length > 1;

      currentWeek.push(
        <td key={i} className={dayClasses} onClick={() => openDetailsModal(eventsForDay, appointmentsForDay)}>
          {isCurrentMonth && (
            <div className="relative h-full flex flex-col">
              <span className="font-medium">{day}</span>
              {hasMoreItems && (
                <span className="ml-1 absolute right-3 text-sm font-bold text-primary invisible md:visible">
                  {`+${eventsForDay.length + appointmentsForDay.length - 1}`}
                </span>
              )}
      
              <div className={`group flex-grow cursor-pointer py-1 ${hasMoreItems ? 'group-hover:text-primary' : ''}`}>
                {[...eventsForDay, ...appointmentsForDay].length > 0 && (
                  <span className="group-hover:text-primary md:hidden">More</span>
                )}
                {[...eventsForDay, ...appointmentsForDay].slice(0, 1).map((item) => (
                  <div key={item.id} className={`event invisible relative z-99 mb-1 flex flex-col rounded-sm border-l-[3px] ${isEvent(item) ? 'border-alef-purple bg-alef-purple ' : 'border-secondary bg-secondary '} bg-opacity-10 px-3 py-1 text-left max-w-[160px] opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 sm:visible sm:max-w-[150px] sm:opacity-100 md:visible md:max-w-[150px] md:opacity-100`}>
                    <div className="event-details flex-grow">
                      <span className="event-name text-sm font-semibold text-black dark:text-white">
                        {isEvent(item) ? item.event_name : 'Appointment'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openDetailsModal = async (eventsForDay: MyEvent[], appointmentsForDay: Appointment[]) => {
    if (eventsForDay.length + appointmentsForDay.length > 0) {
      setSelectedDayItems({ eventsForDay, appointmentsForDay });
      setIsDetailsModalOpen(true);
    }
  };

  const handleEdit = async (appointment?: Appointment, event?: MyEvent) => {
    console.log("Main page is handling edit....")
    if (event) {
      setSelectedEvent(event)
      setIsEditEventModalOpen(true);
      closeDetailsModal();
    }
    else if (appointment) {
      console.log("Appointment is found")
      setSelectedAppointment(appointment)
      setIsEditAppointmentModalOpen(true);
      closeDetailsModal();
    }
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  useEffect(() => {

    fetchEvents();

    fetchAppointments();

  }, []);


  /* EVENTS */
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<(MyEvent)>();
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);

  //view
  async function fetchEvents() {
    try {
      const eventsData = await getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  //add
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

  //Edit
  const closeEventEditModal = () => {
    setIsEditEventModalOpen(false);
  };

  //delete
  async function handleDelete(appointment?: Appointment, event?: MyEvent) {
    try {
      if (event) {
        if (confirm("Are you sure you want to delete this event?")) {
          const response = await deleteEvent(event.id);
          if (response.status === 200 || response.status === 201) {
            closeDetailsModal(); // Close the modal
            setSuccessMessage(response.data.message);
            fetchEvents();
          } else if (response.status === 400 || response.status === 404 || response.status === 500) {
            setError(response.data.message);
          }
        }
      }
      else if (appointment) {
        if (confirm("Are you sure you want to delete this appointment?")) {
          const response = await deleteAppointment(appointment.id);
          if (response.status === 200 || response.status === 201) {
            closeDetailsModal(); // Close the modal
            setSuccessMessage(response.data.message);
            fetchAppointments();
          } else if (response.status === 400 || response.status === 404 || response.status === 500) {
            setError(response.data.message);
          }
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

  /* APPOINTMENTS */
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<(Appointment)>();
  const [isAddApointmentModalOpen, setIsAddApointmentModalOpen] = useState(false);
  const [isEditAppointmentModalOpen, setIsEditAppointmentModalOpen] = useState(false);

  //view 
  async function fetchAppointments() {
    try {
      const apointmentsData = await getAppointments();
      setAppointments(apointmentsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  //add
  async function handleCreateAppointment(newAppointment: { date: string, time: string, application_id: number }) {
    //create logic 
    try {
      console.log("creating appointment")
      const response = await createAppointment(
        newAppointment.date,
        newAppointment.time,
        newAppointment.application_id,
      );
      if (response.status == 200 || response.status == 201) {
        setSuccessMessage(response.data.message);
        fetchAppointments();
      }
      else if (response.status == 500 || response.status == 400 || response.status == 404) {
        throw Error(response.data.message)
      }
    } catch (error: any) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  };

  //edit
  const closeAppointmentEditModal = () => {
    setIsEditAppointmentModalOpen(false);
  };

  useEffect(() => {

    if (appliedFilter == "Events") {
      fetchEvents();
      setAppointments([]);
    }
    else if (appliedFilter == "Appointments") {
      fetchAppointments();
      setEvents([]);
    }
    else {
      fetchEvents();
      fetchAppointments();
    }
  }, [appliedFilter])

  //delete
  async function handleDeleteAppointment(id: number) {
    try {
      console.log("Start delete function");
      if (confirm("Are you sure you want to delete this event?")) {
        const response = await deleteAppointment(id);
        if (response.status === 200 || response.status === 201) {
          closeDetailsModal(); // Close the modal
          setSuccessMessage(response.data.message);
          fetchAppointments();
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
      {error && <ErrorAlert message={error}></ErrorAlert>}

      <div className="flex justify-end mb-4">
        <div className="relative inline-block text-left">
        <FormControl className="mx-4" variant="outlined" size="small" style={{ minWidth: 150 }}>
            <InputLabel>Filter By</InputLabel>
            <Select
              value={appliedFilter}
              onChange={(e) => {
                setAppliedFilter(e.target.value as string);
              }}
              label="Filter By"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Events">
                Events
              </MenuItem>
              <MenuItem value="Appointments">
                Appointments
              </MenuItem>
            </Select>
          </FormControl>
          <button
            type="button"
            className="inline-flex justify-center  ml-4 rounded-md border border-gray-300 shadow-sm px-8 py-2 bg-primary text-white font-medium hover:bg-opacity-90"
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
        </div>
      </div>


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

      {/* Details Modal */}
      <DetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        dayItems={selectedDayItems}
        onDelete={handleDelete}
        error={error}
        handleEdit={handleEdit}
      />

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onCreate={handleCreateEvent}
        onSuccess={() => {
          // Re-fetch updated events after successful creation
          setSuccessMessage("Event Added Successfully.");
          fetchEvents();
        }}
      />

      {/* Edit Event Modal */}
      {selectedEvent &&
        <EditEventModal
          isOpen={isEditEventModalOpen}
          onClose={closeEventEditModal}
          onSuccess={() => {
            // Fetch updated events after successful update
            setSuccessMessage("Event Updated Successfully.");
            fetchEvents();
          }}
          event={selectedEvent} // Pass the selectedEvent to be edited
        />
      }

      {/* Create Appointment Modal */}
      <CreateAppointmentModal
        isOpen={isAddApointmentModalOpen}
        onClose={() => setIsAddApointmentModalOpen(false)}
        onCreate={handleCreateAppointment}
        onSuccess={() => {
          // Fetch updated events after successful creation
          setSuccessMessage("Appointment Added Successfully.");
          fetchAppointments();
        }}
      />

      {/* Edit Appointment Modal */}
      {selectedAppointment &&
        <EditAppointmentModal
          isOpen={isEditAppointmentModalOpen}
          onClose={closeAppointmentEditModal}
          onSuccess={() => {
            // Fetch updated events after successful update
            setSuccessMessage("Appointment Updated Successfully.");
            fetchAppointments();
          }}
          appointment={selectedAppointment} // Pass the selectedEvent to be edited
        />
      }


    </>
  );
};

export default Calendar;
