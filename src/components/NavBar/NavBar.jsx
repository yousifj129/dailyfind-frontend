import { Link } from "react-router"
import LogoutButton from "../LogoutButton/LogoutButton";
const NavBar = ({token, handleLogout}) =>{
    return(
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/signup">signup</Link>
          </li>
            <li>
                {token ? <LogoutButton onLogout={handleLogout} /> : null}
            </li>
        </ul>
      </nav>
    )
}

export default NavBar