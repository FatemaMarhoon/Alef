// EventDetailsModal.tsx
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import ErrorAlert from '@/components/ErrorAlert';
import { MyEvent } from '@/types/event';
import { Appointment } from '@/types/appointment';
import { Delete, Edit } from '@mui/icons-material';
interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayItems: { eventsForDay: MyEvent[], appointmentsForDay: Appointment[] };
  onDelete: (appointment?: Appointment, event?: MyEvent) => void;
  // openEditModal: (id: number) => void;
  handleEdit: (appointment?: Appointment, event?: MyEvent) => void;
  error: any;
}

const DetailsModal: React.FC<DetailsModalProps> = ({
  isOpen,
  onClose,
  dayItems,
  onDelete,
  handleEdit,
  error,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
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
    const firstItem = dayItems.eventsForDay.at(0) || dayItems.appointmentsForDay.at(0);
    if (firstItem && 'date' in firstItem) {
      let tempDate = new Date(firstItem.date);
      setSelectedDate(formatDate(tempDate));
    }
    else if (firstItem && 'event_date' in firstItem) {
      let tempDate = new Date(firstItem.event_date);
      setSelectedDate(formatDate(tempDate));
    }

    console.log("Appointments: ", dayItems.appointmentsForDay)
  });

  return (
    <Dialog open={isOpen} onClose={onClose} className="modal ">
      <DialogContent className="modal-body dark:bg-boxdark dark:text-white">
        {error && <ErrorAlert message={error} />}
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">{selectedDate}</h3>
        </div>
        {dayItems.eventsForDay.length > 0 && (
          <section className="dark:bg-gray-800 dark:text-gray-100">
            <div className="container max-w-5xl px-4 py-12 mx-auto">
              <div className="grid gap-4 mx-4 sm:grid-cols-12">
                <div className="col-span-12 sm:col-span-3">
                  <h3 className="text-xl font-semibold">Events</h3>
                </div>
                <div className="col-span-12 px-6 space-y-6 sm:col-span-9">
                  {dayItems.eventsForDay.map((event) => (
                    <div key={event.id} className="relative col-span-12 space-y-12 grid grid-cols-12 items-start">
                      <div className="col-span-8">
                        <div className="flex flex-col">
                          <h3 className="text-l font-semibold tracki">{event.event_name}</h3>
                          <time className="text-xs tracki uppercase dark:text-gray-400">
                            {event.public_event ? "Public Event" : "For Classes: "}
                            {event.Classes?.map((classItem, index) => (
                              <span key={index}>{classItem.class_name}, </span>
                            ))}
                          </time>
                          <p className="mt-1">{event.notes}</p>
                        </div>
                      </div>
                      <div className="col-span-4 flex items-start justify-end">
                        <button onClick={() => handleEdit(undefined, event)}>
                          <Edit />
                        </button>
                        <button className="text-red-500" onClick={() => onDelete(undefined, event)}>
                          <Delete color="error" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}



{dayItems.appointmentsForDay.length > 0 && (
  <section className="dark:bg-gray-800 dark:text-gray-100">
    <div className="container max-w-5xl px-4 py-12 mx-auto">
      <div className="grid gap-4 mx-4 sm:grid-cols-12">
        <div className="col-span-12 sm:col-span-3">
          <h3 className="text-xl font-semibold">Appointments</h3>
        </div>
        <div className="col-span-12 px-6 space-y-6 sm:col-span-9">
          {dayItems.appointmentsForDay.map((appointment) => (
            <div key={appointment.id} className="relative col-span-12 space-y-12 grid grid-cols-12 items-start">
              <div className="col-span-8">
                <div className="flex flex-col">
                  <h3 className="text-l font-semibold tracki">Evaluation Appointment</h3>
                  <time className="text-xs tracki uppercase dark:text-gray-400">
                    {appointment.time.slice(0, 5) + " AM"}
                  </time>
                  <p className="mt-1">For Applicant: {appointment.Application?.student_name}</p>
                </div>
              </div>
              <div className="col-span-4 flex items-start justify-end">
                <button onClick={() => handleEdit(appointment, undefined)}>
                  <Edit />
                </button>
                <button onClick={() => onDelete(appointment, undefined)}>
                  <Delete color="error" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)}

      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
