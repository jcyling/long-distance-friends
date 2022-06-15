import React, { useState, useEffect } from "react";
import GroupButton from "../components/home/GroupButton";
import Group from "../components/home/Group";
import usersService from "../services/usersService";

const Home = ({ user }) => {
  const [groups, setGroups] = useState([]);
  const [activeGroupId, setActiveGroupId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await usersService
        .getGroups(user.id)
        .then(res => {
          setGroups(res.groups);
          setActiveGroupId(res.groups[0].id);
        });
    };

    fetchData();
  }, []);

  const ActiveGroup = () => {
    if (activeGroupId) {
      const activeGroup = groups.find(group => group.id == activeGroupId);
      return (
        <div>
          <Group group={activeGroup} />
        </div>
      );
    }
    else {
      return null;
    }
  };

  return (
    <main className="px-10">
      <div className="py-5 px-10 flex flex-col bg-gray-100 rounded-[1rem]">
        <div className="w-9/12 flex flex-wrap items-center gap-5">
          <span className="text-xl font-bold">Groups</span>
          {groups.map(group =>
            <GroupButton key={group.id} group={group} setActiveGroupId={setActiveGroupId} />
          )}
          <button className="btn bg-purple-300 hover:bg-purple-400 font-normal">Make A Group</button>
        </div>
      </div>
      <div>
        <ActiveGroup />
      </div>
    </main>
  );
};

export default Home;