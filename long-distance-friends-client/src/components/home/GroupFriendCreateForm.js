import React, { useState } from "react";

const GroupCreateFriendForm = ({ addFriend, group }) => {
  const [friendName, setFriendName] = useState("");
  const [friendCity, setFriendCity] = useState("");

  const handleAddFriend = async (event) => {
    event.preventDefault();

    addFriend({ name: friendName, city: friendCity, groupId: group.id });
    setFriendName("");
    setFriendCity("");
  };

  return (
    <div className="absolute top-20 right-0 z-10 w-80 py-6 px-8 bg-amber-300 rounded-[1rem] flex flex-col text-left">
      <h3 className="font-bold pb-2">Add a friend</h3>
      <div className="w-full m-auto content-center">
        <form onSubmit={handleAddFriend}>

          <div className="mb-6">
            <label htmlFor="friendname" className="block mb-1 text-sm font-medium text-gray-900">Name</label>
            <input
              type="friendname"
              id="friendname"
              value={friendName}
              className="fld-txt"
              onChange={({ target }) => setFriendName(target.value)} required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-900">City</label>
            <input
              type="city"
              id="city"
              value={friendCity}
              placeholder="New York"
              className="fld-txt"
              onChange={({ target }) => setFriendCity(target.value)} required
            />
          </div>

          <button type="submit" className="btn text-black bg-white hover:bg-gray-200">Add</button>

        </form>
      </div>
    </div>
  );
};

export default GroupCreateFriendForm;