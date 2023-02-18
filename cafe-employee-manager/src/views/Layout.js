import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Cafes</Link>
          </li>
          <li>
            <Link to="/employees">Employees</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

