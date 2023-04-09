import bookings from "../../bookings.js";

export default function Schedule() {
  const appointments = bookings.bookings.filter(
    (booking) => booking.practitioner === "Dr. Garcia"
  );

  function Time(props) {
    let now = new Date();
    now.setDate(now.getDate() + 1);
    now.setHours(props.time);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    return (
      <span>
        {now.toLocaleTimeString()}
        {/* {now.toLocaleDateString()} */}
      </span>
    );
  }

  //   console.log(appointments.practitioner);
  return (
    <div>
      <h2>{appointments[0].practitioner}</h2>
      {appointments.map((appointment, idx) => {
        return (
          <>
            <div
              key={idx}
              style={{ border: "1px solid black", padding: "1em" }}
            >
              <p>{appointment.patient}</p>

              <p>{appointment.type}</p>
              <div
                style={{
                  margin: "1em 0",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                <Time time={appointment.startTime} /> -
                <Time time={appointment.endTime} />
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
