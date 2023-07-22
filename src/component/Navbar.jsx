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
        {isLoggedIn ? null : (
          <li className="menu-item">
            <Link to={"/"}>Home</Link>
          </li>
        )}
        <li className="menu-item">
          <Link to={"/about"}>About</Link>
        </li>
        {!isLoggedIn ? null : (
          <li className="menu-item">
            <Link to={"/profile"}>Profile</Link>
            <ol className="sub-menu">
              <li className="menu-item">
                <Link to={"/day-view"}>Day View</Link>
              </li>
              <li className="menu-item">
                <Link to={"/weekly-mood"}>Weekly mood</Link>
              </li>
            </ol>
          </li>
        )}
        {isLoggedIn ? (
          <li className="menu-item">
            <Link
              to="#"
              onClick={() => {
                logOutUser();
                navigate("/");
              }}
            >
              Log out
            </Link>
          </li>
        ) : (
          <Fragment>
            <li className="menu-item">
              <Link to={"/login"}>Log in</Link>
            </li>
            <li className="menu-item">
              <Link to={"/signup"}>Sign up</Link>
            </li>
          </Fragment>
        )}
      </ol>
    </nav>
  );
}

export default Navbar;
