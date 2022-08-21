import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldWindowPicker from "../common/FieldWindowPicker";
import GroupHostAvailabilityPicker from "./GroupHostAvailabilityPicker";
import AvailabilityDisplay from "../common/AvailabilityDisplay";
import meetingService from "../../services/meetingService";
import bookingService from "../../services/bookingService";
import "flatpickr/dist/themes/airbnb.css";
import { convertDateTimeObjToUtc } from "../../utils/TimeUtils";

const GroupMakeHangoutForm = ({ user, group, setMakeInvite }) => {
  const useNav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [range, setRange] = useState({});
  const [rangeSelected, setRangeSelected] = useState(false);
  const [pickerStatus, setPickerStatus] = useState(true);
  const [availableDateTime, setAvailableDateTime] = useState([]);

  const handleHangoutSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Construct meeting object
    let newMeeting = {
      groupId: group.id,
      window: range,
      creator: user.id
    };

    // Send meeting creation
    try {
      const meetingCreated = await meetingService.createMeeting(newMeeting, user.token);
      const bookingCreated = await handleHostAvailabilitySubmit(meetingCreated);

      let message = {
        message: "Thanks! Send your friends this link to RSVP.",
        inviteUrl: `${process.env.REACT_APP_WEBURL}/rsvp/${meetingCreated.uid}`
      };

      useNav("/success", { state: message });
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleHostAvailabilitySubmit = async (meetingCreated) => {
    let userIana = user.timezone;

    if (!userIana) {
      // TODO: Implement error handling 
      return null;
    }

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

    try {
      const bookingCreated = await bookingService.createBooking(newBooking, user.token);
      return bookingCreated;
    }
    catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex mt-6">
        <div className="loader m-auto"></div>
      </div>
    );
  }
  else {
    return (
      <div className="rounded-[1rem]">
        <form className="flex flex-col" onSubmit={handleHangoutSubmit}>
          <div className="flex flex-col justify-items-center items-center">
            <div className="flex flex-col p-6">
              <h4>
                Choose hangout window:
              </h4>
              <span>Your Timezone:</span>
              <span>{user.timezone}</span>
              <span>UTC</span>
              <FieldWindowPicker
                user={user}
                setRange={setRange}
                setRangeSelected={setRangeSelected}
              />
            </div>

            {
              (rangeSelected && pickerStatus) &&
              <GroupHostAvailabilityPicker
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
              className="btn mr-3"
              disabled={(availableDateTime.length > 0 && pickerStatus === false) ? false : true}>
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
  }
};

export default GroupMakeHangoutForm;