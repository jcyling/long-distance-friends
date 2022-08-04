import React from "react";
import { convertUtcToDateRange } from "../../utils/TimeUtils";

const GroupMeetingsCard = ({ meeting, user, handleHangoutDelete }) => {

  const invitationUrl = `localhost:3000/rsvp/${meeting.uid}`;
  const UtcWindow = convertUtcToDateRange(meeting.window, user.timezone);

  return (
    <div className="p-3 rounded-md text-left border w-full basis-80 shrink-0">
      <div className="flex flex-col">
        <div className="font-bold">
          {UtcWindow.startDate} To {UtcWindow.endDate}
        </div>
      </div>
      <div>
        Send your friends this link to RSVP:
        <div>
          <a href={invitationUrl}>{invitationUrl}</a>
        </div>
      </div>
      <button
        className="text-gray-400"
        onClick={() => handleHangoutDelete(meeting.id)}>
        Cancel Hangout
      </button>
    </div>
  );
};

export default GroupMeetingsCard;