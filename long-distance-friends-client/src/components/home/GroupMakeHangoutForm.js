import React, { useState } from "react";
import WindowPicker from "../common/WindowPicker";
import AvailabilityPicker from "../common/AvailabilityPicker";
import AvailabilityDisplay from "../common/AvailabilityDisplay";
import meetingsService from "../../services/meetingsService";
import "flatpickr/dist/themes/airbnb.css";

const GroupMakeHangoutForm = ({ user, setMakeInvite }) => {
  const [range, setRange] = useState({});
  const [rangeSelected, setRangeSelected] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [pickerStatus, setPickerStatus] = useState(true);

  const handleHangoutSubmit = async (event) => {
    event.preventDefault();

    // Format host availability in UTC in a time util function
    // Send meeting creation and host availability to server
    const res = meetingsService.createMeeting();

    // Update user with meeting creation message
  };

  const handleHostBooking = async () => {
    
  };

  return (
    <div className="rounded-[1rem] p-6">
      <form className="flex flex-col" onSubmit={handleHangoutSubmit}>
        <div className="flex flex-col justify-items-center items-center">
          <div className="flex flex-col p-6">
            <h4>
              Choose hangout window:
            </h4>
            <span>Your Timezone:</span>
            <span>{user.timezone}</span>
            <span>UTC</span>
            <WindowPicker
              user={user}
              setRange={setRange}
              setRangeSelected={setRangeSelected}
            />
          </div>

          {
            (rangeSelected && pickerStatus) &&
            <AvailabilityPicker
              range={range}
              availability={availability}
              setAvailability={setAvailability}
              setPickerStatus={setPickerStatus}
            />
          }
          {
            (rangeSelected && !pickerStatus) &&
            <AvailabilityDisplay
              availability={availability}
              setAvailability={setAvailability}
              setPickerStatus={setPickerStatus}
            />
          }

        </div>
        <div>
          <button
            className="btn"
            disabled={availability.length > 0 ? false : true }
            onClick={() => handleHangoutSubmit()}>
            Make Hangout
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