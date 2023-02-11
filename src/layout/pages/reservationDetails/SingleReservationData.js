import React from "react";
import "./reservationdetails.css";
function SingleReservationData({ icon, name, value }) {
  return (
    <li className="eachItem">
      <div className="label" style={{display:"flex",alignItems:"center"}}>
        <span
          className="d-flex align-items-center"
          style={{ fontSize: "1.2rem" }}
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
          </span>
          <p style={{fontSize:"1rem"}}>{name}</p>
   
     
      </div>
      <div style={{ width: "150px", textAlign: "end" }} className="value">
        {value}
      </div>
    </li>
  );
}

export default SingleReservationData;
