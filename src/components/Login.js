import React, { useState } from "react";
import Weather from "./Weather";
import userDetails from "./userDetails.json";

function Login() {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  function validateEmail(e) {
    setEmail(e.target.value);
  }

  function validatePassword(e) {
    setPassword(e.target.value);
  }

  function validateLogIn(e) {
    if (email === userDetails.email && password === userDetails.password) {
      e.preventDefault();
      setLoggedIn(true);
    }
  }

  return (
    <React.Fragment>
      {loggedIn === true ? (
        <Weather />
      ) : (
        <div className="form-container">
          <h2>Log in to the weather app</h2>
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
            App by{" "}
            <a href="https://github.com/dselasea" target="_blank">
              Daniel Selase
            </a>
          </p>
        </div>
      )}
    </React.Fragment>
  );
}

export default Login;
