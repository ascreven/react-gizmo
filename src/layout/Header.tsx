import { Link, NavLink } from "react-router-dom";
import { IRoute } from "../models/route.model";
import { ROUTES } from "../routes";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/">
          <span className="navbar-brand">React App</span>
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            {ROUTES.map((route: IRoute, index: number) => (
              <li key={index} className="nav-item">
                <NavLink to={route.path} activeClassName="active">
                  <span className="nav-link">{route.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
