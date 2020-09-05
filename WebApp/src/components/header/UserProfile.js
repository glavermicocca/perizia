import React from "react";
import PropTypes from "prop-types";

const UserProfile = ({ user, handleLogout }) => {
  return (
    <li className="dropdown nav-item">
      <a
        href="#id"
        className="dropdown-toggle nav-link"
        data-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="fa fa-user" style={{ marginRight: "0.5em" }} />
        {user || "Anonymous"}
        <span className="caret" />
      </a>
      <ul className="dropdown-menu" style={{ right: 0, left: "auto" }}>
        <a className="dropdown-item" href="#id" onClick={handleLogout}>
          <i className="fa fa-sign-out" style={{ marginRight: "0.5em" }} />
          {user ? "Log out" : "Log in"}
        </a>
      </ul>
    </li>
  );
};

UserProfile.propTypes = {
  user: PropTypes.string,
  handleLogout: PropTypes.func.isRequired
};

export default UserProfile;
