/* eslint-disable jsx-a11y/anchor-is-valid */

import "../css/navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="menu">
      <ol>
        <li className="menu-item">
          <a href="/">Home</a>
        </li>
        <li className="menu-item">
          <a href="/about">About</a>
        </li>
        <li className="menu-item">
          <a href="/profile">Profile</a>
          <ol className="sub-menu">
            <li className="menu-item">
              <Link to={"/day-view"}>Day View</Link>
            </li>
            <li className="menu-item">
             <Link to={"/weekly-mood"}>Weekly mood</Link>
            </li>
          </ol>
        </li>
        {isLoggedIn ? (
          <li className="menu-item">
            <a
              href="#"
              onClick={() => {
                logOutUser();
                navigate("/");
              }}
            >
              Logout
            </a>
          </li>
        ) : (
          <Fragment>
            <li className="menu-item">
              <a href="/login">Log in</a>
            </li>
            <li className="menu-item">
              <a href="/signup">Sign up</a>
            </li>
          </Fragment>
        )}
      </ol>
    </nav>
  );
}

export default Navbar;
