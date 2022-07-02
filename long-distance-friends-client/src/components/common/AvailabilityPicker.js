import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import TimePicker from "./TimePicker";

const AvailabilityPicker = ({ range, availability, setAvailability, setPickerStatus }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleDatePick = (dateList) => {
    let dateArr = dateList.split(", ").sort();
    setAvailableDates(dateArr);
  };

  const handleSlotSubmit = () => {
    if (availableDates.length > 0 && availableTimes.length > 0) {
      let newSlot = {
        date: availableDates,
        time: availableTimes
      };
      setAvailability(availability.concat(newSlot));
      setPickerStatus(false);
    }
    else {
      // Return message that date or time must be selected
    }
  };

  return (
    <div className="w-full p-6 mb-6 border rounded-[1rem]">
      <div className="flex text-left gap-3">
        <div>
          <h4>
            Select dates
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
      <div className="flex mt-6 flex-row justify-center gap-6">
        <button
          className="btn"
          onClick={() => handleSlotSubmit()}>
          Add Availability
        </button>
        <button
          className="btn bg-gray-200"
          onClick={() => setPickerStatus(false)}>
          Chosen Slots
        </button>

      </div>
    </div>

  );
};

export default AvailabilityPicker;