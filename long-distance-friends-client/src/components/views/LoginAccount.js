import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginService from "../../services/loginService";
import FieldTextWithLabel from "../common/FieldTextWithLabel";

const AccountLoginForm = ({ user, setUser, useNav }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event, username, password) => {
    event.preventDefault();

    // Send to login service
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(
        "user", JSON.stringify(user)
      );

      setUser(user);
      setUsername("");
      setPassword("");
      useNav("/home");
    }
    catch (error) {
      console.log(error);
    }
  };

  // If logged in, redirect to /home
  if (user) {
    useNav("/home");
  }

  return (
    <div className="flex flex-col content-center">
      <h2>Login</h2>
      <div className="w-2/5 m-auto content-center">
        <form onSubmit={() => handleLogin(event, username, password)}>

          <FieldTextWithLabel
            name={"Username"}
            variable={username}
            setFunction={setUsername}
          />
          <FieldTextWithLabel
            name={"Password"}
            variable={password}
            setFunction={setPassword}
          />
          <button type="submit" className="btn">Login</button>

        </form>
        <div className="text-amber-500 py-5">
          <Link to="/createAccount">Make New Account</Link>
        </div>

      </div>
    </div>
  );
};

export default AccountLoginForm;