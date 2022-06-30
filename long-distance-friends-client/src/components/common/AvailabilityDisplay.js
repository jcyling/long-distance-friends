import React from "react";
import { FiPlus } from "react-icons/fi";

const AvailabilityDisplay = ({ availability, setAvailability }) => {
  return (
    <div className="bg-gray-100 rounded-[1rem] w-full p-6">
      <h4>
        Your Availability
      </h4>
      <h4>Dates</h4>
      <p>
        {availability.map( (item, index) => {
          return Object.values(item).map((arr, index) => {
            console.log(arr)
          });
        }
          
        )}
      </p>
      <div className="btn flex justify-center">
        <FiPlus /> <span> Add</span>
      </div>
    </div>
  );
};

export default AvailabilityDisplay;