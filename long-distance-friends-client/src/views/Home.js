import React, { useState, useEffect } from "react";
import GroupButton from "../components/GroupButton";
import usersService from "../services/usersService";

const Home = ({ user }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    usersService.getGroups(user.id).then(groups =>
      setGroups(groups)
    );
  }, []);

  return (
    <main>
      <h2>Home</h2>
      <h2>{user.name} Friend Groups</h2>
      <div className="content">
        <div className="group-bar flex w-9/12">
          {user.groups && groups.map(group => {
            <GroupButton group={group} />;
          })}
          <button className="btn">Create A Group</button>
        </div>
      </div>
    </main>
  );
};

export default Home;