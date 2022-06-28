import React from "react";
import Flatpickr from "react-flatpickr";

const Timepicker = ({ range }) => {
  return (
    <div>
      <Flatpickr
        className="invisible"
        options={{
          inline: true,
          mode: "multiple",
          minDate: range.startDate,
          maxDate: range.endDate,
        }}
      />
    </div>
  );
};

export default Timepicker;