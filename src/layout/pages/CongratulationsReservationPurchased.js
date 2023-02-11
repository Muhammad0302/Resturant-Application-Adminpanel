import Lottie from "lottie-react";
import confettiAnimation from "../../assets/confettiAnimation.json";
import topImg from "..//..//assets/BackgroundImages/loginTopImg.png";
import thumbsUpIcon from "..//..//assets/thumbsUp.svg";
// import bottomImg1 from "..//..//assets/BackgroundImages/Vector 5.png";
// import bottomImg2 from "..//..//assets//BackgroundImages/Vector 6.png";
import logo from "..//..//assets//Layer 2.png";
// import { useNavigate } from "react-router-dom";
// import { margin } from "@mui/system";

function Congratulations() {
  // const navigate = useNavigate();
  return (
    <div>
      <div className="logoplace position-relative">
        <img src={topImg} alt="" className="img1" />
        <div className="logo d-flex justify-content-center">
          <img src={logo} alt="" style={{ zIndex: 333, width: "12rem" }} />
        </div>
      </div>
      <div
        className="row"
        style={{
          paddingLeft: "2rem",
          paddingRight: "2rem",
          height: "100%",
        }}
      >
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <Lottie animationData={confettiAnimation} />
        </div>
        <div className="col-lg-4"></div>
      </div>
      <div
        className=""
        style={{
          position: "relative",
          textAlign: "center",
          fontSize: "21px",
          fontWeight: "600",
          lineHeight: "28.6px",
          height: "58px",
          // margin: "auto",
          // width: "323px",
        }}
      >
        <div
          style={{
            paddingLeft: "1vw",
            paddingRight: "1vw",
            position: "absolute",
            marginRight: "0",
            marginLeft: "0",
            right: "0",
            left: "0",
            top: "-30vw",
          }}
        >
          Congratulations! Your reservation has been successfully purchased
        </div>
      </div>
      <div
        className=""
        style={{
          position: "relative",
          textAlign: "center",
          paddingLeft: "1vw",
          paddingRight: "1vw",
          height: "58px",
          marginRight: "0",
          marginLeft: "0",
          right: "0",
          left: "0",
          top: "-100vw",
        }}
      >
        <img
          src={thumbsUpIcon}
          style={{
            width: "20vw",
            margin: "auto",
          }}
          alt=""
        ></img>
      </div>
      {/* <div className="text-center mt-5">
        <button
          onClick={() => navigate("")}
          className="loginButton text-capitalize"
        >
          Next
        </button>
      </div> */}

      {/* <img src={bottomImg1} alt="" className="img3" />
      <img src={bottomImg2} alt="" className="img2" /> */}
    </div>
  );
}

export default Congratulations;
