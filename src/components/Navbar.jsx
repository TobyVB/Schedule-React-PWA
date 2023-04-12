import { UilPalette, UilEye } from "@iconscout/react-unicons";
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
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "8px" }}
        >
          <div
            className="settings"
            onClick={() =>
              props.setMgrState((prev) => ({
                ...prev,
                regView: !prev.regView,
              }))
            }
          >
            <UilEye size="35" />
          </div>{" "}
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
        </div>
      )}
    </div>
  );
}
