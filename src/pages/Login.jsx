import { NavLink, Link } from "react-router-dom";
export default function Login() {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-form">
        <input placeholder="email" />
        <input placeholder="password" />
        <Link to="./schedule">
          <button className="login-btn">Log in</button>
        </Link>
      </div>
    </div>
  );
}
