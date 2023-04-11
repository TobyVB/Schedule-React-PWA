import { useState, useEffect } from "react";
import parse from "html-react-parser";

export default function ColorChanger(props) {
  const colors = [
    "#79FAEB",
    "#75E6E6",
    "#82EDFA",
    "#73E6CB",
    "#8AFFD6",
    "#78FFBB",
    "pink",
    "salmon",
  ];
  const types = [
    "Short Consultation",
    "Long Consultation",
    "Check-up",
    "Prescription",
    "Follow-up",
    "Vaccine",
  ];
  const [oColors, setOcolors] = useState([...props.mgrState.oColors]);

  const [selected, setSelected] = useState(null);

  function switchColor(chosenIdx) {
    if (selected === null) {
      return;
    }
    const clrArr = props.mgrState.colors;

    clrArr.splice(selected, 1, colors[chosenIdx]);
    props.setMgrState((prev) => ({
      ...prev,
      colors: [...clrArr],
    }));
    console.log(props.mgrState.oColors[0]);
  }

  return (
    <div className="color-changer-container">
      <div className="color-changer">
        <p>color slots</p>
        <div style={{ display: "flex", gap: ".5em", margin: "1em 0 1em 1em" }}>
          {props.mgrState &&
            types.map((type, idx) => {
              return (
                <div
                  onClick={() => setSelected(idx)}
                  className={`${
                    selected === idx
                      ? "selected chosen-colors"
                      : " chosen-colors"
                  }`}
                  style={{
                    height: "30px",
                    width: "30px",
                    background: props.mgrState.colors[idx],
                  }}
                ></div>
              );
            })}
        </div>

        <div className="choose-color">
          {colors.map((color, idx) => {
            return (
              <div
                onClick={() => switchColor(idx)}
                className="color"
                style={{
                  height: "50px",
                  width: "50px",
                  background: color,
                  marginLeft: "1em",
                }}
              ></div>
            );
          })}
        </div>
        {/* <input type="color"></input> */}
        <div className="color-btns-container">
          <button
            onClick={() =>
              props.setMgrState((prev) => ({
                ...prev,
                colors: oColors,
                hideCC: true,
              }))
            }
          >
            cancel
          </button>

          <button
            onClick={() =>
              props.setMgrState((prev) => ({
                ...prev,
                oColors: props.mgrState.colors,
                hideCC: true,
              }))
            }
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
