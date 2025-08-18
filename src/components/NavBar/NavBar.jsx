import { Link } from "react-router";
import LogoutButton from "../LogoutButton/LogoutButton";
import "./NavBar.css";
const NavBar = ({ token, handleLogout }) => {
  return (
    <nav className="navbar">
      <ul className="navlist">
        <li className="navitem">
          <Link to="/">Home</Link>
        </li>
        {!token ? (
          <>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/signup">signup</Link>
            </li>
          </>
        ) : null}
        {token ? (
          <>
            <li>
              <Link to="/new">New Item</Link>
            </li>
            <li>
              <LogoutButton onLogout={handleLogout} />
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default NavBar;
