'use client'
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
import { Class } from '@/types/class';
import { FormControl, InputLabel } from '@mui/material';
import ErrorAlert from '@/components/ErrorAlert';
import { createEvent } from '@/services/eventsService';
import { AxiosError } from 'axios';

interface CreateEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (newEvent: any) => Promise<void>; // Now onCreate returns a Promise
    onSuccess: () => void; // Callback for success in the parent component
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose, onCreate, onSuccess }) => {
    const [classesList, setClassesList] = useState<Class[]>([]);
    const [newEvent, setNewEvent] = useState({
        event_name: '',
        event_date: new Date(),
        notes: '',
        notify_parents: false,
        notify_staff: false,
        public_event: true,
        classes: [],
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchClasses() {
            try {
                const classList = await getClasses();
                setClassesList(classList);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        }

        fetchClasses();
    }, []);

    function clearFields() {
        setNewEvent({
            event_name: '',
            event_date: new Date(),
            notes: '',
            notify_parents: false,
            notify_staff: false,
            public_event: true,
            classes: [],
        });
    };

    const handleCreateEvent = async () => {
        try {
            // Reset create event error on each creation attempt
            setError(null);

            // Call the onCreate function provided by the parent
            await onCreate(newEvent);

            // If creation is successful, trigger the onSuccess callback
            clearFields();
            onSuccess();
            onClose();
        } catch (error: any) {
            const axiosError = error as AxiosError;
            console.error('Error creating event:', error.response.data.message);
            // If there's an error, set the error in the CreateEventModal
            setError(error.response.data.message);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogContent>
                {error && <ErrorAlert message={error} />}
                {/* Form Fields */}
                <TextField
                    label="Event Name"
                    value={newEvent.event_name}
                    onChange={(e) => setNewEvent({ ...newEvent, event_name: e.target.value })}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Event Date"
                    type="date"
                    value={newEvent.event_date?.toISOString().split('T')[0]}
                    onChange={(e) => setNewEvent({ ...newEvent, event_date: new Date(e.target.value) })}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Notes"
                    multiline
                    rows={4}
                    value={newEvent.notes}
                    onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                    fullWidth
                    margin="normal"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={newEvent.notify_parents}
                            onChange={(e) => setNewEvent({ ...newEvent, notify_parents: e.target.checked })}
                        />
                    }
                    label="Notify Parents"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={newEvent.notify_staff}
                            onChange={(e) => setNewEvent({ ...newEvent, notify_staff: e.target.checked })}
                        />
                    }
                    label="Notify Staff"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={newEvent.public_event}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                setNewEvent({
                                    ...newEvent,
                                    public_event: isChecked,
                                    classes: isChecked ? [] : newEvent.classes, // Reset classes to [] when public_event is true
                                });
                            }} />
                    }
                    label="Public Event"
                />
                {!newEvent.public_event && (
                    <FormControl fullWidth>
                        <InputLabel id="classes-label">Classes</InputLabel>
                        <Select
                            labelId="classes-label"
                            label="Classes"
                            multiple
                            value={newEvent.classes}
                            onChange={(e) => setNewEvent({ ...newEvent, classes: e.target.value as [] })}
                        >
                            {classesList.map((classItem) => (
                                <MenuItem key={classItem.id} value={classItem.id}>
                                    {classItem.class_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCreateEvent}>Create Event</Button>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateEventModal;
