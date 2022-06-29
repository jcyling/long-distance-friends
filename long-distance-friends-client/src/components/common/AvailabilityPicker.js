import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import TimePicker from "./TimePicker";

const AvailabilityPicker = ({ range }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleAvailableDates = (dates) => {
    console.log(dates);
    // Convert dates chosen to UTC with timezone
    // Set as available dates
    setAvailableDates(dates);
  };

  return (
    <div className="flex w-full p-6 bg-amber-100 rounded-[1rem]">
      <div>
        <h4>
          Select availability:
        </h4>
        {/* Date picker corresponding to time picked */}
        <Flatpickr
          value={availableDates}
          onChange={(dates) => handleAvailableDates(dates)}
          className="invisible"
          options={{
            inline: true,
            mode: "multiple",
            minDate: range.startDate,
            maxDate: range.endDate,
          }}
        />
      </div>

      <div>
        {/* Time picker corresponding to dates picked */}
        <TimePicker
          availableTimes={availableTimes}
          setAvailableTimes={setAvailableTimes}
        />
      </div>

    </div>
  );
};

export default AvailabilityPicker;