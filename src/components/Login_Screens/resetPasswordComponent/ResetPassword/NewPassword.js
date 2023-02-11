import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
function NewPassword() {
  const navigate = useNavigate(null);
  // const [errorMsg, setErrorMsg] = useState(false);
  // const handleForm = (e) => {
  //   e.preventDefault();
  //   console.log(e);
  //   if (e.target[0].value === "" || e.target[1].value === "") {
  //     setErrorMsg(true);
  //   } else {
  //
  //   }
  // };

  const schema = yup.object().shape({
    password: yup.string().required(),
    confirmPassword: yup.string().oneOf([yup.ref("password")], null),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    // console.log(data);
    const otpCode = localStorage.getItem("otp");
    var data1 = { code: otpCode, password: data.password };

    var config = {
      method: "put",
      url: `http:///${process.env.REACT_APP_HOST_URL}/admin/updatepassword`,
      headers: {},
      data: data1,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(data);
  };
  return (
    <div>
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <div className="password position-relative  w-100 mb-4 ">
          <label
            htmlFor="#"
            style={{
              position: "absolute",
              top: "-0.8rem",
              left: "0.6rem",
              padding: "0 0.5rem",
              backgroundColor: "white",
              fontWeight: "500",
            }}
          >
            New Password{" "}
            <span
              className="required"
              style={{ color: "red", marginLeft: "-0.2rem" }}
            >
              *
            </span>
          </label>
          <input
            placeholder="Enter new password"
            className="emailInp px-4"
            // name="email"
            {...register("password")}
          />

          {/* {errorMsg ? (
            <p style={{ color: "red" }} className="text-capitalize errMsg">
              password should not be empty
            </p>
          ) : (
            ""
          )} */}
        </div>
        <div className="password position-relative  w-100 ">
          <label
            htmlFor="#"
            style={{
              position: "absolute",
              top: "-0.8rem",
              left: "0.6rem",
              padding: "0 0.5rem",
              backgroundColor: "white",
              fontWeight: "500",
            }}
          >
            Confirm Password{" "}
            <span
              className="required"
              style={{ color: "red", marginLeft: "-0.2rem" }}
            >
              *
            </span>
          </label>
          <input
            placeholder="Confirm your passsword"
            className="emailInp px-4"
            // name="email"
            {...register("confirmPassword")}
          />
          <p style={{ color: "red" }} className="text-capitalize errMsg  mb-0">
            {errors.confirmPassword ? "password should match" : ""}
          </p>
          {/* {errorMsg ? (
            <p style={{ color: "red" }} className="text-capitalize errMsg">
              password should not be empty
            </p>
          ) : (
            ""
          )} */}
        </div>
        <div className="text-center mt-4">
          {" "}
          <button className="send text-capitalize">reset</button>
        </div>
      </form>
    </div>
  );
}

export default NewPassword;
