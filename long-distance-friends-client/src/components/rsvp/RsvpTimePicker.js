import React, { useState, useEffect } from "react";
import { createTimeIntevals } from "../common/TimeUtils";

const RsvpTimePicker = ({ availableTimesInput, setAvailableTimesInput, activeDate, bookings }) => {
  const [activeButtons, setActiveButtons] = useState([]);

  const startTime = "00:00";
  const endTime = "23:59";
  const inteval = "00:30";

  useEffect(() => {
    setActiveButtons([]);
  }, [activeDate]);

  const timeslotList = createTimeIntevals(startTime, endTime, inteval);

  const handleSlotPick = (event, slot, index) => {
    event.preventDefault();
    if (!activeButtons.includes(index)) {
      // Add button to active buttons
      setActiveButtons(activeButtons.concat(index));
      setAvailableTimesInput(availableTimesInput.concat(slot));
    }
    else {
      // Remove index from active buttons
      setActiveButtons(activeButtons.filter(item => item !== index));
      setAvailableTimesInput(availableTimesInput.filter(item => item !== slot));
    }
  };

  const TimeSlotButton = ({slot, index}) => {
    return (
      <div
        value={availableTimesInput}
        className="p-2 font-light rounded-md shadow-md bg-white hover:bg-amber-300 grow-0"
        style={activeButtons.includes(index) ? activeButtonStyle : inactiveButtonStyle}
        onClick={() => handleSlotPick(event, slot, index)}
        key={index}>
        {slot}
      </div>
    );
  };

  const activeButtonStyle = {
    backgroundColor: "#4f99ff",
    color: "white"
  };

  const bookedButonStyle = {
    backgroundColor: "green",
    color: "white"
  };

  const inactiveButtonStyle = {
    backgroundColor: "white"
  };

  return (
    <div className="flex flex-col px-2">
      <h4 className="w-full">
        Select available time on date
      </h4>
      <div className="flex gap-3 flex-wrap flex-auto">
        <div className="bg-gray-100 p-2 rounded-md shadow-md basis-full">Early Morning</div>
        {timeslotList.map((slot, index) => {
          if (slot < "06:00") {
            return <TimeSlotButton key={slot} slot={slot} index={index} />;
          }
        })}
        <div className="bg-gray-100 p-2 rounded-md shadow-md basis-full">Morning</div>
        {timeslotList.map((slot, index) => {
          if (slot > "06:00" && slot <= "12:00") {
            return <TimeSlotButton key={slot} slot={slot} index={index} />;
          }
        })}
        <div className="bg-gray-100 p-2 rounded-md shadow-md basis-full">Afternoon</div>
        {timeslotList.map((slot, index) => {
          if (slot > "12:00" && slot <= "18:00") {
            return <TimeSlotButton key={slot} slot={slot} index={index} />;
          }
        })}
        <div className="bg-gray-100 p-2 rounded-md shadow-md basis-full">Evening</div>
        {timeslotList.map((slot, index) => {
          if (slot > "18:00" && slot <= "24:00") {
            return <TimeSlotButton key={slot} slot={slot} index={index} />;
          }
        })}
      </div>
    </div>
  );
};

export default RsvpTimePicker;