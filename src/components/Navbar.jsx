import {
  UilPalette,
  UilEye,
  UilUser,
  UilDownloadAlt,
} from "@iconscout/react-unicons";
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
          style={{
            gap: "1em",
            display: "flex",
            alignItems: "center",
            marginTop: "8px",
            marginRight: "1em",
          }}
        >
          <div className="settings" onClick={install}>
            <UilDownloadAlt />
          </div>
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
            <UilEye />
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
              <UilPalette />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
