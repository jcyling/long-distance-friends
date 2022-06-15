import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginService from "../services/loginService";

const LoginForm = ({ user, setUser, useNav }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event, username, password) => {
    event.preventDefault();

    // Send to login service
    try {
      const userToken = await loginService.login({ username, password });
      window.localStorage.setItem(
        "user", JSON.stringify(userToken)
      );

      setUser(userToken);
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

          <div className="mb-6">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
            <input
              type="username"
              id="username"
              value={username}
              className="fld-txt"
              placeholder="Username"
              onChange={({ target }) => setUsername(target.value)} required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              className="fld-txt"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)} required />
          </div>
          <button type="submit" className="btn">Submit</button>

        </form>
        <div className="text-amber-500 py-5">
          <Link to="/createAccount">Make New Account</Link>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;