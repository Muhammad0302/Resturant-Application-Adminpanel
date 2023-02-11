import React from "react";
import "./resetPass.css";
import logo from "..//..//..//assets/Layer 2.png";

import lock from "..//..//..//assets/lockImg.png";
import clock from "..//..//..//assets/clock.png";
import topImg from "..//..//..//assets/BackgroundImages/loginTopImg.png";
import bottomImg1 from "..//..//..//assets/Vector 5.png";
import bottomImg2 from "..//..//..//assets/Vector 6.png";

import "..//basicComponent.css";

function ResetPass(props) {
  const { flag, childComp } = props;

  return (
    <div className="BackgroundComponent">
      <div className="backgroundWrapper position-relative">
        {" "}
        <div className="logoplace position-relative">
          <img src={topImg} alt="" className="img1" />
          <div className="logo d-flex justify-content-center">
            <img src={logo} alt="" style={{ zIndex: 333, width: "12rem" }} />
          </div>
        </div>
        <div className="ResetPass">
          <div className="resetWrapper">
            <h1 className="text-capitalize mb-4">reset password</h1>
            <div className="lockIcon">
              <img src={flag ? clock : lock} alt="" />
            </div>
            <div className="ResetPassbyEmailWrapper">{childComp}</div>
          </div>
        </div>
        <img src={bottomImg1} alt="" className="img3" />
        <img src={bottomImg2} alt="" className="img2" />
      </div>
    </div>
  );
}

export default ResetPass;
