import React from "react";

const GroupButton = ({ group }) => {
  return (
    <button className="bg-orange-500">
      {group.name}
    </button>
  );
};

export default GroupButton;