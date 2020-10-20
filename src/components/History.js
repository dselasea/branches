import React, { useState, useEffect } from "react";

function History({ setLog, history }) {
  const [loadData, setLoadData] = useState([]);

  // Logged Out function
  function logOut() {
    setLog(false);
  }

  // When component is loaded

  useEffect(() => {
    localStorage.setItem("country", JSON.stringify(history));
  }, [history]);

  return (
    <React.Fragment>
      <div className="history-container">
        <h2 style={{ color: "black" }}>History</h2>
        {history.map((his, index) => {
          return (
            <div key={index}>
              <h3 style={{ color: "black", marginBottom: ".5rem" }}>
                {his.country}
              </h3>
            </div>
          );
        })}
        <button onClick={logOut}>Log Out</button>
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

export default History;
