import React from "react";

const TimeSlotButton = ({
  slot, 
  index,
  styleCheck,
  handleSlotPick
}) => {
  return (
    <div
      className="p-2 font-light rounded-md shadow-md bg-white hover:bg-gray-200 grow-0"
      style={styleCheck(slot)}
      onClick={() => handleSlotPick(event, slot, index)}
      key={index}>
      {slot}
    </div>
  );
};

export default TimeSlotButton;