import React, { useState } from "react";
import DateRangePicker from "../common/DateRangePicker";
import SlotPicker from "../common/DateSlotPicker";

const GroupMakeHangoutForm = ({ setMakeInvite }) => {
  const [weeksBool, setWeeksBool] = useState(false);

  const handleHangoutSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bg-gray-200 rounded-[1rem]">
      <form className="flex flex-col">

        <DateRangePicker weeks={weeksBool} setWeeks={setWeeksBool} />
        <SlotPicker />

        <div>
          <button className="btn" onClick={() => handleHangoutSubmit()}>
            Schedule
          </button>
          <button
            className="btn ml-auto"
            onClick={() => setMakeInvite(false)}>
            Cancel
          </button>
        </div>
      </form>


    </div>
  );
};

export default GroupMakeHangoutForm;