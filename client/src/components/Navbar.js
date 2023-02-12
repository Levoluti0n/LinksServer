import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const auth = useContext(AuthContext);
  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
  };
  return (
    <div className="bar">
      <h3>Short Links</h3>
      <div className="bar-right">
        <NavLink to={"/create"}>
          <div className="routes">
            <label>Create</label>
          </div>
        </NavLink>

        <NavLink to={"/links"}>
          <div className={"routes"}>
            <label>Links</label>
          </div>
        </NavLink>

        <div className="routes" onClick={logoutHandler}>
          Logout
        </div>
      </div>
    </div>
  );
}
