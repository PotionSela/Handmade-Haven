import { Link } from "react-router-dom";
import "./Style/Header.css";
import Auth from "../utils/auth";

export default function Header() {
  const logout = (event) => {
    event.preventDefault();
    console.log('Logout button clicked');
    Auth.logout();
  };
  return (
    <header>
      <h1>Handmade Haven</h1>
      <nav>
        <div className="navbar-text">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link to="/">Dashboard</Link>
            </li>
            <div>
              {Auth.loggedIn() ? (
                <>
                  <button className="btn btn-lg btn-light m-2" onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className="btn btn-lg btn-info m-2" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-lg btn-light m-2" to="/signup">
                    Signup
                  </Link>
                </>
              )}
            </div>
            <li className="nav-item">
              <Link to="/my-projects">My Projects</Link>
            </li>
          </ul>
          </div>
      </nav>
    </header>
  );
}
