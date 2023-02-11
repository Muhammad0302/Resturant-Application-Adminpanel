import React from "react";

import "./ReservationDetail.css";
function EachDetail({ icon, name, value }) {
  return (
    <li className="px-5 eachItem d-flex justify-content-between">
      <div className="label">
        <span
          className="d-flex align-items-center"
          style={{ fontSize: "1.1rem" }}
        >
          <img
            style={{
              width: "17px",

              objectFit: "contain",
              marginRight: "0.5rem",
            }}
            src={icon}
            alt=""
          />
          {name}
        </span>
      </div>
      <div style={{ width: "150px", textAlign: "end" }} className="value">
        {value}
      </div>
    </li>
  );
}

export default EachDetail;
