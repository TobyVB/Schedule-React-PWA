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
        {now.getHours() > 12 ? now.getHours() - 12 : now.getHours()}:
        {now.getMinutes() === 0 ? "00" : now.getMinutes()}
      </span>
    );
  }

  // find  appointment with earliest starting time hour for a given doctor
  // That will be the starting time of the time-index;
  // find the lastest appoint for that doctor and get the ending time.
  // if ending minutes are at 0 set that as the ending hour
  // if ending minutes > 0, that hour+1 will be the ending hour

  // create timeIndex hour makerfunction
  // create timeIndex day makerfunction

  // the day maker function will call the timeIndex hour maker function
  // for endingHour-startingHour times
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

    console.log("this " + props.cp + " " + current);
    console.log("prev " + props.pp + " " + prev);
    console.log("index " + index);
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

        {dailyTimeIndex &&
          dailyTimeIndex.map((ti, idx) => {
            return (
              <div key={idx} className="time-index">
                <div className="time-panel">
                  <Time hour={8 + idx} minute={0} />
                </div>
                <div style={{ width: "100%", padding: "0 .5em" }}>
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
                            <div className="appointment">
                              <p>{appointment.type}</p>
                              <div>
                                <p>{appointment.patient}</p>
                                <span style={{ display: "flex" }}>
                                  <Time
                                    hour={appointment.startTimeH}
                                    minute={appointment.startTimeM}
                                  />
                                  -
                                  <Time
                                    hour={appointment.endTimeH}
                                    minute={appointment.endTimeM}
                                  />
                                </span>
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
  );
}
