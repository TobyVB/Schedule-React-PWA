import { UilAngleLeftB, UilAngleRightB } from "@iconscout/react-unicons";
import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import bookings from "../../bookings.js";
import practitioners from "../../practitioners.js";
import ColorChanger from "../components/ColorChanger.jsx";

export default function Schedule() {
  const { email } = useParams();

  const appointments = bookings.bookings.filter(
    (booking) =>
      booking.practitioner ===
      practitioners.practitioners.filter((dr) => dr.email === email)[0].name
  );
  const [mgrState, setMgrState] = useOutletContext();

  const [day, setDay] = useState(1);
  const [dayName, setDayName] = useState("Monday");

  // console.log(mgrState.color1);
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
        {now.getHours() > 12 ? now.getHours() - 12 : now.getHours()}:
        {now.getMinutes() === 0 ? "00" : now.getMinutes()}
      </span>
    );
  }

  const arrAppointments = appointments
    .filter((elm) => elm.day === day)
    .sort(function (a, b) {
      let n = a.startTimeH - b.startTimeH;
      if (n !== 0) {
        return n;
      }
      return a.startTimeM - b.startTimeM;
    });

  function findSmallestValue(objects, key) {
    let smallestValue = Number.MAX_VALUE; // start with the largest possible number
    for (let i = 0; i < objects.length; i++) {
      if (objects[i][key] < smallestValue) {
        smallestValue = objects[i][key];
      }
    }
    return smallestValue;
  }
  function findLargestValue(objects, key) {
    let largestValue = Number.MIN_VALUE; // start with the smallest possible number
    for (let i = 0; i < objects.length; i++) {
      if (objects[i][key] > largestValue) {
        largestValue = objects[i][key];
      }
    }
    return largestValue;
  }
  function createWholeNumberArray(startNum, endNum) {
    const result = [];
    for (let i = startNum; i <= endNum; i++) {
      if (Number.isInteger(i)) {
        result.push(i);
      }
    }
    return result;
  }

  const startHour = findSmallestValue(arrAppointments, "startTimeH");
  const endHour = findLargestValue(arrAppointments, "startTimeH") + 1;
  const dailyTimeIndex = createWholeNumberArray(startHour, endHour);

  function Gap(props) {
    const prev = props.prev;
    const current = props.current;
    const index = props.index;
    const arrIndex = props.thisIndex;
    if (index === 0 && current === 0) {
      return;
    } else if (index === 0 && current > 0) {
      const gapSize = current * 1.666 * 2;
      return <div style={{ height: `${gapSize}px` }}></div>;
    }
    if (
      arrAppointments[arrIndex].startTimeM ===
      arrAppointments[arrIndex - 1].endTimeM
    ) {
      return;
    }
    if (prev < current) {
      const gapSize = (current - prev) * 1.666 * 2;
      return <div style={{ height: `${gapSize}px` }}>{props.thisIndex}</div>;
    }
  }

  function applyColor(type) {
    if (type === "Short Consultation") {
      return mgrState.colors[0];
    }
    if (type === "Long Consultation") {
      return mgrState.colors[1];
    }
    if (type === "Check-up") {
      return mgrState.colors[2];
    }
    if (type === "Prescription") {
      return mgrState.colors[3];
    }
    if (type === "Follow-up") {
      return mgrState.colors[4];
    }
    if (type === "Vaccine") {
      return mgrState.colors[5];
    }
  }

  return (
    <>
      {!mgrState.hideCC && (
        <ColorChanger setMgrState={setMgrState} mgrState={mgrState} />
      )}
      <div>
        <h1>Greetings, {appointments[0].practitioner}</h1>

        <div className="appointments">
          <div className="day-selector">
            <button
              disabled={day === 1}
              onClick={() => setDay((prev) => prev - 1)}
            >
              <UilAngleLeftB size="50px" />
            </button>

            <h1>{dayName}</h1>
            <button
              disabled={day === 7}
              onClick={() => setDay((prev) => prev + 1)}
            >
              <UilAngleRightB size="50px" />
            </button>
          </div>

          {dailyTimeIndex &&
            dailyTimeIndex.map((ti, idx) => {
              return (
                <div key={idx} className="time-index">
                  <div className="time-panel">
                    <Time hour={8 + idx} minute={0} />
                  </div>
                  <div className="appointmentsInner">
                    {arrAppointments
                      .filter((elem) => elem.startTimeH === 8 + idx)
                      .map((appointment, idx2) => {
                        return (
                          <>
                            <Gap
                              thisIndex={arrAppointments.findIndex(
                                (obj) =>
                                  obj.startTimeH === appointment.startTimeH &&
                                  obj.startTimeM === appointment.startTimeM &&
                                  obj.day === appointment.day
                              )}
                              prev={
                                idx2 > 0 && arrAppointments[idx2 - 1].endTimeM
                              }
                              current={appointment.startTimeM}
                              index={idx2}
                              cp={appointment.patient}
                              pp={
                                idx2 > 0
                                  ? arrAppointments[idx2 - 1].patient
                                  : "no patient"
                              }
                            />
                            <div
                              className="appointment-container"
                              style={{
                                height: `${appointment.duration * 1.666 * 2}px`,
                                width: "100%",
                              }}
                              key={idx2}
                            >
                              <div
                                className="appointment"
                                style={{
                                  background: applyColor(appointment.type),
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span
                                    style={{
                                      display: "flex",
                                      gap: "1em",
                                    }}
                                  >
                                    <p style={{ display: "flex" }}>
                                      <Time
                                        hour={appointment.startTimeH}
                                        minute={appointment.startTimeM}
                                      />
                                      -
                                      <Time
                                        hour={appointment.endTimeH}
                                        minute={appointment.endTimeM}
                                      />
                                    </p>
                                    <p>{appointment.type}</p>
                                  </span>
                                  <p>{appointment.patient}</p>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
