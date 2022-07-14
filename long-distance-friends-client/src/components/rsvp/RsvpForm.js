import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  convertUtcToDateTimeObj,
  convertUtcToDateRange,
  convertDateTimeObjToUtc
} from "../common/TimeUtils";
import AvailabilityDisplay from "../common/AvailabilityDisplay";
import RsvpAvailabilityPicker from "./RsvpAvailabilityPicker";
import RsvpFriendCard from "./RsvpFriendCard";
import FieldTextWithLabel from "../common/FieldTextWithLabel";
import meetingService from "../../services/meetingService";
import bookingService from "../../services/bookingService";
import friendService from "../../services/friendService";
import emailService from "../../services/emailService";

const RsvpForm = () => {
  const useNav = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [email, setEmail] = useState("");
  const [availableDateTime, setAvailableDateTime] = useState([]);
  const [pickerStatus, setPickerStatus] = useState(false);
  const [activeFriend, setActiveFriend] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    meetingService
      .getMeeting(id)
      .then(res => {
        setMeeting(res);

        let convertedBookings = convertBookingsTimezone(res);
        setBookings(convertedBookings);
      });
  }, []);

  const convertBookingsTimezone = (data) => {
    const convertedBookings = data.bookings.map(booking => {
      const utcSlots = booking.availability;
      const userIanaSlots = convertUtcToDateTimeObj(utcSlots);

      return {
        booker: booking.booker,
        timezone: booking.booker.timezone,
        city: booking.booker.city,
        availability: userIanaSlots
      };
    });
    return convertedBookings;
  };

  const checkFriendExistingBooking = (friendId) => {    
    return bookings.some(item =>item.booker.id === friendId);
  };

  const handleFriendPick = (friend) => {
    setActiveFriend(friend);
    setPickerStatus(true);
    setAvailableDateTime([]);
  };

  const handleHangoutSubmit = async () => {
    event.preventDefault();
    let userIana = activeFriend.timezone;

    // Format availableDateTime to ISO8061
    let availabilityArray = [];
    availableDateTime.forEach(item => {
      let datetime = convertDateTimeObjToUtc(item, userIana);
      availabilityArray = availabilityArray.concat(datetime);
    });

    let newBooking = {
      groupId: meeting.group.id,
      meetingId: meeting.id,
      availability: availabilityArray,
      booker: activeFriend.id,
      bookerModel: "Friend"
    };

    // Create host booking on server
    try {
      const updatedFriend = await friendService.editFriend({ email: email }, activeFriend.id);
      const bookingCreated = await bookingService.createBooking(newBooking);
      await emailService.confirmBooking(updatedFriend.name, updatedFriend.email);
      useNav("/success");
    }
    catch (error) {
      console.log(error);
    }
  };

  if (meeting === undefined) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  else if (meeting) {
    return (
      <main className="p-10 flex flex-col">
        <form onSubmit={() => handleHangoutSubmit()}>
          <div className="relative p-6 flex flex-col bg-white border rounded-[1rem]">
            <h3>{meeting.group.name} Friends</h3>
            <h4>Which friend are you?</h4>
            <div className="flex justify-center">
              {
                meeting.group.friends.map(friend =>
                  <RsvpFriendCard
                    booked={checkFriendExistingBooking(friend.id)}
                    key={friend.id}
                    friend={friend}
                    activeFriend={activeFriend}
                    handleFriendPick={handleFriendPick}
                  />
                )
              }
            </div>

            {
              (pickerStatus && activeFriend) &&
              <div>
                <h4 className="pb-4">Hi {activeFriend.name}, when are you free to hangout?</h4>
                <RsvpAvailabilityPicker
                  friendWindow={convertUtcToDateRange(meeting.window, activeFriend.timezone)}
                  bookings={bookings}
                  setPickerStatus={setPickerStatus}
                  setAvailableDateTime={setAvailableDateTime}
                />
              </div>
            }
            {
              (!pickerStatus && activeFriend) &&
              <AvailabilityDisplay
                availableDateTime={availableDateTime}
                setAvailableDateTime={setAvailableDateTime}
                setPickerStatus={setPickerStatus}
              />
            }


          </div>
          {
            (!pickerStatus && availableDateTime.length > 0) &&
            <div className="flex flex-col w-full mt-6 items-center border rounded-[1rem] p-6">
              <div>
                <div className="w-full">
                  <span>Your email for the meeting?</span>
                  <FieldTextWithLabel
                    name={"Email"}
                    variable={email}
                    setFunction={setEmail}
                    text=" "
                  />
                </div>

                <button
                  className="btn"
                  disabled={(availableDateTime.length > 0 && pickerStatus === false && email) ? false : true}>
                  Mark your availability
                </button>
              </div>
            </div>
          }
        </form>
      </main >
    );
  }

};

export default RsvpForm;