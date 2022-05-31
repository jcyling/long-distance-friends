import React, { useState } from "react";
import PropTypes from "prop-types";

const AccountForm = ({ handleUserCreation }) => {
  const [ newUsername, setNewUsername ] = useState("");
  const [ newPassword, setNewPassword ] = useState("");
  
  AccountForm.propTypes = {
    handleUserCreation: PropTypes.func.isRequired
  };
  
  return (
    <div className="flex flex-col content-center">
      <h2>Create Account</h2>
      <div className="w-2/5 m-auto content-center">
        <form onSubmit={() => handleUserCreation(event, newUsername, newPassword)}>

          <div className="mb-6">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
            <input
              type="username"
              id="username"
              value={newUsername}
              className="fld-txt"
              placeholder="Username"
              onChange={({ target }) => setNewUsername(target.value)} required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              id="password"
              value={newPassword}
              className="fld-txt"
              placeholder="Password"
              onChange={({ target }) => setNewPassword(target.value)} required />
          </div>
          <button href="/createAccount" className="btn">Make</button>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;