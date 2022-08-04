import React, { useState, useEffect, useRef } from "react";
import GroupNav from "./GroupNav";
import GroupInfo from "./GroupInfo";

import GroupMakeHangoutForm from "./GroupMakeHangoutForm";

import usersService from "../../services/usersService";
import groupService from "../../services/groupService";

const Home = ({ user }) => {
  const [groups, setGroups] = useState([]);
  const [makeInvite, setMakeInvite] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(null);
  const toggleRef = useRef();

  let didInit = false;

  useEffect(() => {
    const fetchData = async () => {
      await usersService
        .getInfo(user.id)
        .then(res => {
          if (res.groups.length > 0) {
            setGroups(res.groups);
            setActiveGroupId(res.groups[0].id);
          }
        });
    };

    if (!didInit) {
      fetchData();
      didInit = true;
    }
  }, [user]);

  const addGroup = async (newGroup) => {
    toggleRef.current.toggleVisibility();

    try {
      const res = await groupService.createGroup(newGroup, user.token);
      setGroups(groups.concat(res));
      setActiveGroupId(res.id);
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
      setActiveGroupId(null);
    }
    catch (error) {
      console.log(error);
    }
  };

  const GroupInterface = () => {
    const activeGroup = groups.find(group => group.id == activeGroupId);
    if (makeInvite) {
      return (
        <div>
          <GroupMakeHangoutForm user={user} group={activeGroup} setMakeInvite={setMakeInvite} />
        </div>
      );
    }
    else if (activeGroupId) {
      return (
        <div>
          <GroupInfo user={user} key={activeGroup.id} group={activeGroup} deleteGroup={deleteGroup} setMakeInvite={setMakeInvite} />
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
      <GroupNav
        groups={groups}
        setActiveGroupId={setActiveGroupId}
        addGroup={addGroup}
        toggleRef={toggleRef}
      />
      <GroupInterface />

    </main>
  );
};

export default Home;