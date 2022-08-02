import React, { useState, useEffect } from "react";
import TimeSlotButton from "../common/TimeSlotButton";
import { createTimeIntevals } from "../../utils/TimeUtils";

const RsvpTimePicker = ({
  setAvailableTimesInput,
  availableDateInput,
  bookings
}) => {
  const [activeButtons, setActiveButtons] = useState([]);
  const [bookedTimeslots, setBookedTimeslots] = useState([]);

  const startTime = "00:00";
  const endTime = "23:59";
  const inteval = "00:30";

  useEffect(() => {

    // Retrieve booked timeslots in each booking
    setBookedTimeslots([]);

    bookings.forEach(booking => {
      if (availableDateInput in booking.availability) {
        let bookedSlots = booking.availability[availableDateInput];
        setBookedTimeslots(prev => prev.concat(bookedSlots));
      }
    });

    setActiveButtons([]);
  }, [availableDateInput, bookings]);

  const timeslotList = createTimeIntevals(startTime, endTime, inteval);

  const handleSlotPick = (event, slot) => {
    event.preventDefault();
    if (!activeButtons.includes(slot)) {
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
      ? activeButtonStyle :
      bookedTimeslots.includes(slot)
        ? bookedButtonStyle : null;
  };

  const activeButtonStyle = {
    backgroundColor: "#4f99ff",
    color: "white"
  };

  const bookedButtonStyle = {
    backgroundColor: "#10B981",
    color: "white"
  };

  return (
    <div className="flex flex-col px-2">
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
            return <TimeSlotButton key={slot} slot={slot} styleCheck={styleCheck} handleSlotPick={handleSlotPick} />;
          }
        })}
        <div className="bg-gray-100 p-2 rounded-md shadow-md basis-full">Afternoon</div>
        {timeslotList.map((slot) => {
          if (slot > "12:00" && slot <= "18:00") {
            return <TimeSlotButton key={slot} slot={slot} styleCheck={styleCheck} handleSlotPick={handleSlotPick} />;
          }
        })}
        <div className="bg-gray-100 p-2 rounded-md shadow-md basis-full">Evening</div>
        {timeslotList.map((slot) => {
          if (slot > "18:00" && slot <= "24:00") {
            return <TimeSlotButton key={slot} slot={slot} styleCheck={styleCheck} handleSlotPick={handleSlotPick} />;
          }
        })}
      </div>
    </div>
  );
};

export default RsvpTimePicker;