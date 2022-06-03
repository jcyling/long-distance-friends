import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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

  const LoginNav = () => {
    return (
      <div>
        <Link className="link home" to="/home">Home</Link>
        <button className="link logout" onClick={handleLogout}>Logout</button>
      </div>
    );
  };

  return (
    <div>
      <Link className="link index" to="/">Long Distance Friends</Link>
      {!user ? LoginButton() : LoginNav()}
    </div>
  );
};

export default Navbar;