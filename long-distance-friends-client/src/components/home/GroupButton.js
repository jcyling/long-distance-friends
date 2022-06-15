import React from "react";

const GroupButton = ({ group, setActiveGroupId }) => {
  return (
    <div>
      <button className="btn" onClick={() => setActiveGroupId(group.id)}>
        {group.name}
      </button>
    </div>
  );
};

export default GroupButton;