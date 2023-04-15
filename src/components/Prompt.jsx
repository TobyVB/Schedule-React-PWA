import { useState } from "react";
import Say from "react-say";
export default function Prompt(props) {
  const [speak, setSpeak] = useState(false);
  const filteredData = [];
  const stringArr = props.data.map((booking) => {
    filteredData.push(booking.type);
  });

  const result = filteredData.reduce((acc, curr) => {
    const index = acc.findIndex((item) => item.name === curr);
    if (index !== -1) {
      acc[index].quantity += 1;
    } else {
      acc.push({ name: curr, quantity: 1 });
    }
    return acc;
  }, []);

  const output = result.map((item) => `${item.quantity} ${item.name}`);

  function toggleSpeak() {
    setSpeak((prev) => !prev);
  }

  const vocal = `Today you have ${output.map((item, idx) => {
    return `${item}s, `;
  })}`;

  const vocal2 = `Your day starts with ${props.data.map((booking, idx) => {
    const textStr = [];

    if (idx === 1) {
      textStr.push("then");
    }
    if (idx === props.data.length - 1) {
      textStr.push("and");
    }
    textStr.push(
      ` a ${booking.type} at ${
        booking.startTimeH > 12 ? booking.startTimeH - 12 : booking.startTimeH
      }:${booking.startTimeM == 0 ? "" : booking.startTimeM}`
    );

    return textStr;
  })}`;

  return (
    <div className="color-changer-container" style={{ padding: "2em 0" }}>
      <div className="color-changer" style={{ padding: "0 2em" }}>
        <h3>Greetings, {props.practitioner.name}</h3>
        <p>
          You're day starts with a {props.data[0].type.toLowerCase()}, then a{" "}
          {props.data[1].type.toLowerCase()}.
        </p>
        <div style={{ margin: "5em auto" }}>
          {output.map((item, idx) => {
            return <p key={idx}>{item}(s)</p>;
          })}
        </div>

        <div className="color-btns-container">
          <button
            name="cancel"
            onClick={() =>
              props.setMgrState((prev) => ({
                ...prev,
                prompt: false,
              }))
            }
          >
            cancel
          </button>
          <button onClick={() => toggleSpeak()}>voice</button>
          {speak && (
            <Say
              pitch={1.1}
              rate={0.9}
              speak="A quick brown fox jumped over the lazy dogs."
              volume={0.8}
              text={JSON.stringify(vocal2)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
