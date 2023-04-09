import { NavLink, Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="navbar">
      <NavLink to="/">
        <div className="logo-title">
          <img className="logo" src="../../he-logo.png" />
          <p>healthengine</p>
        </div>
      </NavLink>
    </div>
  );
}
