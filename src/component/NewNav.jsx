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
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/profile"}>Calendar</Link>
            </li>
            <li>
              <Link to={"/day-view"}>Day View</Link>
            </li>
            <li>
              <Link to={"/weekly-mood"}>Weekly mood</Link>
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
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/signup"}>Signup</Link>
            </li>
          </ul>
        )}
        <button onClick={showNavbar} className="nav-btn nav-close-btn">
          <FaTimes />
        </button>
      </nav>
      <button onClick={showNavbar} className="nav-btn nav-btn-bars">
        <FaBars />
      </button>
    </header>
  );
}

export default NewNav;
