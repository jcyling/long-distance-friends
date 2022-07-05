import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WindowPicker from "../common/WindowPicker";
import AvailabilityPicker from "../common/AvailabilityPicker";
import AvailabilityDisplay from "../common/AvailabilityDisplay";
import meetingService from "../../services/meetingService";
import bookingService from "../../services/bookingService";
import "flatpickr/dist/themes/airbnb.css";
import { convertDateTimeObjToUtc } from "../common/TimeUtils";

const GroupMakeHangoutForm = ({ user, group, setMakeInvite }) => {
  const useNav = useNavigate();
  const [range, setRange] = useState({});
  const [rangeSelected, setRangeSelected] = useState(false);
  const [pickerStatus, setPickerStatus] = useState(true);
  const [availableDateTime, setAvailableDateTime] = useState([]);

  const handleHangoutSubmit = async (event) => {
    event.preventDefault();

    // Construct meeting object
    let newMeeting = {
      groupId: group.id,
      window: range,
      creator: user.id
    };

    // Send meeting creation
    try {
      const meetingCreated = await meetingService.createMeeting(newMeeting, user.token);
      console.log(meetingCreated);

      const hostBookingCreated = await handleHostAvailabilitySubmit(meetingCreated);

      // Notify user of successful hangout creation
      console.log(`Hangout created between ${range[0]} and ${range[1]}`);

      // Give a link for friends to RSVP
      // Redirect users to home
      useNav("/home");

    }
    catch (error) {
      console.log(error);
    }
  };

  const handleHostAvailabilitySubmit = async (meetingCreated) => {
    let userIana = user.timezone;

    // Format availableDateTime to ISO8061
    let availabilityArray = [];
    availableDateTime.forEach(item => {
      let datetime = convertDateTimeObjToUtc(item, userIana);
      availabilityArray = availabilityArray.concat(datetime);
    });

    let newBooking = {
      groupId: group.id,
      meetingId: meetingCreated.id,
      availability: availabilityArray,
      booker: user.id,
      bookerModel: "User"
    };

    // Create host booking on server
    try {
      const bookingCreated = await bookingService.createBooking(newBooking, user.token);
      return bookingCreated;
    }
    catch (error) {
      console.log(error);
    }
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
            onClick={() => handleHangoutSubmit(event)}>
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