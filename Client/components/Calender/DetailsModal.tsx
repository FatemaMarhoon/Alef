// EventDetailsModal.tsx
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import ErrorAlert from '@/components/ErrorAlert';
import { MyEvent } from '@/types/event';
import { Appointment } from '@/types/appointment';

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayItems: { eventsForDay: MyEvent[], appointmentsForDay: Appointment[] };
  onDelete: (id: number) => void;
  // openEditModal: (id: number) => void;
  handleEdit: (event?:MyEvent, appointment?:Appointment) => void;
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
  });
  return (
    <Dialog open={isOpen} onClose={onClose} className="modal">
      <DialogContent className="modal-body">
        {error && <ErrorAlert message={error} />}
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">{selectedDate}</h3>
        </div>
        {/* Events Section */}
        {dayItems.eventsForDay.length > 0 &&
          <div>
            <h4 className="text-sm font-medium leading-6 text-gray-900 mb-4">Events</h4>
            {dayItems.eventsForDay.filter(item => 'event_name' in item && 'event_date' in item).map(event => (
              <div key={event.id} className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Event Title
                    </dt>
                    <button onClick={() => handleEdit(event)}>
                      Edit
                    </button>
                    <button onClick={() => onDelete(event.id)}>
                      Delete
                    </button>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {event.event_name}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        }


        {/* Appointments Section */}
        {dayItems.appointmentsForDay.length > 0 &&
          <div>
            <h4 className="text-sm font-medium leading-6 text-gray-900 mb-4">Appointments</h4>
            {dayItems.appointmentsForDay.filter(item => !('event_name' in item && 'event_date' in item)).map(appointment => (
              <div key={appointment.id} className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Appointment Title
                    </dt>
                    <button onClick={() => handleEdit(undefined,appointment)}>
                      Edit
                    </button>
                    <button onClick={() => onDelete(appointment.id)}>
                      Delete
                    </button>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {'Evaluation Appointment'}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        }

      </DialogContent>
      {/* ... */}
    </Dialog>

  );
};

export default DetailsModal;
