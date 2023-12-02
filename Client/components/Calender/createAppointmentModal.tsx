import React, { useEffect, useState } from 'react';
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
import { getClasses } from '@/services/classService';
import { getApplications } from '@/services/applicationsService';
import { Class } from '@/types/class';
import { Application } from '@/types/application';
import ErrorAlert from '@/components/ErrorAlert';
import { AxiosError } from 'axios';
import { FormControl, InputLabel } from '@mui/material';
import { getAvailabbleSlots } from '@/services/appointmentService';

interface CreateAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newAppointment: any) => Promise<void>; // Now onCreate returns a Promise
  onSuccess: () => void; // Callback for success in the parent component
}

const CreateAppointmentModal: React.FC<CreateAppointmentModalProps> = ({ isOpen, onClose, onCreate, onSuccess }) => {
  const [applicationsList, setApplicationsList] = useState<Application[]>([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    date: new Date(),
    time: "",
    application_id: 0,
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
    console.log("use effect triggered")
    setError("");
    setTimeSlots([]);
    setNewAppointment({ ...newAppointment, time: "" });
    async function loadSlots() {
      try {
        const formattedDate = newAppointment.date.toISOString().substring(0, 10);
        const slots = await getAvailabbleSlots(formattedDate);
        setTimeSlots(slots.availableSlots);
      }
      catch (error: any) {
        if (error.response) {
          setError(error.response.data.message);
        }
        else if (error.message) {
          setError(error.message);
        }
      }
    }

    loadSlots();
    console.log(timeSlots)
  }, [newAppointment.date])

  useEffect(() => {
    console.log("Updated timeSlots:", timeSlots);

    // Set the initial value of time based on whether timeSlots is empty or not
    if (timeSlots.length > 0) {
      setNewAppointment({ ...newAppointment, time: timeSlots[0] });
    }
    else {
      setNewAppointment({ ...newAppointment, time: "" });
    }
  }, [timeSlots]);

  const handleCreateAppointment = async () => {
    try {
      // Reset create appointment error on each creation attempt
      setError(null);

      // Call the onCreate function provided by the parent
      await onCreate(newAppointment);

      // If creation is successful, trigger the onSuccess callback
      onSuccess();
      onClose();
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.error('Error creating appointment:', error.response.data.message);
      // If there's an error, set the error in the CreateAppointmentModal
      setError(error.response.data.message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create New Appointment</DialogTitle>
      <DialogContent>
        {error && <ErrorAlert message={error} />}
        {/* Form Fields */}
        <TextField
          label="Date"
          type="date"
          value={newAppointment.date?.toISOString().split('T')[0]}
          // onChange={handleDateChange}          
          onChange={(e) => setNewAppointment({ ...newAppointment, date: new Date(e.target.value) })}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="time-label">Time</InputLabel>
          <Select
            labelId="time-label"
            label="Time"
            value={newAppointment.time}
            onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value as string })}
          >
            {Array.isArray(timeSlots) && timeSlots.map((slot, key) => (
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
            value={newAppointment.application_id}
            onChange={(e) => setNewAppointment({ ...newAppointment, application_id: e.target.value as number })}
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
        <Button onClick={handleCreateAppointment}>Create Appointment</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAppointmentModal;
