import { useState, useEffect, useRef } from "react";
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

  const divRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  const [updater, setUpdater] = useState(false);

  const [centeredIndex, setCenteredIndex] = useState(null);

  function scroller() {
    const interval = setInterval(() => {
      setUpdater((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }

  function letColorSet() {
    setSelected(centeredIndex);
  }

  const [firstType, setFirstType] = useState("");
  const [lastType, setLastType] = useState("");

  useEffect(() => {
    const divElement = divRef.current;
    const center = divElement.offsetWidth / 2;
    const childElements = divElement.children;
    let centeredIndex = null;

    for (let i = 0; i < childElements.length; i++) {
      const element = childElements[i];
      const offsetLeft = element.offsetLeft;
      const elementWidth = element.offsetWidth;
      const elementCenter = offsetLeft + elementWidth / 2;

      if (elementCenter > center + divElement.scrollLeft) {
        centeredIndex = i;
        break;
      }
      const first = childElements[0];
      const last = childElements[types.length - 1];

      // MAKING A WAY TO DETERMINE IF USE HAS SCROLLED TO BEGGINNING OR END SO
      // THE EITHER THE FIRST OR LAST LITTLE SQUARES CAN ANIMATE TO SHOW YOU'RE
      // AT THE END
      //     setFirstType("")
      //     setLastType("")
      //   if (last > divElement.offsetWidth - 20) {
      //     setLastType("lastType");
      //   } else if (first)
    }

    if (centeredIndex === null) {
      centeredIndex = childElements.length - 1;
    }

    setCenteredIndex(centeredIndex);
  }, [updater]);

  return (
    <div className="color-changer-container">
      <div className="color-changer">
        <p style={{ textAlign: "center", fontWeight: "500" }}>
          {types[centeredIndex]}
        </p>
        <div
          style={{
            width: "150px",
            margin: "0 auto",
          }}
        >
          <div
            className="types-color"
            onMouseLeave={() => letColorSet()}
            onScroll={() => scroller()}
            ref={divRef}
            style={{
              overflowX: "scroll",
              whiteSpace: "nowrap",
              display: "flex",
              gap: "50px",
              padding: "0 50px",
              scrollBehavior: "linear",
              scrollSnapType: "x mandatory",
              scrollbars: "none",
            }}
          >
            {props.mgrState &&
              types.map((type, idx) => {
                return (
                  <div
                    className={
                      idx === 0
                        ? { firstType }
                        : idx === types.length - 1
                        ? { lastType }
                        : ""
                    }
                    onClick={() => setSelected(idx)}
                    style={{
                      scrollSnapAlign: "center",
                      minHeight: "50px",
                      minWidth: "50px",
                      background: props.mgrState.colors[idx],
                    }}
                  ></div>
                );
              })}
          </div>
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
