import React, { useState } from "react";
import WindowPicker from "../common/WindowPicker";
import AvailabilityPicker from "../common/AvailabilityPicker";
import AvailabilityDisplay from "../common/AvailabilityDisplay";
import meetingService from "../../services/meetingService";
import bookingService from "../../services/bookingService";
import "flatpickr/dist/themes/airbnb.css";

const GroupMakeHangoutForm = ({ user, group, setMakeInvite }) => {
  const [range, setRange] = useState({});
  const [rangeSelected, setRangeSelected] = useState(false);
  const [pickerStatus, setPickerStatus] = useState(true);
  const [availableDateTime, setAvailableDateTime] = useState([]);

  const handleHangoutSubmit = async (event) => {
    event.preventDefault();

    // Construct meeting object
    const newMeeting = {
      groupId: group.id,
      window: range,
      creator: user.id
    };

    // Send meeting creation
    try {
      const meetingCreated = await meetingService.createMeeting(newMeeting, user.token);
      console.log(meetingCreated);
    }
    catch (error) {
      console.log(error);
    }

    const hostRsvp = await handleHostAvailabilitySubmit();
    // Notify user of hangout creation
  };

  const handleHostAvailabilitySubmit = async () => {

    // Combine dates and times from availability
    // Format in UTCZ
    // Send host availability to server
    const booking = bookingService.createBooking();

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
              availableDateTime={availableDateTime}
              setAvailableDateTime={setAvailableDateTime}
              setPickerStatus={setPickerStatus}
            />
          }
          {
            (rangeSelected && !pickerStatus) &&
            <AvailabilityDisplay
              availableDateTime={availableDateTime}
              setAvailableDateTime={setAvailableDateTime}
              setPickerStatus={setPickerStatus}
            />
          }

        </div>
        <div>
          <button
            className="btn"
            disabled={(availableDateTime.length > 0 && pickerStatus === false) ? false : true}
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