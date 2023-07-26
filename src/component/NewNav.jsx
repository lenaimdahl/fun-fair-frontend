import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../context/auth.context";
import { FaBars, FaTimes } from "react-icons/fa";
import "../css/new-nav.css";

function NewNav() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOutUser();
    navigate("/");
  };

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <nav ref={navRef}>
        {isLoggedIn ? (
          <ul>
            <li>
              <Link to={"/about"} onClick={showNavbar}>
                About
              </Link>
            </li>
            <li>
              <Link to={"/profile"} onClick={showNavbar}>
                Calendar
              </Link>
            </li>
            <li>
              <Link to={"/day-view"} onClick={showNavbar}>
                Day View
              </Link>
            </li>
            <li>
              <Link to={"/weekly-mood"} onClick={showNavbar}>
                Weekly mood
              </Link>
            </li>
            <li>
              <Link to="#" onClick={handleLogout}>
                Log out
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to={"/"} onClick={showNavbar}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/about"} onClick={showNavbar}>
                About
              </Link>
            </li>
            <li>
              <Link to={"/login"} onClick={showNavbar}>
                Login
              </Link>
            </li>
            <li>
              <Link to={"/signup"} onClick={showNavbar}>
                Signup
              </Link>
            </li>
          </ul>
        )}
        <button onClick={showNavbar} className="nav-btn nav-close-btn">
          <FaTimes />
        </button>
      </nav>
      <div className="hamburger-menu">
        <h3>FunFair 🥳</h3>
        <button onClick={showNavbar} className="nav-btn nav-btn-bars">
          {/* <p>FunFair</p> */}
          <FaBars className="btn-bars-icon" />
        </button>
      </div>
    </header>
  );
}

export default NewNav;
