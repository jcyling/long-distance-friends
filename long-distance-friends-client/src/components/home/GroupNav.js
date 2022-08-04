import React from "react";
import GroupButton from "./GroupButton";
import Togglable from "../common/Togglable";
import GroupCreateForm from "./GroupForm";

const GroupNav = ({ groups, setActiveGroupId, addGroup, toggleRef }) => {
  return (
    <div className="relative py-3 px-6 flex flex-col bg-white border rounded-[1rem]">
      <div className="w-full flex flex-wrap flex-start items-center gap-5">
        <span className="text-xl font-bold">Groups</span>
        {groups.map(group =>
          <GroupButton key={group.id} group={group} setActiveGroupId={setActiveGroupId} />
        )}
        <div className="ml-auto">
          <Togglable buttonLabel='Make A Group' ref={toggleRef}>
            <GroupCreateForm addGroup={addGroup} />
          </Togglable>
        </div>

      </div>
    </div>
  )
};

export default GroupNav;