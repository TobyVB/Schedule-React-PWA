import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import practitioners from "../../practitioners";

export default function Login() {
  const navigate = useNavigate();
  const users = practitioners;
  const [email, setEmail] = useState(localStorage.getItem("heLogin") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("hePassword") || ""
  );
  const [url, setUrl] = useState("");

  async function login() {
    new Promise((resolve, reject) => {
      resolve(
        localStorage.setItem("heLogin", email),
        localStorage.setItem("hePassword", password),
        users.practitioners.map((dr) => {
          if (dr.email === email && dr.password === password) {
            navigate(`schedule/${dr.email}`);
          }
        })
      ).then(() => {
        console.log(url);
      });
    });
  }
  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-form">
        <input
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
        <button onClick={() => login()} className="login-btn">
          Log in
        </button>
      </div>
    </div>
  );
}
