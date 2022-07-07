import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { convertUtcToDateTimeObj } from "../common/TimeUtils";
import RsvpAvailabilityPicker from "./RsvpAvailabilityPicker";
import RsvpAvailabilityDisplay from "./RsvpAvailabilityDisplay";
import RsvpFriendCard from "./RsvpFriendCard";
import meetingService from "../../services/meetingService";

const RsvpForm = () => {
  const [meeting, setMeeting] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [pickerStatus, setPickerStatus] = useState(false);
  const [activeFriend, setActiveFriend] = useState(null);
  const [activeDate, setActiveDate] = useState([]);
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
        name: booking.booker.name,
        timezone: booking.booker.timezone,
        city: booking.booker.city,
        availability: userIanaSlots
      };
    });
    return convertedBookings;
  };

  const handleFriendPick = (friend) => {
    setActiveFriend(friend);
    setPickerStatus(true);
  };

  const handleDatePick = (date) => {
    setActiveDate(date);
  };

  const handleSlotSubmit = () => {

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
        <div className="relative p-6 flex flex-col bg-white border rounded-[1rem]">
          <h3>{meeting.group.name} Friends</h3>
          <h4>Which friend are you?</h4>
          <div className="flex justify-center">
            {meeting.group.friends.map(friend =>
              <RsvpFriendCard
                key={friend.id}
                friend={friend}
                handleFriendPick={handleFriendPick}
              />
            )}
          </div>
          {
            (pickerStatus && activeFriend) &&
            <div>
              <h4 className="pb-4">Hi {activeFriend.name}, when are you free to hangout?</h4>
              <RsvpAvailabilityPicker
                range={meeting.window}
                handleDatePick={handleDatePick}
                activeDate={activeDate}
                userIana={activeFriend.timezone}
                bookings={bookings}
                setPickerStatus={setPickerStatus}
                handleSlotSubmit={handleSlotSubmit}
              />
            </div>
          }
          {
            (!pickerStatus && activeFriend) &&
            <RsvpAvailabilityDisplay
              setPickerStatus={setPickerStatus}
            />
          }
        </div>
      </main>
    );
  }

};

export default RsvpForm;