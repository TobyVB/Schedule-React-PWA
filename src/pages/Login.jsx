import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import practitioners from "../../practitioners";

export default function Login() {
  const navigate = useNavigate();

  const users = practitioners;

  // if email or password are in local storage, set the states as the
  // value in storage respectively, otherwise set the state as an empty string.
  const [email, setEmail] = useState(localStorage.getItem("heLogin") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("hePassword") || ""
  );

  async function login() {
    // find user with email that matched typed email,
    // and if their password matched the typed password,
    // then navigat to the schedule path using their id as the parameter.
    new Promise((resolve, reject) => {
      const practitioner = users.practitioners.find(
        (dr) => dr.email === email.toLowerCase() && dr.password === password
      );
      if (practitioner) {
        localStorage.setItem("heLogin", email);
        localStorage.setItem("hePassword", password);
        navigate(`schedule/${practitioner.id}`);
        resolve();
      } else {
        reject(alert("Login information is incorrect"));
      }
    });
  }
  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-form">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="password"
        />
        <button name="login" onClick={() => login()} className="login-btn">
          Log in
        </button>
      </div>
    </div>
  );
}
