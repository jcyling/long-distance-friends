import React from "react";
import { FiPlus } from "react-icons/fi";

const RsvpAvailabilityDisplay = ({ 
  setPickerStatus, 
  availableDateTime, 
  setAvailableDateTime 
}) => {
  
  const handleDeleteSlot = (date) => {
    event.preventDefault();
    setAvailableDateTime(prevInput => prevInput.filter(slot => slot.date !== date));
  };

  return (
    <div className="rounded-[1rem] w-full p-6 text-left">
      <h4>
        Your Availability
      </h4>
      <div className="flex flex-row">
        <div className="flex flex-row flex-wrap w-full mb-6 gap-3">
          {availableDateTime.map((item, index) => {
            return (
              <div className="p-3 w-1/3 bg-white rounded-md border" key={index}>
                <div>
                  <div>
                    <span className="pr-2">Date</span>
                    <span className="py-1 px-1 font-light text-sm">{item.date}</span>
                  </div>
                  <span className="pr-2">Times</span>
                  {item.time.map(time =>
                    <span
                      key={time}
                      className="py-1 px-1 font-light text-sm">
                      {time}
                    </span>
                  )}
                </div>
                <button
                  className="float-right text-sm"
                  onClick={() => handleDeleteSlot(item.date)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="btn flex justify-center"
        onClick={() => setPickerStatus(true)}
      >
        <FiPlus /> <span> Add More Availability</span>
      </div>
    </div>
  );
};

export default RsvpAvailabilityDisplay;