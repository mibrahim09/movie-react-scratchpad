import React, { Component } from "react";
import { NavLink } from "react-router-dom"; // We'll use link instead of <a href=""> to navigate to prevent post
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            NOVA STORE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav me-auto mb-2 mb-md-0">
              <NavLink className="nav-item nav-link" aria-current="page" to="/">
                Home
              </NavLink>
              <NavLink className="nav-item nav-link" to="/movies">
                Movies
              </NavLink>
              <NavLink className="nav-item nav-link" to="/rentals">
                Rentals
              </NavLink>
              <NavLink className="nav-item nav-link" to="/customers">
                Customers
              </NavLink>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
