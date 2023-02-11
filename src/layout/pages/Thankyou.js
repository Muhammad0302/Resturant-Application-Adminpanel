import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { PaymentSuccess } from "../..//API/services/paymentsuccessfull/PaymentSuccess";
import { useNavigate } from "react-router-dom";

function Thankyou() {
  const navigate = useNavigate(null);

  const [queryData, setQueryData] = useSearchParams("");
  const sessionId = queryData.get("session_id");
  const Reservationid = queryData.get("reservationId");
  const userID = queryData.get("userId");

  useEffect(() => {
    const paymentSuccess = async () => {
      try {
        const response = await PaymentSuccess(sessionId, Reservationid, userID);
        console.log(response);
        navigate("/checkout/reservationdetails", {
          state: response.data.data,
        });
      } catch (err) {
        console.log(err);
      }
    };
    paymentSuccess();
  }, []);
  return (
    <div
      style={{
        background: "white",
      }}
    >
      <div
        className="thankyouWrapper"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          rowGap: "1rem",
        }}
      >
        <div
          className="card"
          style={{
            width: "600px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: "5px",
            height: "200px",
            background: "#edf6f9",
            padding: "2rem 2rem",
            textAlign: "center",
          }}
        >
          <span
            className="thaNKIcon mx-auto"
            style={{ display: "inline-block", marginBottom: "1rem" }}
          >
            <svg
              width="58"
              height="58"
              viewBox="0 0 58 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 29C0 21.3087 3.05535 13.9325 8.4939 8.4939C13.9325 3.05535 21.3087 0 29 0C36.6913 0 44.0675 3.05535 49.5061 8.4939C54.9446 13.9325 58 21.3087 58 29C58 36.6913 54.9446 44.0675 49.5061 49.5061C44.0675 54.9446 36.6913 58 29 58C21.3087 58 13.9325 54.9446 8.4939 49.5061C3.05535 44.0675 0 36.6913 0 29H0ZM27.3451 41.412L44.0413 20.5397L41.0253 18.1269L26.7883 35.9175L16.704 27.5152L14.2293 30.4848L27.3451 41.4159V41.412Z"
                fill="#118E2C"
              />
            </svg>
          </span>
          <p
            style={{
              width: "350px",
              fontSize: "1.3rem",
              textTransform: "capitalize",
              fontFamily: "Roboto",
              margin: "0 auto",
            }}
          >
            thank you the payment has been made successfull
          </p>
        </div>
      </div>
    </div>
  );
}

export default Thankyou;
