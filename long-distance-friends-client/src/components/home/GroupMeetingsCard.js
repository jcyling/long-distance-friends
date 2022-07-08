import React from "react";
import { convertUtcToDateRange } from "../common/TimeUtils";

const GroupMeetingsCard = ({ meeting, user, handleHangoutDelete }) => {

  const UtcWindow = convertUtcToDateRange(meeting.window, user.timezone);

  return (
    <div className="p-3 rounded-md text-left border">
      <div className="flex flex-col">
        <div>
          {UtcWindow.startDate} To {UtcWindow.endDate}
        </div>
        <div>
          Edit your availability
        </div>
      </div>
      <button
        className="float-right text-gray-500"
        onClick={() => handleHangoutDelete(meeting.id)}>
        Cancel Hangout
      </button>
      <div>
        Send your friends this link to RSVP
      </div>
    </div>
  );
};

export default GroupMeetingsCard;