import React from "react";
import { createTimeIntevals } from "./TimeUtils";

const TimePicker = ({ availableTimes, setAvailableTimes }) => {
  const [activeButtons, setActiveButtons] = React.useState([]);

  const startTime = "00:00";
  const endTime = "23:59";
  const inteval = "00:30";

  const timeslotList = createTimeIntevals(startTime, endTime, inteval);

  const handleSlotPick = (slot, index) => {
    event.preventDefault();
    if (!activeButtons.includes(index)) {
      // Add button to active buttons
      setActiveButtons(activeButtons.concat(index));
      setAvailableTimes(availableTimes.concat(slot));
    }
    else {
      // Remove index from active buttons
      setActiveButtons(activeButtons.filter(item => item !== index));
      setAvailableTimes(availableTimes.filter(item => item !== slot));
    }
  };

  const handleSlotSubmit = () => {
    event.preventDefault();
  };

  const TimeSlotButton = ({slot, index}) => {
    return (
      <div
        className="p-2 font-light rounded-md shadow-md bg-white hover:bg-amber-300 grow-0"
        style={activeButtons.includes(index) ? activeButtonStyle : inactiveButtonStyle}
        onClick={() => handleSlotPick(slot, index)}
        key={index}>
        {slot}
      </div>
    );
  };

  const activeButtonStyle = {
    backgroundColor: "orange"
  };

  const inactiveButtonStyle = {
    backgroundColor: "white"
  };

  return (
    <div className="flex flex-col px-2">
      <h4 className="w-full">
        Select times:
      </h4>
      <div className="flex gap-3 flex-wrap flex-auto">
        <div className="p-2 rounded-md shadow-md basis-full">Early Morning</div>
        {timeslotList.map((slot, index) => {
          if (slot < "06:00") {
            return <TimeSlotButton key={index} slot={slot} index={index} />;
          }
        })}
        <div className="p-2 rounded-md shadow-md basis-full">Morning</div>
        {timeslotList.map((slot, index) => {
          if (slot > "06:00" && slot < "12:00") {
            return <TimeSlotButton key={index} slot={slot} index={index} />;
          }
        })}
        <div className="p-2 rounded-md shadow-md basis-full">Afternoon</div>
        {timeslotList.map((slot, index) => {
          if (slot > "12:00" && slot < "18:00") {
            return <TimeSlotButton key={index} slot={slot} index={index} />;
          }
        })}
        <div className="p-2 rounded-md shadow-md basis-full">Evening</div>
        {timeslotList.map((slot, index) => {
          if (slot > "18:00" && slot < "23:59") {
            return <TimeSlotButton key={index} slot={slot} index={index} />;
          }
        })}
      </div>
      <button
        className="btn mt-2"
        onClick={() => handleSlotSubmit}>
        Add Availability
      </button>

    </div>
  );
};

export default TimePicker;