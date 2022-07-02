import React from "react";
import Flatpickr from "react-flatpickr";
import { convertDateRangeToUtc } from "./TimeUtils";

const WindowPicker = ({ user, setRange, setRangeSelected }) => {

  let userIana = user.timezone;

  const handleRangePick = (browserDates, dateStr) => {
    // Receive dates as strings, convert to object
    let splitDates = "";
    if (browserDates.length === 2) {
      splitDates = dateStr.split(" to ");
    }
    else {
      setRangeSelected(false);
      return null;
    }

    const newDateRange = {
      startDate: splitDates[0],
      endDate: splitDates[1]
    };

    // Convert to UTC with user-specified timezone
    const utcDatetimeRange = convertDateRangeToUtc(newDateRange, userIana);

    setRange(prevState => {
      return { ...prevState, ...utcDatetimeRange };
    });
    setRangeSelected(true);

  };

  // Convert minutes offset into timezone
  Number.prototype.mins2offset = function () {
    let hours = Math.floor(this / 60);
    let minutes = Math.floor((this - ((hours * 3600)) / 60));
    let pfx = this >= 0 ? "+" : "-";

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;

    return pfx + hours + ":" + minutes;
  };

  return (
    <Flatpickr
      className="fld-txt"
      onChange={(browserDates, dateStr) => handleRangePick(browserDates, dateStr)}
      options={{
        mode: "range",
        dateFormat: "Y-m-d",
        dateVariants: ["Y-M-d",
          "Y-m-d ZZ"],
        ariaDateFormat: "cccc d, y",
        allowInput: true,
        minDate: Date.now(),
      }}
    />
  );
};

export default WindowPicker;