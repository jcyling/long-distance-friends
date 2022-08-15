import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import GroupHostTimePicker from "./GroupHostTimePicker";

const GroupHostAvailabilityPicker = ({ range, setPickerStatus, setAvailableDateTime }) => {
  const [availableDatesInput, setAvailableDatesInput] = useState([]);
  const [availableTimesInput, setAvailableTimesInput] = useState([]);

  const handleDatePick = (dateList) => {
    let dateArr = dateList.split(", ").sort();
    setAvailableDatesInput(dateArr);
  };

  const handleSlotSubmit = () => {
    event.preventDefault();
    if (availableDatesInput.length > 0 && availableTimesInput.length > 0) {

      // TODO: Prevent same datetime slots to be picked
      let availabilityArray = availableDatesInput.map(date => {
        return {
          date: date,
          time: [...availableTimesInput]
        };
      });
      setAvailableDateTime(prevInput => prevInput.concat(availabilityArray).sort());
      setPickerStatus(false);
    }
  };

  return (
    <div className="w-full p-6 mb-6 border rounded-[1rem]">
      <div className="flex text-left gap-3 sm:flex-wrap md:nowrap">
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
          <GroupHostTimePicker
            setAvailableTimesInput={setAvailableTimesInput}
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
          className="btn bg-gray-200 text-gray-900 hover:bg-gray-300"
          onClick={() => setPickerStatus(false)}>
          Chosen Slots
        </button>
      </div>
    </div>

  );
};

export default GroupHostAvailabilityPicker;