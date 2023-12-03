// EditAppointmentModal.tsx
import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getApplications } from '@/services/applicationsService';
import { Appointment } from '@/types/appointment';
import { Application } from '@/types/application';
import ErrorAlert from '@/components/ErrorAlert';
import { AxiosError } from 'axios';
import { FormControl, InputLabel } from '@mui/material';
import { editAppointment, getAvailabbleSlots } from '@/services/appointmentService';

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onEdit: (updatedAppointment: any) => Promise<void>; // Now onEdit returns a Promise
  onSuccess: () => void; // Callback for success in the parent component
  appointment: Appointment; // Pass the appointment to be edited
}

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({ isOpen, onClose, onSuccess, appointment }) => {
  const [applicationsList, setApplicationsList] = useState<Application[]>([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [editedAppointment, setEditedAppointment] = useState({
    date: new Date(appointment.date),
    time: appointment.time,
    application_id: appointment.application_id,
    // Add other appointment-specific properties here
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const applicationList = await getApplications();
        setApplicationsList(applicationList.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setError("");
    setTimeSlots([]);
    setEditedAppointment({
      ...editedAppointment,
      time: appointment.time,
    });
    async function loadSlots() {
      try {
        const formattedDate = editedAppointment.date.toISOString().substring(0, 10);
        const slots = await getAvailabbleSlots(formattedDate);
        setTimeSlots(slots.availableSlots);
      } catch (error: any) {
        if (error.response) {
          setError(error.response.data.message);
        } else if (error.message) {
          setError(error.message);
        }
      }
    }

    loadSlots();
  }, [editedAppointment.date]);

  useEffect(() => {
    if (timeSlots.length > 0) {
      setEditedAppointment({
        ...editedAppointment,
        time: timeSlots[0],
      });
    } else {
      setEditedAppointment({
        ...editedAppointment,
        time: "",
      });
    }
  }, [timeSlots]);

  const handleEditAppointment = async () => {
    try { 
      setError(null);
      const formattedDate = editedAppointment.date?.toISOString().split('T')[0];
      const response = await editAppointment(appointment.id,formattedDate,editedAppointment.time,editedAppointment.application_id);
    
      if (response.status === 200 || response.status === 201) {
        onSuccess();
        onClose();
    } else {
        throw Error(response.data.message);
    }
    } catch (error: any) {
      console.error('Error editing event:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Appointment</DialogTitle>
      <DialogContent>
        {error && <ErrorAlert message={error} />}
        {/* Form Fields */}
        <TextField
          label="Date"
          type="date"
          value={editedAppointment.date?.toISOString().split('T')[0]}
          onChange={(e: { target: { value: string | number | Date; }; }) => setEditedAppointment({ ...editedAppointment, date: new Date(e.target.value) })}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="time-label">Time</InputLabel>
          <Select
            labelId="time-label"
            label="Time"
            value={editedAppointment.time}
            onChange={(e) => setEditedAppointment({ ...editedAppointment, time: e.target.value as string })}
          >
            {Array.isArray(timeSlots) &&
              timeSlots.map((slot, key) => (
                <MenuItem key={slot} value={slot}>
                  {slot}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="application-label">For Applicant:</InputLabel>
          <Select
            labelId="application-label"
            label="Application"
            value={editedAppointment.application_id}
            onChange={(e) => setEditedAppointment({ ...editedAppointment, application_id: e.target.value as number })}
          >
            {applicationsList.map((application) => (
              <MenuItem key={application.id} value={application.id}>
                {application.student_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Add other appointment-specific fields here */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditAppointment}>Save Changes</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAppointmentModal;
