import "../css/navbar.scss";

function Navbar() {
  return (
    <nav className="menu">
      <ol>
        <li className="menu-item">
          <a href="/">Home</a>
        </li>
        <li className="menu-item">
          <a href="#0">About</a>
        </li>
        <li className="menu-item">
          <a href="/profile">Profile</a>
          <ol className="sub-menu">
            <li className="menu-item">
              <a href="/weekly-mood">weekly mood</a>
            </li>
          </ol>
        </li>
        <li className="menu-item">
          <a href="/weekly-mood">weekly mood</a>
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
