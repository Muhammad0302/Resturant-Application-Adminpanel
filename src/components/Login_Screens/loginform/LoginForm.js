import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import topImg from "..//..//..//assets//BackgroundImages/loginTopImg.png";
import bottomImg1 from "..//..//..//assets/Vector 5.png";
import bottomImg2 from "..//..//..//assets/Vector 6.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import logo from "..//../..//assets/Layer 2.png";

import "./LoginForm.css";
import "../basicComponent.css";

import { Adminlogin } from "../../..//API/services/adminLogin";

function LoginForm() {
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    var data1 = JSON.stringify({
      email: data.email,
      password: data.password,
    });
    try {
      var response = await Adminlogin(data1);

      localStorage.setItem("token", response.data.tokens.accessToken);
      localStorage.setItem(
        "username",
        `${response.data.firstName} ${response.data.lastName}`
      );
      if (response.status === 200) {
        navigate("/user");
        window.location.reload(true);
      }
    } catch (err) {
      console.log(err);
      setErrorMsg(err.response.data.message);
    }
  };

  return (
    <div className="BackgroundComponent">
      <div className="backgroundWrapper position-relative ">
        <div className="logoplace position-relative">
          <img src={topImg} alt="" className="img1" />
          <div
            style={{ position: "absolute", top: "4vw", right: "0", left: "0" }}
            className="logo d-flex justify-content-center"
          >
            <img src={logo} alt="" style={{ zIndex: 333, width: "12rem" }} />
          </div>
        </div>

        <div className="loginForm">
          <div className="LoginformWrapper">
            <h3 className="text-capitalize" style={{ marginBottom: "2.2rem" }}>
              login
            </h3>
            <form
              className="form-data"
              action="#"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div
                className="email position-relative  w-100 "
                style={{ marginBottom: "3.2rem" }}
              >
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
                  Email
                  <span
                    className="required"
                    style={{ color: "red", marginLeft: "0.1rem" }}
                  >
                    *
                  </span>
                </label>
                <input
                  placeholder="Enter your email"
                  className="emailInp px-4"
                  name="email"
                  {...register("email")}
                />
                <p
                  style={{ color: "red", width: "50%" }}
                  className="errMsg  mb-0"
                >
                  {errors.email ? "Enter your email" : ""}
                </p>
                {/* <input type="text" placeholder="Enter your email" /> */}
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
                  Password{" "}
                  <span
                    className="required"
                    style={{ color: "red", marginLeft: "-0.2rem" }}
                  >
                    *
                  </span>
                </label>
                <input
                  placeholder="********"
                  className="emailInp px-4"
                  // name="Password"
                  // onChange={handleChange}
                  type="password"
                  {...register("password")}
                />
                {
                  <p
                    style={{ color: "red", width: "50%" }}
                    className=" errMsg  mb-0"
                  >
                    {errors.password ? "Enter your password" : ""}
                  </p>
                }
                <p style={{ color: "red" }} className="errMsg  mb-0">
                  {" "}
                  {errorMsg}
                </p>{" "}
              </div>
              <Link to="/resetPassword">
                {" "}
                <p
                  style={{ textDecoration: "underline" }}
                  className="reset_pass text-capitalize mt-1 
                "
                >
                  reset password
                </p>
              </Link>
              <div className="text-center mt-5">
                <button type="submit" className="loginButton text-capitalize">
                  login
                </button>
              </div>
            </form>
          </div>
        </div>
        <img src={bottomImg1} alt="" className="img3" />
        <img src={bottomImg2} alt="" className="img2" />
      </div>
    </div>
  );
}

export default LoginForm;
