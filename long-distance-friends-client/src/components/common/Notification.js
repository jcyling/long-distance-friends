import React from "react";

const Notification = ({ errorMessage }) => {
  if (errorMessage) {
    return (
      <div className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
        <div className="ml-3 text-sm font-normal">{errorMessage}</div>
      </div>
    );
  }
  else {
    return null;
  }
};

export default Notification;