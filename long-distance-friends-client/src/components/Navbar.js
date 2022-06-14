import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../static/images/logo.png";

const Navbar = ({
  user,
  handleLogout
}) => {

  Navbar.propTypes = {
    handleLogout: PropTypes.func.isRequired,
  };

  const LoginButton = () => {
    return (
      <Link className="link login" to="/login">Login</Link>
    );
  };

  const LoggedInNav = () => {
    return (
      <div>
        <Link className="link font-medium text-gray-700 hover:text-orange-600" to="/home">Home</Link>
        <button className="link font-medium text-gray-700 hover:text-orange-600" onClick="">Settings</button>
        <button className="link font-medium text-gray-700 hover:text-orange-600" onClick={handleLogout}>Logout</button>
      </div>
    );
  };

  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between shadow-lg link navbar navbar-expand-lg navbar-light">
      <Link className="" to="/">
        <img src={logo} className="img-logo" alt="Long Distance Friends" style={{ maxHeight: 40 }}/>
      </Link>
      {!user ? LoginButton() : LoggedInNav()}
    </nav>
  );
};

export default Navbar;