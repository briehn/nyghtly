import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import { logout } from "../../store/session";
import logo from "../../assets/images/logo.png";
import { useState } from "react";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link className="logged-in-nav-link" to={"/"}>
            Home
          </Link>
          <Link className="logged-in-nav-link" to={"/about"}>
            About
          </Link>
          <Link className="logged-in-nav-link" to={"/profile"}>
            Profile
          </Link>
          <div
            id="logout-nav-link"
            className="logged-in-nav-link"
            onClick={logoutUser}
          >
            Logout
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="links-auth">
            <Link className="logged-in-nav-link" to={"/"}>
              Home
            </Link>
            <Link className="logged-in-nav-link" to={"/about"}>
              {" "}
              {/* fix janky class name here later... user is logged out when they see this link but we need this class name for spacing purposes*/}
              About
            </Link>
            <Link id="signup-form-nav-link" className="nav-link" to={"/signup"}>
              Sign up
            </Link>
            <Link className="nav-link" to={"/login"}>
              Log in
            </Link>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <nav id="main-nav">
        <Link id="main-logo-container" className="nav-link" to={"/"}>
          <img id="main-logo" src={logo} alt="NYGHTLY LOGO" />
          {/* <h1>Nyght</h1> */}
        </Link>
        <div id="nav-links-container">{getLinks()}</div>
      </nav>
    </>
  );
}

export default NavBar;
