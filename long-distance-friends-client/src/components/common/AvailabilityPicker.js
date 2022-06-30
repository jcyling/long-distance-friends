import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import TimePicker from "./TimePicker";

const AvailabilityPicker = ({ range, availability, setAvailability }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleDatePick = (date) => {
    setAvailableDates(availableDates.concat(date));
  };

  const handleSlotSubmit = () => {
    if (availableDates.length > 0 && availableTimes.length > 0) {
      let newSlot = {
        date: availableDates,
        time: availableTimes
      };
      setAvailability(availability.concat(newSlot));

    }
    else {
      // Return message that date or time must be selected
    }
  };

  return (
    <div className="w-full p-6 bg-amber-100 rounded-[1rem]">
      <div className="flex">
        <div>
          <h4>
            Select availability
          </h4>
          {/* Date picker corresponding to time picked */}
          <Flatpickr
            onChange={(browserDates, dateStr) => handleDatePick(dateStr)}
            className="invisible"
            options={{
              inline: true,
              mode: "multiple",
              minDate: range.startDate,
              maxDate: range.endDate,
            }}
          />
        </div>

        {/* Time picker corresponding to dates picked */}
        <div>
          <TimePicker
            availableTimes={availableTimes}
            setAvailableTimes={setAvailableTimes}
          />
        </div>
      </div>

      <button
        className="btn mt-2"
        onClick={() => handleSlotSubmit()}>
        Add Availability
      </button>
    </div>

  );
};

export default AvailabilityPicker;