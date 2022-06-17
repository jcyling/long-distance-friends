import React, { useState } from "react";

const GroupMakeHangoutForm = ({ setMakeInvite }) => {
  const [value, setValue] = React.useState([null, null]);
  // const [hangoutWindowEnd, setHangoutWindowEnd] = useState("");

  return (
    <div className="bg-gray-200 rounded-[1rem] p-6">
      <form className="flex flex-col">

        <div>
          <button className="btn">
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