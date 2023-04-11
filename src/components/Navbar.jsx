import { UilPalette } from "@iconscout/react-unicons";
import { NavLink, useLocation } from "react-router-dom";
export default function Navbar(props) {
  const location = useLocation();

  return (
    <div className="navbar">
      <NavLink to="/">
        <div className="logo-title">
          <img className="logo" src="../../he-logo.png" />
          <p>healthengine</p>
        </div>
      </NavLink>
      {location.pathname.includes("schedule") && (
        <div className="settings-container">
          <div
            onClick={() =>
              props.setMgrState((prev) => ({
                ...prev,
                hideCC: !prev.hideCC,
              }))
            }
            className="settings"
          >
            <UilPalette size="35px" />
          </div>
        </div>
      )}
    </div>
  );
}
