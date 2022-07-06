import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import { convertUtcToDateRange } from "../common/TimeUtils";
import RsvpTimePicker from "./RsvpTimePicker";

const RsvpAvailabilityPicker = ({ range, handleDatePick, bookings, activeDate, userIana }) => {
  const [availableTimesInput, setAvailableTimesInput] = useState([]);
  const friendWindow = convertUtcToDateRange(range, userIana );

  return (
    <div>
      <div className="flex flex-row">
        <div>
          {/* Date picker corresponding to time picked */}
          <Flatpickr
            onChange={(browserDates, dateStr) => handleDatePick(dateStr)}
            className="invisible"
            options={{
              inline: true,
              minDate: friendWindow.startDate,
              maxDate: friendWindow.endDate,
            }}
          />
        </div>
        <div>
          {/* Time picker corresponding to dates picked */}
          <RsvpTimePicker
            availableTimesInput={availableTimesInput}
            setAvailableTimesInput={setAvailableTimesInput}
            activeDate={activeDate}
            bookings={bookings}
          />
        </div>
      </div>
      <button
        className="btn"
      >
        Add Availability
      </button>
    </div>

  );
};

export default RsvpAvailabilityPicker;