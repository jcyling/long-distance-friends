import React, { useState } from "react";
import "flatpickr/dist/themes/airbnb.css";
import WindowPicker from "../common/WindowPicker";
import AvailabilityPicker from "../common/AvailabilityPicker";

const GroupMakeHangoutForm = ({ user, setMakeInvite }) => {
  const [range, setRange] = useState({});
  const [rangeSelected, setRangeSelected] = useState(false);
  // const [availability, setAvailability] = useState({});

  const handleHangoutSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bg-gray-200 rounded-[1rem] p-6">
      <form className="flex flex-col" onSubmit={() => handleHangoutSubmit()}>

        <div className="flex flex-col justify-items-center items-center">
          <div className="flex flex-col p-6">
            <h4>
              Choose hangout window:
            </h4>
            <span>
              Your Timezone:
            </span>
            <span>
              {user.timezone}
            </span>
            <span >
              UTC
            </span>
            <WindowPicker
              user={user}
              setRange={setRange}
              setRangeSelected={setRangeSelected}
            />
          </div>

          {
            rangeSelected &&
            <AvailabilityPicker
              range={range}
              // availability={availability}
              // setAvailability={setAvailability}
            />
          }

        </div>
        <div>
          <button className="btn">
            Schedule
          </button>
          <button
            className="btn ml-auto"
            type="button"
            onClick={() => setMakeInvite(false)}>
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default GroupMakeHangoutForm;