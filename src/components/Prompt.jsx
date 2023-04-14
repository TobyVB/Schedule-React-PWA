export default function Prompt(props) {
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
        </div>
      </div>
    </div>
  );
}
