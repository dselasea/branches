import React, { useState } from "react";
import userDetails from "./userDetails.json";

function Login({ setLog }) {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");

  function validateEmail(e) {
    setEmail(e.target.value);
  }

  function validatePassword(e) {
    setPassword(e.target.value);
  }

  function validateLogIn(e) {
    let logged = true;
    if (email === userDetails.email && password === userDetails.password) {
      e.preventDefault();
      setLog(logged);
    }
  }

  return (
    <React.Fragment>
      <div className="form-container">
        <h2 style={{ color: "black" }}>Log in to the weather app</h2>
        <form className="login">
          <div>
            <label style={{ color: "black" }}>Name</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={validateEmail}
            />
          </div>
          <div>
            <label style={{ color: "black", marginTop: ".5rem" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={validatePassword}
            />
          </div>
          <button onClick={validateLogIn}>Log In</button>
        </form>
        <p style={{ marginTop: "1rem" }}>
          <span style={{ color: "black" }}>App by</span>{" "}
          <a href="https://github.com/dselasea" target="_blank">
            Daniel Selase
          </a>
        </p>
      </div>
    </React.Fragment>
  );
}

export default Login;
