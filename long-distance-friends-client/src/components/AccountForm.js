import React, { useState } from "react";
import usersService from "../services/usersService";

const AccountForm = ({ user, setUser, useNav, setErrorMessage }) => {
  const [username, setNewUsername] = useState("");
  const [password, setNewPassword] = useState("");
  const [name, setNewName] = useState("");

  const handleUserCreation = async (event, username, password, name) => {
    event.preventDefault();

    // TODO: Handle user creation
    // If user is already logged in
    if (user) {
      useNav("/home");
    }
    // If any criteria are missing
    else if (!username || !password || !name) {
      // Return error message
      console.log("Missing criteria");
    }
    else {
      try {
        // Send post request to server through userService
        const newUserToken = usersService.createUser({ username, password, name });
        console.log(newUserToken);

        // Log user in 
        window.localStorage.setItem(
          "user", JSON.stringify(newUserToken)
        );
        setUser(newUserToken);
        useNav("/home");
      }
      catch (error) {
        // Return error as message to user
        console.log(error);
        setErrorMessage(error.res.data);
        useNav("/createAccount");
      }
    }
  };

  return (
    <div className="flex flex-col content-center">
      <h2>Create Account</h2>
      <div className="w-2/5 m-auto content-center">
        <form onSubmit={() => handleUserCreation(event, username, password, name)}>

          <div className="mb-6">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
            <input
              type="username"
              id="username"
              value={username}
              className="fld-txt"
              placeholder="Username"
              onChange={({ target }) => setNewUsername(target.value)} required />
          </div>
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
          <button href="/createAccount" className="btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;