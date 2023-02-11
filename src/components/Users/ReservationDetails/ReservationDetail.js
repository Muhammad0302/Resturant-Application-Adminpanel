import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import EachDetail from "./EachDetail";

import "./ReservationDetail.css";

import seat from "..//..//..//assets/seat.png";
import resImg from "..//..//..//assets/resPic.png";
import locIcon from "..//..//..//assets/loc.png";
import reservationID from "..//..//..//assets/reservationid.png";
import calender from "..//..//..//assets/calender1.png";
import clock from "..//..//..//assets//clock1.png";

import city from "..//..//..//assets//user menu icons/city.png";
import purchasingcode from "..//..//..//assets//user menu icons//secret code.png";

import { ShowUserReservation } from "../../../API/services/ShowReservationdetails/ShowUserReservation";

function ReservationDetail() {
  const [userReservations, setUserReservations] = useState([]);
  const { state } = useLocation();
  const [err, setErr] = useState("");
  console.log(state.id);
  useEffect(() => {
    const getUserReservations = async () => {
      try {
        const response = await ShowUserReservation(state.id);
        setUserReservations(response.data.message);
      } catch (err) {
        setErr(err.response.statusText);
      }
    };

    getUserReservations();
  }, []);
  return (
    <div className="ReservationDetail">
      <div className="ReservationDetailWrapper">
        <h1>reservation details</h1>
        <div className="row gap-4 justify-content-center">
          <h1>{err}</h1>
          {userReservations.map((eachUser, index) => {
            return (
              <>
                <div
                  key={index}
                  className="reservationInfo py-3 col-md-6 col-sm-12"
                >
                  <ul className="list p-0">
                    <EachDetail
                      name="Restaurant"
                      icon={resImg}
                      value={eachUser.reservation.restaurant.restaurantName}
                    />
                    <div
                      style={{
                        border: "0.1px solid rgba(0, 0, 0, 0.2)",
                        margin: "1.5rem 0",
                      }}
                    ></div>
                    <EachDetail
                      name="City"
                      icon={city}
                      value={eachUser.reservation.restaurant.city.cityName}
                    />
                    <div
                      style={{
                        border: "0.1px solid rgba(0, 0, 0, 0.2)",
                        margin: "1.5rem 0",
                      }}
                    ></div>
                    <EachDetail
                      name="Seats"
                      icon={seat}
                      value={eachUser.reservation.seats}
                    />
                    <div
                      style={{
                        border: "0.1px solid rgba(0, 0, 0, 0.2)",
                        margin: "1.5rem 0",
                      }}
                    ></div>
                    <EachDetail
                      name="Location"
                      icon={locIcon}
                      value="Broadwày and, W 52nd St, New York"
                    />
                    <div
                      style={{
                        border: "0.1px solid rgba(0, 0, 0, 0.2)",
                        margin: "1.5rem 0",
                      }}
                    ></div>
                    <EachDetail
                      name="Time"
                      icon={clock}
                      value={eachUser.reservation.time}
                    />
                    <div
                      style={{
                        border: "0.1px solid rgba(0, 0, 0, 0.2)",
                        margin: "1.5rem 0",
                      }}
                    ></div>

                    <EachDetail
                      name="Date"
                      icon={calender}
                      value={eachUser.reservation.date}
                    />
                    <div
                      style={{
                        border: "0.1px solid rgba(0, 0, 0, 0.2)",
                        margin: "1.5rem 0",
                      }}
                    ></div>

                    <EachDetail
                      name="Payment"
                      icon={reservationID}
                      value={eachUser.reservation.price}
                    />
                    <div
                      style={{
                        border: "0.1px solid rgba(0, 0, 0, 0.2)",
                        margin: "1.5rem 0",
                      }}
                    ></div>

                    <EachDetail
                      name="Purchasing code"
                      icon={purchasingcode}
                      value={eachUser.reservation.code}
                    />
                  </ul>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ReservationDetail;
