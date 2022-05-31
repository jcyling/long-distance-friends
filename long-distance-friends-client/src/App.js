import React from "react";
import {
  BrowserRouter as Router,
  Routes, Route, useNavigate
} from "react-router-dom";
import Index from "./components/Index";
import NavPublic from "./components/NavPublic";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import NoRoute from "./components/NoRoute";

import { useState } from "react";
import loginService from "./services/loginService";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async (event, username, password) => {
    event.preventDefault();

    // Send to login service
    try {
      const userToken = await loginService.login({ username, password });
      window.localStorage.setItem(
        "user", JSON.stringify(userToken)
      );
    }
    catch (error) {
      console.log(error);
    }
    
    useNavigate("/home");
  };

  return (
    <div className="App">
      <Router>
        <div className="header">
          <NavPublic />
        </div>
        <Routes>
          <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
          <Route path="/home" element={
            user ? <Home /> : <NoRoute />} />
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NoRoute />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
