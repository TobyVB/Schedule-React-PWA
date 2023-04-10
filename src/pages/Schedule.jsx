import { useState, useEffect } from "react";
import bookings from "../../bookings.js";

export default function Schedule() {
  const appointments = bookings.bookings.filter(
    (booking) => booking.practitioner === "Dr. Garcia"
  );
  const [day, setDay] = useState(1);
  const [dayName, setDayName] = useState("Monday");

  useEffect(() => {
    if (day === 1 || day === 6) {
      setDayName("Monday");
    }
    if (day === 2 || day === 7) setDayName("Tuesday");
    if (day === 3) {
      setDayName("Wednesday");
    }
    if (day === 4) {
      setDayName("Thursday");
    }
    if (day === 5) {
      setDayName("Friday");
    }
  }, [day]);

  function Time(props) {
    let now = new Date();
    now.setDate(now.getDate() + 1);
    now.setHours(props.hour);
    now.setMinutes(props.minute);
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
      <h1>Greetings, {appointments[0].practitioner}</h1>

      <div className="appointments">
        <div className="day-selector">
          <button
            disabled={day === 1}
            onClick={() => setDay((prev) => prev - 1)}
          >
            prev
          </button>
          <button
            disabled={day === 7}
            onClick={() => setDay((prev) => prev + 1)}
          >
            next
          </button>
        </div>
        <h1>{dayName}</h1>
        {appointments
          .filter((elm) => elm.day === day)
          .map((appointment, idx) => {
            return (
              <div className="appointment-container">
                <div className="time-index">
                  <p>
                    <Time
                      hour={appointment.startTimeH}
                      minute={appointment.startTimeM}
                    />{" "}
                  </p>
                </div>
                <div className="appointment" key={idx}>
                  <div
                    style={{
                      margin: "1em 0",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    <Time
                      hour={appointment.startTimeH}
                      minute={appointment.startTimeM}
                    />{" "}
                    -
                    <Time
                      hour={appointment.endTimeH}
                      minute={appointment.endTimeM}
                    />
                  </div>
                  <p style={{ fontWeight: "bold" }}>{appointment.type}</p>
                  <p>{appointment.patient}</p>

                  <p>{appointment.duration} minutes</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
