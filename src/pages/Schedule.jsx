import { UilAngleLeftB, UilAngleRightB } from "@iconscout/react-unicons";
import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import bookings from "../../bookings.js";
import practitioners from "../../practitioners.js";
import ColorChanger from "../components/ColorChanger.jsx";
import Prompt from "../components/Prompt.jsx";

export default function Schedule() {
  // Get url parameter
  const { id } = useParams();

  // Create variable to get practitioner object in array of data 'practitioners'
  // Filter array of data 'bookings', and create new array of bookings where value
  // of key 'practioner' matches value of variable 'practioner'
  const practitioner = practitioners.practitioners.find((dr) => dr.id === id);
  const appointments = bookings.bookings.filter(
    (booking) => booking.practitioner === practitioner.name
  );

  // Get access to useState hook from parent file
  const [mgrState, setMgrState] = useOutletContext();

  const [day, setDay] = useState(1);
  const [dayName, setDayName] = useState("");

  useEffect(() => {
    setMgrState((prev) => {
      return { ...prev, name: practitioner.name };
    });
  });

  // This useEffect hook is triggered once initially.
  // It sets the 'dayName' to a value depending on the value of state 'day'.
  // The hook is then ran everytime the state 'day' changes.
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

  // This Time component takes in props (hour & minute).
  // The time component takes these integers and creates a date object
  // that is stored in the now variable.
  // Then in the JSX the date object is referenced to create a clock
  function Time(props) {
    let nowS = new Date();
    nowS.setDate(nowS.getDate() + 1);
    nowS.setHours(props.booking.startTimeH);
    nowS.setMinutes(props.booking.startTimeM);
    nowS.setSeconds(0);
    nowS.setMilliseconds(0);
    let nowE = new Date();
    nowE.setDate(nowE.getDate() + 1);
    nowE.setHours(props.booking.endTimeH);
    nowE.setMinutes(props.booking.endTimeM);
    nowE.setSeconds(0);
    nowE.setMilliseconds(0);

    return (
      <p style={{ display: "flex" }}>
        <div>
          <span>
            {nowS.getHours() > 12 ? nowS.getHours() - 12 : nowS.getHours()}:
            {nowS.getMinutes() === 0 ? "00" : nowS.getMinutes()}
          </span>
          -
          <span>
            {nowE.getHours() > 12 ? nowE.getHours() - 12 : nowE.getHours()}:
            {nowE.getMinutes() === 0 ? "00" : nowE.getMinutes()}
          </span>
        </div>
      </p>
    );
  }
  //
  function calcTime(hour, min) {
    let now = new Date();
    now.setDate(now.getDate() + 1);
    now.setHours(hour);
    now.setMinutes(min);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
  }
  //

  // Create an array out of the appointments array where the key 'day'
  // matches the value of the state variable 'day'. Then sort that
  // array by prioritizing the hour, then minute values from least to greatest
  const arrAppointments = appointments
    .filter((elm) => elm.day === day)
    .sort(function (a, b) {
      let n = a.startTimeH - b.startTimeH;
      if (n !== 0) {
        return n;
      }
      return a.startTimeM - b.startTimeM;
    });

  // Finds smallest value of object key in an array
  // This function is called to find the first hour of the first booking
  function findSmallestValue(objects, key) {
    let smallestValue = Number.MAX_VALUE; // start with the largest possible number
    for (let i = 0; i < objects.length; i++) {
      if (objects[i][key] < smallestValue) {
        smallestValue = objects[i][key];
      }
    }
    return smallestValue;
  }
  // Finds largest value of object key in an array
  // This function is called to find the last hour of the last booking
  function findLargestValue(objects, key) {
    let largestValue = Number.MIN_VALUE; // start with the smallest possible number
    for (let i = 0; i < objects.length; i++) {
      if (objects[i][key] > largestValue) {
        largestValue = objects[i][key];
      }
    }
    return largestValue;
  }
  const startHour = findSmallestValue(arrAppointments, "startTimeH");
  const endHour = findLargestValue(arrAppointments, "startTimeH") + 1;
  // Creates an array of integer items that have values that start with
  // value of 'startHour' and range to a value of 'endHour'
  function createWholeNumberArray() {
    const result = [];
    for (let i = startHour; i <= endHour; i++) {
      if (Number.isInteger(i)) {
        result.push(i);
      }
    }
    return result;
  }

  //  Gap component creates a div. This component is placed
  // before every booking object is mapped. Depending on the
  // difference between the start time of the current booking being mapped
  // and the end time of the last booking mapped there will be a corresponding
  // gap height.
  function Gap(props) {
    if (props.thisIndex > 0 && arrAppointments) {
      const arr = arrAppointments;
      const idx = props.thisIndex;
      const endOfLast = calcTime(arr[idx - 1].endTimeH, arr[idx - 1].endTimeM);
      const startOfFirst = calcTime(arr[idx].startTimeH, arr[idx].startTimeM);
      const diffInMs = startOfFirst.getTime() - endOfLast.getTime();
      const diffInMinutes = diffInMs / (1000 * 60);
      if (props.mini === false) {
        return <div style={{ height: `${diffInMinutes * 1.666 * 2}px` }}></div>;
      } else {
        return (
          <div
            style={{
              height: `${
                (timeSize("getHour") * diffInMinutes * 1.666) / 100
              }vh`,
            }}
          ></div>
        );
      }
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

  // function creates a hour variable with a value of (1/ number of hours)
  // then creates a task size variable. Because a booking's duration is in minutes,
  // the duration must be be multiplied by 1.666, then divided by 100 to get it's fraction of 1.
  // lastly the hour size is muliplied by this new fraction of 1 to get
  // the fraction of the duration to the total number of hours.
  function timeSize(dur) {
    const hourSize = 100 / (endHour - startHour);
    const taskSize = hourSize * ((dur * 1.666) / 100);
    if (dur === "getHour") {
      return hourSize;
    } else {
      return taskSize;
    }
  }

  // COMPONENTS

  function DaySelector(props) {
    return (
      <div className="day-selector">
        <button
          name="day left"
          disabled={day === 1}
          onClick={() => setDay((prev) => prev - 1)}
        >
          <UilAngleLeftB size="50px" />
        </button>

        <h1>{dayName}</h1>
        <button
          name="day right"
          disabled={day === 7}
          onClick={() => setDay((prev) => prev + 1)}
        >
          <UilAngleRightB size="50px" />
        </button>
      </div>
    );
  }
  function TimePanel(props) {
    let size = 0;
    let unit = "";
    if (props.mini === false) {
      size = 200;
      unit = "px";
    } else if (props.mini === true) {
      size = timeSize("getHour");
      unit = "vh";
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // width: "0px",
        }}
      >
        {createWholeNumberArray().map((time, idx) => {
          return (
            <div
              key={idx}
              style={
                !props.mini
                  ? {
                      width: "58vw",
                      height: `${size}${unit}`,
                      borderTop: "1px dashed rgba(0,0,0,.5)",
                      marginTop: "-1px",
                    }
                  : {
                      width: "58vw",
                      height: `${size}${unit}`,
                      borderTop: "1px dashed rgba(0,0,0,.5)",
                    }
              }
            >
              {time > 12 ? time - 12 : time}:00
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      {!mgrState.hideCC && (
        <ColorChanger setMgrState={setMgrState} mgrState={mgrState} />
      )}
      {mgrState.prompt && (
        <Prompt
          data={arrAppointments}
          setMgrState={setMgrState}
          mgrState={mgrState}
        />
      )}
      <div className="total-container">
        {/* {mgrState.regView && <h1>Greetings, {appointments[0].practitioner}</h1>} */}

        {mgrState.regView ? (
          <>
            <DaySelector />
            <div className="opt-1-container">
              <div
                style={{
                  display: "flex",
                  height: `${200 * createWholeNumberArray().length}px`,
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    marginLeft: "-50px",
                    position: "absolute",
                  }}
                >
                  <TimePanel mini={false} />
                </div>
                <div className="appointments" style={{ flexGrow: "1" }}>
                  <div className="appointmentsInner">
                    {arrAppointments.map((appointment, idx) => {
                      return (
                        <>
                          <Gap
                            thisIndex={arrAppointments.findIndex(
                              (obj) =>
                                obj.startTimeH === appointment.startTimeH &&
                                obj.startTimeM === appointment.startTimeM
                            )}
                            mini={false}
                          />
                          <div
                            className="appointment"
                            style={{
                              background: applyColor(appointment.type),
                              height: `${appointment.duration * 1.666 * 2}px`,
                            }}
                          >
                            <span
                              style={{
                                display: "flex",
                                gap: "1em",
                                justifyContent: "space-between",
                              }}
                            >
                              <span style={{ display: "flex", gap: "2em" }}>
                                <Time booking={appointment} />
                                <p>{appointment.type}</p>
                              </span>
                              <p>{appointment.patient}</p>
                            </span>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <DaySelector />
            <div className="opt-2-container">
              <div
                style={{
                  height: `112vh`,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    marginTop: `-${
                      timeSize("getHour") * (createWholeNumberArray.length - 2)
                    }
                  }vh`,
                    marginLeft: "-50px",
                    position: "absolute",
                  }}
                >
                  <TimePanel mini={true} />
                </div>
                <div className="appointments" style={{ flexGrow: "1" }}>
                  <div className="appointmentsInner">
                    {arrAppointments.map((appointment, idx) => {
                      return (
                        <>
                          <Gap
                            thisIndex={arrAppointments.findIndex(
                              (obj) =>
                                obj.startTimeH === appointment.startTimeH &&
                                obj.startTimeM === appointment.startTimeM
                            )}
                            mini={true}
                          />
                          <div
                            className="appointmentMini"
                            style={{
                              height: `${timeSize(appointment.duration)}vh`,
                              background: applyColor(appointment.type),
                            }}
                          >
                            <div
                              style={{
                                fontSize: ".65rem",
                                lineHeight: "0",
                                fontWeight: "bold",
                                display: "flex",
                                gap: "3em",
                              }}
                            >
                              <Time booking={appointment} />
                              <p>{appointment.type}</p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
