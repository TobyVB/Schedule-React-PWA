import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function SharedLayout() {
  const [mgrState, setMgrState] = useState({
    colors: [
      "#79FAEB",
      "#75E6E6",
      "#82EDFA",
      "#73E6CB",
      "#8AFFD6",
      "#78FFBB",
      "pink",
      "#cdb4db",
      "#ffc8dd",
      "#ffafcc",
      "#bde0fe",
      "#a2d2ff",
    ],
    oColors: [
      "#79FAEB",
      "#75E6E6",
      "#82EDFA",
      "#73E6CB",
      "#8AFFD6",
      "#78FFBB",
      "pink",
      "#cdb4db",
      "#ffc8dd",
      "#ffafcc",
      "#bde0fe",
      "#a2d2ff",
    ],
    hideCC: true,
    regView: true,
  });

  return (
    <div>
      <Navbar setMgrState={setMgrState} mgrState={mgrState} />
      <div className="content">
        <Outlet context={[mgrState, setMgrState]} />
      </div>
    </div>
  );
}
