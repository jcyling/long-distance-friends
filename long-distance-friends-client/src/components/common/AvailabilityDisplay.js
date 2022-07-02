import React from "react";
import { FiPlus } from "react-icons/fi";

const AvailabilityDisplay = ({ availability, setAvailability, setPickerStatus }) => {
  return (
    <div className="rounded-[1rem] w-full p-6 text-left">
      <h4>
        Your Availability
      </h4>
      <div className="flex flex-row">
        <div className="flex flex-col w-full mb-6">
          {availability.map((entry, index) => {
            return (
              <div className="p-3 w-full bg-white rounded-md border" key={index}>
                <div>
                  <div>
                    <span className="pr-2">Dates</span>
                    {entry.date.map(date =>
                      <span
                        key={date}
                        className="py-1 px-1 font-light text-sm"
                      >
                        {date}
                      </span>
                    )}
                  </div>
                  <span className="pr-2">Times</span>
                  {entry.time.map(time =>
                    <span
                      key={time}
                      className="py-1 px-1 font-light text-sm"
                    >
                      {time}
                    </span>
                  )}

                </div>
                <button
                  className="float-right text-sm"
                  onClick={() => setAvailability(availability.filter((item, i) => i !== index))}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="btn bg-gray-100 hover:bg-gray-300 flex justify-center"
        onClick={() => setPickerStatus(true)}
      >
        <FiPlus /> <span> Add More Availability</span>
      </div>
    </div>
  );
};

export default AvailabilityDisplay;