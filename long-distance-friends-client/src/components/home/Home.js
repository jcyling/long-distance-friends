import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
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

  // Fetch initial data
  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useQuery(["user"], () => usersService.getInfo(user.id), {
    // Initialize the first group as activeGroup
    onSuccess: (data) => {
      setGroups(data.groups);
      setActiveGroupId(data.groups[0].id);
    }
  });

  const addGroup = async (newGroup) => {
    toggleRef.current.toggleVisibility();

    try {
      const res = await groupService.createGroup(newGroup, user.token);
      setGroups(data.groups.concat(res));
      setActiveGroupId(res.id);
    }
    catch (error) {
      console.log(error);
    }
  };

  const deleteGroup = async () => {
    // Bug: replace activeGroup with mutation so that it works when request is submitted to server

    const activeGroup = groups.find(group => group.id == activeGroupId);

    try {
      await groupService.deleteGroup(activeGroup.id, user.token);
      setGroups(groups.filter(group => group !== activeGroup));
      setActiveGroupId(null);
    }
    catch (error) {
      console.log(error);
    }
  };

  const GroupInterface = () => {

    // Bug: replace activeGroup with mutation so that it works when request is submitted to server
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <main className="xl:px-80 md:px-24 sm:px-6 flex flex-col">
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