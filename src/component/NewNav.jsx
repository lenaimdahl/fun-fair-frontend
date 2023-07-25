import { Link, useNavigate } from "react-router-dom";
import { Fragment, useContext } from "react";
import { AuthContext } from "../context/auth.context";

function NewNav() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOutUser();
    navigate("/");
  };

  return (
    <nav className="navbar">
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
    
    </nav>
 
    
  );
}

export default NewNav;
