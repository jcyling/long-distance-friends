import React, { useState } from "react";

const Settings = ({ user }) => {
  const [password, setNewPassword] = useState("");
  const [name, setNewName] = useState("");
  const [city, setNewCity] = useState("");

  const handleAccountEdit = (event, name, password) => {
    event.preventDefault();
    console.log(name, password);
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <div className="w-2/5 m-auto content-center">
        <form onSubmit={() => handleAccountEdit(event, password, name)}>

          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
            <input
              type="name"
              id="name"
              value={name}
              className="fld-txt"
              placeholder="Name"
              onChange={({ target }) => setNewName(target.value)} required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              className="fld-txt"
              placeholder="Password"
              onChange={({ target }) => setNewPassword(target.value)} required />
          </div>
          <div className="mb-6">
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
            <input
              type="city"
              id="city"
              value={city}
              className="fld-txt"
              placeholder="City"
              onChange={({ target }) => setNewCity(target.value)} required />
          </div>
          <button href="/createAccount" className="btn">Change Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;