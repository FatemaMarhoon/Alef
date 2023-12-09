// EditEventModal.tsx
import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { MyEvent } from '@/types/event';
import { editEvent } from '@/services/eventsService'; // Import your editEvent function
import { getClasses } from '@/services/classService';
import { Class } from '@/types/class';
import { DialogTitle, TextField, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface FormData {
    event_name: string;
    event_date: Date;
    notes: string;
    notify_parents: boolean;
    notify_staff: boolean;
    public_event: boolean;
    Classes: number[] | undefined;
}

interface EditEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    event: MyEvent; // Pass the event to be edited
}

const EditEventModal: React.FC<EditEventModalProps> = ({ isOpen, onClose, onSuccess, event }) => {
    const [formData, setFormData] = useState<FormData>({
        event_name: event.event_name,
        event_date: event.event_date,
        notes: event.notes,
        notify_parents: event.notify_parents,
        notify_staff: event.notify_staff,
        public_event: event.public_event,
        Classes: event.Classes ? event.Classes.map((classItem) => classItem.id) : [],
    });
    const [classesList, setClassesList] = useState<Class[]>([]);
    const [classIds, setClassIds] = useState<number[]>(formData.Classes ?? []);
    const [isoDateString, setISODate] = useState("");
    useEffect(() => {
        setFormData({
            event_name: event.event_name,
            event_date: new Date(event.event_date),
            notes: event.notes,
            notify_parents: event.notify_parents,
            notify_staff: event.notify_staff,
            public_event: event.public_event,
            Classes: event.Classes ? event.Classes.map((classItem) => classItem.id) : [],
        });
        const eventDate = new Date(formData.event_date);
        const isoDate = eventDate.toISOString().slice(0, 10);
        setISODate(isoDate);

        setClassIds(event.Classes ? event.Classes.map((classItem) => classItem.id) : []);
        async function fetchClasses() {
            try {
                const classList = await getClasses();
                setClassesList(classList);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        }
        fetchClasses();
    }, [event]);

    const handleEditEvent = async () => {
        try {
            console.log(formData);
            //if sets to public, make sure to clear classes 
            if (formData.public_event == true) {
                console.log("SETTING CLASSES TO EMPTY")
                setClassIds([]);
            }
            const response = await editEvent(
                event.id,
                formData.event_name,
                formData.event_date,
                formData.notes,
                formData.notify_parents,
                formData.notify_staff,
                formData.public_event,
                classIds
            );

            if (response.status === 200 || response.status === 201) {
                onSuccess();
                onClose();
            } else {
                throw Error(response.data.message);
            }
        } catch (error) {
            console.error('Error editing event:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | unknown>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement & {
            name: string;
            value: string;
            type: string;
            checked?: boolean;
        };

        if (name === 'event_date') {
            // Handle date input separately
            setFormData((prevFormData) => ({
                ...prevFormData,
                event_date: new Date(value),
            }));
            setISODate(value);
        } else if (name === 'Classes') {
            // Handle multiselect for classes
            const list = value as unknown as [];
            setClassIds(list);
            console.log("selectedClassIds:", list);
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="modal">
            <DialogTitle>Edit Event</DialogTitle>
            <DialogContent className="modal-body">
                <form onSubmit={(e) => e.preventDefault()}>
                    <TextField
                        label="Event Name"
                        name="event_name"
                        value={formData.event_name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Event Date"
                        type="date"
                        name="event_date"
                        value={isoDateString}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        label="Notes"
                        multiline
                        name="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.notify_parents}
                                onChange={handleChange}
                                name="notify_parents"
                            />
                        }
                        label="Notify Parents"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.notify_staff}
                                onChange={handleChange}
                                name="notify_staff"
                            />
                        }
                        label="Notify Staff"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.public_event}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setFormData({
                                        ...formData,
                                        public_event: isChecked,
                                        Classes: isChecked ? [] : formData.Classes,
                                    });
                                }}
                                name="public_event"
                            />
                        }
                        label="Public Event"
                    />
                    {!formData.public_event && (
                        <FormControl fullWidth>
                            <InputLabel id="classes-label">Classes</InputLabel>
                            <Select
                                labelId="classes-label"
                                label="Classes"
                                multiple
                                value={classIds}
                                onChange={() => handleChange}
                                name="Classes"
                            >
                                {classesList.map((classItem) => (
                                    <MenuItem key={classItem.id} value={classItem.id}>
                                        {classItem.class_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </form>
            </DialogContent>
            <DialogActions className="modal-footer">
                <Button onClick={onClose} className="modal-close-btn">
                    Close
                </Button>
                <Button onClick={handleEditEvent} className="modal-save-btn">
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );

};

export default EditEventModal;
