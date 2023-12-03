import React, { useState } from 'react';

const AddDropdown: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAddEvent = () => {
    // Handle add event logic
    console.log('Add Event');
  };

  const handleAddAppointment = () => {
    // Handle add appointment logic
    console.log('Add Appointment');
  };

  return (
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
            <button onClick={handleAddEvent} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              Add Event
            </button>
            <button onClick={handleAddAppointment} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              Add Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDropdown;