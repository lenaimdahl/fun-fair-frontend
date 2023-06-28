import "../css/navbar.scss";

function Navbar() {
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
          {/* <ol className="sub-menu">
            <li className="menu-item">
              <a href="#0">Big Widgets</a>
            </li>
            <li className="menu-item">
              <a href="#0">Bigger Widgets</a>
            </li>
            <li className="menu-item">
              <a href="#0">Huge Widgets</a>
            </li>
          </ol> */}
        </li> 
        <li className="menu-item">
          <a href="/login">Login</a>
        </li>
        <li className="menu-item">
          <a href="/signup">Signup</a>
        </li>
      </ol>
    </nav>
  );
}

export default Navbar;