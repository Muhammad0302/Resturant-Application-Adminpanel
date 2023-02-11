import React, { useState } from "react";
import "./reservationdetails.css";
import SingleReservationData from "./SingleReservationData";

import seat from "..//..//..//assets/seat.png";
import resImg from "..//..//..//assets/resPic.png";

import locIcon from "..//..//..//assets/loc.png";
import purchasingMsg from "..//..//..//assets//paymentsuccessful.png";
import reservationID from "..//..//..//assets/reservationid.png";
import calender from "..//..//..//assets/calender1.png";
import clock from "..//..//..//assets//clock1.png";
import city from "..//..//..//assets//user menu icons/city.png";
import purchasingcode from "..//..//..//assets//user menu icons//secret code.png";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
function ReservationDetails() {
  const { state } = useLocation();
  const reservationData = state.find((each) => each);
  // const [reservationData, setReservationData] = useState();
  console.log(state);
  // useEffect(() => {
  //   const data = state.find((each) => each);
  //   console.log(data);
  //   setReservationData(data);
  // }, []);

  return (
    <div className="PurchasedReservationDetail">
      <div className="PurchasedReservationDetailWrapper">
        <div className="reservationInfo py-3">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <img src={purchasingMsg} alt="" />
          </div>
          <ul className="list">
            <SingleReservationData
              name="Resturant"
              icon={resImg}
              value={reservationData.restaurant.restaurantName}
            />
            <div
              style={{
                border: "0.1px solid rgba(0, 0, 0, 0.2)",
                margin: "1rem 0",
              }}
            ></div>
            <SingleReservationData
              name="City"
              icon={city}
              value={reservationData.restaurant.city.cityName}
            />
            <div
              style={{
                border: "0.1px solid rgba(0, 0, 0, 0.2)",
                margin: "1rem 0",
              }}
            ></div>
            <SingleReservationData
              name="Seats"
              icon={seat}
              value={reservationData.seats}
            />
            <div
              style={{
                border: "0.1px solid rgba(0, 0, 0, 0.2)",
                margin: "1rem 0",
              }}
            ></div>
            <SingleReservationData
              name="Location"
              icon={locIcon}
              value={reservationData.restaurant.location}
            />
            <div
              style={{
                border: "0.1px solid rgba(0, 0, 0, 0.2)",
                margin: "1rem 0",
              }}
            ></div>
            <SingleReservationData
              name="Time"
              icon={clock}
              value={reservationData.time}
            />
            <div
              style={{
                border: "0.1px solid rgba(0, 0, 0, 0.2)",
                margin: "1rem 0",
              }}
            ></div>

            <SingleReservationData
              name="Date"
              icon={calender}
              value={reservationData.date}
            />
            <div
              style={{
                border: "0.1px solid rgba(0, 0, 0, 0.2)",
                margin: "1rem 0",
              }}
            ></div>

            <SingleReservationData
              name="Purchasing code"
              icon={purchasingcode}
              value={reservationData.code}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ReservationDetails;
