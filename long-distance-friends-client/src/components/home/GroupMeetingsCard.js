import React from "react";
import { convertUtcToDateRange } from "../common/TimeUtils";

const GroupMeetingsCard = ({ meeting, user, handleHangoutDelete }) => {

  const UtcWindow = convertUtcToDateRange(meeting.window, user.timezone);

  return (
    <div className="p-3 rounded-md text-left border">
      <div className="flex flex-col">
        <div>
          <span className="pr-2">
            {UtcWindow.startDate}
          </span>
          <span>To</span>
          <span className="pl-2">
            {UtcWindow.endDate}
          </span>
        </div>
        <div>
          Your Availability:
          {/* Insert host availability */}
        </div>

      </div>
      <button
        className="float-right"
        onClick={() => handleHangoutDelete(meeting.id)}>
        Cancel Hangout
      </button>
      <div>
        <span>Send your friends this link to RSVP</span>
      </div>
    </div>
  );
};

export default GroupMeetingsCard;