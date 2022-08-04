import React from "react";
import GroupButton from "./GroupButton";
import Togglable from "../common/Togglable";
import GroupCreateForm from "./GroupForm";

const GroupNav = ({ groups, setActiveGroupId, addGroup, toggleRef }) => {
  return (
    <div className="relative py-3 px-6 flex flex-col bg-white border rounded-[1rem]">
      <div className="w-full flex flex-wrap flex-start items-center gap-2">
        <span className="text-xl font-bold md:w-24 text-left pr-6">Groups</span>
        <div className="sm:ml-auto">
          <Togglable buttonLabel='Make A Group' ref={toggleRef}>
            <GroupCreateForm addGroup={addGroup} />
          </Togglable>
        </div>
        <div className="flex gap-5 ml-auto">
          {groups.map(group =>
            <GroupButton key={group.id} group={group} setActiveGroupId={setActiveGroupId} />
          )}
        </div>
      </div>
    </div>
  )
};

export default GroupNav;