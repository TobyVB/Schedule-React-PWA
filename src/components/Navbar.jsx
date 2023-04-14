import { UilPalette, UilEye, UilUser } from "@iconscout/react-unicons";
import { NavLink, useLocation } from "react-router-dom";
import { usePWAInstall } from "react-use-pwa-install";

export default function Navbar(props) {
  const install = usePWAInstall();
  const location = useLocation();

  return (
    <div className="navbar">
      <NavLink to="/">
        <div className="logo-title">
          <img alt="logo" className="logo" src="../../he-logo.png" />
          <p>healthengine</p>
        </div>
      </NavLink>

      {location.pathname.includes("schedule") && (
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "8px" }}
        >
          {/* {<button onClick={install}>Install</button>} */}
          <div
            className="settings"
            onClick={() =>
              props.setMgrState((prev) => ({
                ...prev,
                prompt: !prev.prompt,
              }))
            }
          >
            <UilUser />
          </div>
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
