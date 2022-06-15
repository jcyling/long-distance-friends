import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../static/images/logo.png";

const Navbar = ({
  user,
  handleLogout
}) => {

  Navbar.propTypes = {
    handleLogout: PropTypes.func.isRequired,
  };

  const LoggedOutNav = () => {
    return (
      <div>
        <Link className="link login" to="/login">Login</Link>
        <Link className="link login" to="/createAccount">Sign Up</Link>
      </div>

    );
  };

  const LoggedInNav = () => {
    return (
      <div>
        <Link className="link font-medium text-gray-700 hover:text-orange-600" to="/home">Home</Link>
        <button className="link font-medium text-gray-700 hover:text-orange-600">Settings</button>
        <button className="link font-medium text-gray-700 hover:text-orange-600" onClick={handleLogout}>Logout</button>
      </div>
    );
  };

  return (
    <nav className="relative w-full px-10 flex flex-wrap items-center justify-between link navbar navbar-expand-lg navbar-light">
      <Link className="" to="/">
        <img src={logo} className="img-logo" alt="Long Distance Friends" style={{ maxHeight: 40 }} />
      </Link>
      {!user ? LoggedOutNav() : LoggedInNav()}
    </nav>
  );
};

export default Navbar;