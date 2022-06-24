import React, { useState } from "react";


const GroupMakeHangoutForm = ({ setMakeInvite }) => {
  const [date, setDate] = useState(new Date());
  const [rangeSelect, setRangeSelect] = useState(false);

  const handleDateSet = (date) => {
    console.log(date);
    
  };

  const handleHangoutSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bg-gray-200 rounded-[1rem]">
      <form className="flex flex-col" onSubmit={() => handleHangoutSubmit()}>

        <div className="flex">
          <p className="flex flex-row">
            Your Timezone:
            <span>
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </span>
            <span >
              UTC {(new Date().getTimezoneOffset() / 60) * -1}
            </span>
          </p>

          <div>
            <span>Start Date:</span>

          </div>

          {rangeSelect && <timeSelect />}

        </div>
        <div>
          <button className="btn">
            Schedule
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