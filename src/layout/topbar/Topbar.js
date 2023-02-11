import React from "react";
import "./Topbar.css";

import logo from "..//..//assets/Layer 2.png";

function Topbar({ text }) {
  return (
    <div className="topbar position-relative">
      <div className="logo d-flex gap-2  align-items-center h-100 mx-4 w-50">
        <img src={logo} alt="" style={{ width: "250px" }} />
      </div>
      <div
        className="d-flex position-absolute w-100 h-100 justify-content-center align-items-center"
        style={{ top: 0 }}
      >
        <h1
          className="title mb-0"
          style={{
            color: "white",
            fontSize: "1.4rem",
            fontFamily: "Inter",
            letterSpacing: "1.5px",
          }}
        >
          {text}
        </h1>
      </div>
    </div>
  );
}

export default Topbar;
