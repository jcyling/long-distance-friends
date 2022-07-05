import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import TimePicker from "../common/TimePicker";

const RsvpAvailabilityPicker = ({ range }) => {
  const [availableDatesInput, setAvailableDatesInput] = useState([]);
  const [availableTimesInput, setAvailableTimesInput] = useState([]);

  const startDate = range.startDate;
  const endDate = range.endDate;

  const handleDatePick = (date) => {

  };

  return (
    <div className="flex flex-row">
      <div>
        <Flatpickr
          onChange={(browserDates, dateStr) => handleDatePick(dateStr)}
          className="invisible"
          options={{
            inline: true,
            minDate: startDate,
            maxDate: endDate,
          }}
        />
      </div>
      <div>
        <TimePicker />
      </div>
    </div>

  );
};

export default RsvpAvailabilityPicker;