import React, { useState } from "react";
import groupService from "../../services/groupService";

const GroupForm = ({ user }) => {
  const [groupName, setGroupName] = useState("");

  const handleAddGroup = async (event, groupName, password) => {
    event.preventDefault();
    console.log(groupName + password);

    // Send to group service
    try {
      const res = await groupService.createGroup(groupName);
      console.log(res);
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute top-0 right-0 w-80 py-6 px-8 bg-amber-300 rounded-[1rem] flex flex-col text-left">
      <h3 className="font-bold pb-2">Make a Group</h3>
      <div className="w-full m-auto content-center">
        <form onSubmit={() => handleAddGroup(groupName)}>

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

export default GroupForm;