import React, { useState, useEffect, useRef } from "react";
import GroupForm from "../components/home/GroupForm";
import Group from "../components/home/Group";
import GroupButton from "../components/home/GroupButton";
import Togglable from "../components/common/Togglable";
import GroupMakeHangoutForm from "../components/home/GroupMakeHangoutForm";

import usersService from "../services/usersService";
import groupService from "../services/groupService";

const Home = ({ user }) => {
  const [groups, setGroups] = useState([]);
  const [makeInvite, setMakeInvite] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(null);
  const toggleRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      await usersService
        .getGroups(user.id)
        .then(res => {
          if (res.groups.length > 0) {
            setGroups(res.groups);
            setActiveGroupId(res.groups[0].id);
          }
        });
    };

    fetchData();
  }, []);

  const addGroup = async (newGroup) => {
    toggleRef.current.toggleVisibility();

    // Send to group service
    try {
      const res = await groupService.createGroup(newGroup, user.token);
      setGroups(groups.concat(res));
      setActiveGroupId(groups[groups.length - 1].id);
    }
    catch (error) {
      console.log(error);
    }
  };

  const deleteGroup = async () => {
    try {
      const activeGroup = groups.find(group => group.id == activeGroupId);
      await groupService.deleteGroup(activeGroup.id, user.token);
      setGroups(groups.filter(group => group !== activeGroup));
      setActiveGroupId(groups[0].id);
    }
    catch (error) {
      console.log(error);
    }
  };

  const GroupInterface = () => {
    // Conditional routes - make invite / see group
    if (makeInvite) {
      return (
        <div>
          <GroupMakeHangoutForm setMakeInvite={setMakeInvite} />
        </div>
      );
    }
    else if (activeGroupId) {
      const activeGroup = groups.find(group => group.id == activeGroupId);
      return (
        <div>
          <Group key={activeGroup.id} user={user} group={activeGroup} deleteGroup={deleteGroup} makeInvite={makeInvite} setMakeInvite={setMakeInvite} />
        </div>
      );
    }
    else {
      return (
        <div>
          Looks like you need to select a group.
        </div>
      );
    }
  };

  return (
    <main className="px-10">
      <div className="relative py-5 px-10 flex flex-col bg-gray-100 rounded-[1rem]">
        <div className="w-full flex flex-wrap flex-start items-center gap-5">
          <span className="text-xl font-bold">Groups</span>
          {groups.map(group =>
            <GroupButton key={group.id} group={group} setActiveGroupId={setActiveGroupId} />
          )}
          <div className="ml-auto">
            <Togglable buttonLabel='Make A Group' ref={toggleRef}>
              <GroupForm addGroup={addGroup} />
            </Togglable>
          </div>

        </div>
      </div>
      <div>
        <GroupInterface />
      </div>

    </main>
  );
};

export default Home;