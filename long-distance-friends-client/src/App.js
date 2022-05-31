import React from "react";
import {
  Routes, Route, Navigate, useNavigate
} from "react-router-dom";
import Index from "./components/Index";
import NavPublic from "./components/NavPublic";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import AccountForm from "./components/AccountForm";
import NoRoute from "./components/NoRoute";

import { useState, useEffect } from "react";
import loginService from "./services/loginService";

const App = () => {
  const [user, setUser] = useState(null);
  const useNav = useNavigate();

  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
    }
  }, []);

  const ProtectedRoute = ({ user, children }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const handleLogin = async (event, username, password) => {
    event.preventDefault();

    // Send to login service
    try {
      const userToken = await loginService.login({ username, password });
      window.localStorage.setItem(
        "user", JSON.stringify(userToken)
      );

      setUser(userToken);

    }
    catch (error) {
      console.log(error);
    }
    useNav("/home");
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleUserCreation = async (event, username, password) => {
    event.preventDefault();
    // TODO: Handle user creation
    console.log(username, password);
  };

  return (
    <div className="App">
      <div className="header">
        <NavPublic user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
      </div>
      <Routes>
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} />} />
        <Route
          path="/createAccount"
          element={<AccountForm handleUserCreation={handleUserCreation} />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          } />
        <Route
          path="/"
          element={<Index />} />
        <Route
          path="*"
          element={<NoRoute />} />
      </Routes>
    </div>
  );
};

export default App;
