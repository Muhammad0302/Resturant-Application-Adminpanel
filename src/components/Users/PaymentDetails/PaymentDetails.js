import React, { useState, useEffect } from "react";
import "./paymentdetails.css";
import { useLocation } from "react-router-dom";

import EachDetail from "./EachDetail";

import seat from "..//..//..//assets/seat.png";
import resImg from "..//..//..//assets/resPic.png";
import user from "..//..//..//assets/user.png";
import reservationID from "..//..//..//assets/reservationid.png";
import calender from "..//..//..//assets/calender1.png";

import { ShowUserReservation } from "../../../API/services/ShowReservationdetails/ShowUserReservation";
function PaymentDetails() {
  const [userReservations, setUserReservations] = useState([]);
  const { state } = useLocation();

  const [err, setErr] = useState("");

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
    // var config = {
    //   method: "get",
    //   url: `http://3.88.217.129:5000/admin/user/reservations/${state.id}`,
    //   headers: {
    //     // token: "{{token}}",
    //   },
    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //     setUserReservations(response.data.message);
    //   })
    //   .catch(function (error) {
    //     setErr(error.response.statusText);
    //     console.log(error.response.statusText);
    //   }, []);
  }, []);
  return (
    <div className="paymentDetails ">
      <div className="paymentDetailsWrapper mx-auto">
        <h1>payment details</h1>
        <div className="row gap-4 justify-content-center">
          <h1>{err}</h1>
          {userReservations.map((eachUser) => {
            return (
              <div className="col-md-4 col-sm-12">
                <p className="paymentMsg text-capitalize d mb-0 p-0 mt-4">
                  payment successfull
                </p>
                <h3 className="p-0">${eachUser.reservation.price}</h3>
                <div className="paymentsInfo py-3">
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
                      name="Buyer Name"
                      icon={user}
                      value={`${state.firstName} ${state.lastName}`}
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
                      name="Reservation ID"
                      icon={reservationID}
                      value={eachUser.reservation.id}
                    />
                    <div
                      style={{
                        border: "0.1px solid rgba(0, 0, 0, 0.2)",
                        margin: "1.5rem 0",
                      }}
                    ></div>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
