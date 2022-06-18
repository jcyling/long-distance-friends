import React, { Calendar } from "antd";
import { TimePicker } from "antd";

const SlotPicker = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  // Styling
  const calendarStyle = {
    width: "300px",
    border: "1px solid #f0f0f0",
    borderRadius: "0.5rem"
  };

  return (
    <div className="rounded-[1rem] p-6">
      <Calendar
        style={calendarStyle}
        fullscreen={false}
        onPanelChange={onPanelChange}
      />
      <TimePicker.RangePicker
        className="inline"  
      />
    </div>
  );
};

export default SlotPicker;

