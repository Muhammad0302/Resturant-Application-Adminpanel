import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SendOtp() {
  const navigate = useNavigate(null);
  const [char1, setChar1] = useState("");
  const [char2, setChar2] = useState("");
  const [char3, setChar3] = useState("");
  const [char4, setChar4] = useState("");
  const handleChar1 = (e) => {
    console.log(e.target.value);
    let value = e.target.value.toString();
    setChar1(value);
  };

  const handleChar2 = (e) => {
    let value = e.target.value.toString();
    console.log(e.target.value);
    setChar2(value);
  };

  const handleChar3 = (e) => {
    let value = e.target.value.toString();
    console.log(e.target.value);
    setChar3(value);
  };

  const handleChar4 = (e) => {
    let value = e.target.value.toString();
    console.log(e.target.value);
    setChar4(value);
  };

  const submit = () => {
    const otp = char1 + char2 + char3 + char4;
    console.log(otp);
    var data = JSON.stringify({
      verifycode: Number(otp),
    });

    var config = {
      method: "post",
      url: `http:///${process.env.REACT_APP_HOST_URL}/admin/verifycode`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigate("/newpassword");
        localStorage.setItem("otp", Number(otp));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <p className="info mb-4">
        {`Please enter the 4 digit code sent to ${localStorage.getItem(
          "email"
        )}`}
      </p>{" "}
      <div className="otpFields ">
        <div className="otpFieldsWrapper d-flex gap-3 justify-content-center mb-3">
          <div className="eachValue">
            {" "}
            <input
              type="text"
              maxLength={1}
              value={char1}
              onChange={handleChar1}
            />
          </div>

          <div className="eachValue">
            {" "}
            <input
              type="text"
              maxLength={1}
              value={char2}
              onChange={handleChar2}
            />
          </div>
          <div className="eachValue">
            {" "}
            <input
              type="text"
              maxLength={1}
              value={char3}
              onChange={handleChar3}
            />
          </div>
          <div className="eachValue">
            {" "}
            <input
              type="text"
              maxLength={1}
              value={char4}
              onChange={handleChar4}
            />
          </div>
          <>
            {/* <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={4}
              otpType="number"
              disabled={false}
              secure
            /> */}
            {/* <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}
          </>
        </div>
        <p className="resendCODE text-capitalize text-center">
          <a href="#">Resend code</a>
        </p>
        <div className="text-center">
          {" "}
          <button onClick={submit} className="send text-capitalize mt-3">
            verify
          </button>
        </div>
      </div>
    </div>
  );
}

export default SendOtp;
