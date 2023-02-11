import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Sentmail } from "../../../..//API/services/LoginApis/Sentmail";

function ResetByMail() {
  const navigate = useNavigate(null);
  const [error, setError] = useState("");
  const schema = yup.object().shape({
    email: yup.string().email().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });



  const onSubmit = async (data) => {
    try {
      const response = await Sentmail(data);
      if (response.status === 200) {
        navigate("/sendOtp");
        console.log(response);
      }
    } catch (err) {
      console.log(err);
      setError("Email is not registered");
    }

    // console.log(data);
    // var data1 = JSON.stringify({
    //   email: data.email,
    // });

    // var config = {
    //   method: "post",
    //   url: `http://${process.env.REACT_APP_HOST_URL}/admin/resetpassword`,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: data1,
    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //     setMsg(response.data.message);
    //     localStorage.setItem("email", data.email);
    //     navigate("/sendOtp");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     setMsg(error.response.data.message);
    //   });
  };
  // const [errorMsg, setErrorMsg] = useState(false);
  // const handleForm = (e) => {
  //   e.preventDefault();
  //   console.log(e);
  //   if (e.target[0].value === "") {
  //     setErrorMsg(true);
  //   } else {
  //
  //   }
  // };

  return (
    <div>
      <p className="info  mb-4">
        Please enter your email address to receive a verification code
      </p>
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <div className="email mb-4 position-relative  w-100 ">
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
            Email{" "}
            <span
              className="required"
              style={{ color: "red", marginLeft: "-0.2rem" }}
            >
              *
            </span>
          </label>
          <input
            placeholder="Enter your email"
            className="emailInp px-4"
            onChange={() => console.log("jsadjajsssd")}
            name="email"
            {...register("email")}
          />
          <p style={{ color: "red" }} className="errMsg mt-2 mb-0">
            {errors.email ? "Enter your email" : ""}
          </p>
          <p style={{ color: "red" }} className="errMsg mt-2 mb-0">
            {error}
          </p>
          {/* {errorMsg && (
            <p style={{ color: "red" }} className="text-capitalize errMsg mb-0">
              this mail does not exist
            </p>
          )} */}
        </div>
        <div className="text-center">
          <button className="send text-capitalize ">send</button>
        </div>
      </form>
    </div>
  );
}

export default ResetByMail;
