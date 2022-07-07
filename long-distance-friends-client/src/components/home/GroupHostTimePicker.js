import React, { useState } from "react";
import TimeSlotButton from "../common/TimeSlotButton";
import { createTimeIntevals } from "../common/TimeUtils";

const GroupHostTimePicker = ({ setAvailableTimesInput }) => {
  const [activeButtons, setActiveButtons] = useState([]);

  const startTime = "00:00";
  const endTime = "23:59";
  const inteval = "00:30";

  const timeslotList = createTimeIntevals(startTime, endTime, inteval);

  const handleSlotPick = (event, slot, index) => {
    event.preventDefault();
    if (!activeButtons.includes(index)) {
      // Add button to active buttons
      setActiveButtons(activeButtons.concat(slot));
      setAvailableTimesInput(prev => prev.concat(slot));
    }
    else {
      // Remove from active buttons
      setActiveButtons(activeButtons.filter(item => item !== slot));
      setAvailableTimesInput(prev => prev.filter(item => item !== slot));
    }
  };

  const styleCheck = (slot) => {
    return activeButtons.includes(slot)
      ? activeButtonStyle : null;
  };

  const activeButtonStyle = {
    backgroundColor: "#4f99ff",
    color: "white"
  };

  return (
    <div className="flex flex-col px-2">
      <h4 className="w-full">
        Select available time on date
      </h4>
      <div className="flex gap-3 flex-wrap flex-auto">
        <div className="bg-gray-100 p-2 rounded-md shadow-md basis-full">Early Morning</div>
        {timeslotList.map((slot) => {
          if (slot < "06:00") {
            return <TimeSlotButton key={slot} slot={slot} styleCheck={styleCheck} handleSlotPick={handleSlotPick} />;
          }
        })}
        <div className="bg-gray-100 p-2 rounded-md shadow-md basis-full">Morning</div>
        {timeslotList.map((slot) => {
          if (slot > "06:00" && slot <= "12:00") {
            return <TimeSlotButton key={slot} slot={slot} styleCheck={styleCheck} handleSlotPick={handleSlotPick} />;          }
        })}
        <div className="bg-gray-100 p-2 rounded-md shadow-md basis-full">Afternoon</div>
        {timeslotList.map((slot) => {
          if (slot > "12:00" && slot <= "18:00") {
            return <TimeSlotButton key={slot} slot={slot} styleCheck={styleCheck} handleSlotPick={handleSlotPick} />;          }
        })}
        <div className="bg-gray-100 p-2 rounded-md shadow-md basis-full">Evening</div>
        {timeslotList.map((slot) => {
          if (slot > "18:00" && slot <= "24:00") {
            return <TimeSlotButton key={slot} slot={slot} styleCheck={styleCheck} handleSlotPick={handleSlotPick} />;          }
        })}
      </div>
    </div>
  );
};

export default GroupHostTimePicker;