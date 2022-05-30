import React from "react";
import { Link } from "react-router-dom";

const NavPublic = () => {
  return (
    <div>
      <Link className="link index" to="/">Long Distance Friends</Link>
      <Link className="link login" to="/login">Login</Link>
    </div>
  )
}

export default NavPublic