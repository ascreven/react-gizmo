import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/">
          <span className="navbar-brand">React App</span>
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/movies" activeClassName="active">
                <span className="nav-link">Movies</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/shows" activeClassName="active">
                <span className="nav-link">Shows</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/genres" activeClassName="active">
                <span className="nav-link">Genres</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
