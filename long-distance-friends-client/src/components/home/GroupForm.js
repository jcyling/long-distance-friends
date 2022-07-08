import React, { useState } from "react";

const GroupCreateForm = ({ addGroup }) => {
  const [groupName, setGroupName] = useState("");

  const handleAddGroup = async (event) => {
    event.preventDefault();
    addGroup({ name: groupName });
    setGroupName("");
  };

  return (
    <div className="absolute z-10 top-20 right-0 w-80 py-6 px-8 bg-amber-300 rounded-[1rem] flex flex-col text-left">
      <h3 className="font-bold pb-2">What&apos;s it called?</h3>
      <div className="w-full m-auto content-center">
        <form onSubmit={handleAddGroup}>

          <div className="mb-6">
            <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-900">Group Name</label>
            <input
              type="groupname"
              id="groupname"
              value={groupName}
              className="fld-txt"
              placeholder="Crew Love"
              onChange={({ target }) => setGroupName(target.value)} required
            />
          </div>
          <button type="submit" className="btn text-black bg-white hover:bg-gray-200">Create</button>

        </form>
      </div>
    </div>
  );
};

export default GroupCreateForm;