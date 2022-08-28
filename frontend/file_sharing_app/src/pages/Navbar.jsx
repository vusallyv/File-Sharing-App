import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Navbar</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          {localStorage.getItem("access_token") ?
            <React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/files">Files</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/files/new">Create File</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
            </React.Fragment>
            :
            <React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </React.Fragment>}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;