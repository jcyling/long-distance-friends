import React, { useState } from "react";
import usersService from "../../services/usersService";
import FieldTextWithLabel from "../common/FieldTextWithLabel";

const AccountCreateForm = ({ user, setUser, useNav, setErrorMessage }) => {
  const [username, setNewUsername] = useState("");
  const [password, setNewPassword] = useState("");
  const [name, setNewName] = useState("");

  const handleUserCreation = async (event, username, password, name) => {
    event.preventDefault();

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

          <FieldTextWithLabel
            name={"Username"}
            variable={username}
            setFunction={setNewUsername}
          />
          <FieldTextWithLabel
            name={"Name"}
            variable={name}
            setFunction={setNewName}
          />
          <FieldTextWithLabel
            name={"Password"}
            variable={password}
            setFunction={setNewPassword}
          />
          <button href="/createAccount" className="btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default AccountCreateForm;