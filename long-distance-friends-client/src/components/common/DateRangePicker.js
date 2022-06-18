import React, { useState } from "react";
const { RangePicker } = DatePicker;
import { DatePicker } from "antd";
import moment from "moment";

const DateRangePicker = ({ weeks, setWeeks }) => {
  const [dates, setDates] = useState(null);
  const [hackValue, setHackValue] = useState(null);
  const [value, setValue] = useState(null);

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }

    const tooLate = dates[0] && current.diff(dates[0], "days") > 7;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 7;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open) => {
    if (open) {
      setHackValue([null, null]);
      console.log(hackValue);
      setDates([null, null]);
      console.log(dates);
    } else {
      setHackValue(null);
    }
  };

  return (
    <div>
      <label
        className="pr-2"
        htmlFor="dateRangePicker">
        Pick a range:
      </label>
      <RangePicker
        id="dateRangePicker"
        className="w-72"
        value={hackValue || value}
        disabledDate={disabledDate}
        onCalendarChange={(val) => setDates(val)}
        onChange={(val) => setValue(val)}
        onOpenChange={onOpenChange}
      />
      <button className="btn">Choose Range</button>
    </div>

  );
};

export default DateRangePicker;