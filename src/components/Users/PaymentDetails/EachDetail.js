import React from "react";
import "./paymentdetails.css";
function EachDetail({ icon, name, value }) {
  return (
    <li className="px-4 d-flex justify-content-between">
      <div className="label">
        <span
          className="d-flex align-items-center"
          style={{ fontSize: "1rem" }}
        >
          <img
            style={{
              width: "18px",
              objectFit: "cover",
              marginRight: "0.5rem",
            }}
            src={icon}
            alt=""
          />
          {name}
        </span>
      </div>
      <div className="value">{value}</div>
    </li>
  );
}

export default EachDetail;
