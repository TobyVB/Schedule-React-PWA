import { useState, useEffect } from "react";
import {
  UilPalette,
  UilEye,
  UilUser,
  UilDownloadAlt,
} from "@iconscout/react-unicons";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar(props) {
  const location = useLocation();

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [downloadVisible, setDownloadVisible] = useState(false);

  function showAddToHomeScreenButton() {
    setDownloadVisible(true);
  }

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  function handleBeforeInstallPrompt(e) {
    e.preventDefault();
    setDeferredPrompt(e);
    showAddToHomeScreenButton();
  }

  function addToHomeScreen() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User added to home screen");
        } else {
          console.log("User did not add to home screen");
        }
        setDeferredPrompt(null);
      });
    }
  }

  return (
    <div className="navbar">
      <NavLink to="/">
        <div className="logo-title">
          <img
            alt="logo"
            className="logo"
            src="../../icons/manifest-icon-512.maskable.png"
          />
          <p>Schedule</p>
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
          {downloadVisible && (
            <div className="settings" onClick={() => addToHomeScreen()}>
              <UilDownloadAlt onClick />
            </div>
          )}
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
