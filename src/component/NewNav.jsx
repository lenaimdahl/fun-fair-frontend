import { Link } from "react-router-dom";

function NewNav() {
    return (
      <nav className="navbar">
        <ul>
            <li>
            <Link to={"/"}>Home</Link>
            </li>
            <li>
            <Link to={"/about"}>About</Link>
            </li>
            <li>
            <Link to={"/login"}>Log in</Link>
            </li>
            <li>
            <Link to={"/signup"}>Sign up</Link>
            </li>
        </ul>
      </nav>
    );
  }
  
  export default NewNav;