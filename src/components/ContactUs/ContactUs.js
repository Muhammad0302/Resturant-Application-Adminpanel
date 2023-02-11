import React, { useState, useEffect, useContext } from "react";
import "./ContactUs.css"
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalBody,
} from "mdb-react-ui-kit";
import sendIcon from "../../assets/sendIcon.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { getDimensions } from "../../utils/getWindowDimension"
import { Contact } from "../../API/services/contactUs/Contact";




const ContactUs = () => {
    const naviagte = useNavigate();
    const [currentWidth, setCurrentWidth] = useState();
    const [currentHeight, setCurrentHeight] = useState();
    const initialState = {
        name: "",
        email: "",
        subject: "",
        description: "",
    }

    window.addEventListener("resize", () => getDimensions(setCurrentWidth, setCurrentHeight));

    useEffect(() => {
        getDimensions(setCurrentWidth, setCurrentHeight)
    }, [])

    const [bannerFile, setBannerFile] = useState(null);
    const [advertiseFormValue, setAdvertiseFormValue] = useState(initialState);

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const onChange = (e) => {
        setAdvertiseFormValue({ ...advertiseFormValue, [e.target.name]: e.target.value });
    };

    const [errors, setErrors] = useState({});

    const submitAdvertiseRequest = () => {
        let errors = {};

        if (!advertiseFormValue.name) {
            errors["name"] = "Name is required";
        }
        if (!advertiseFormValue.email) {
            errors["email"] = "Email is required";
        }
        if (!advertiseFormValue.subject) {
            errors["subject"] = "Subject file is required";
        }
        if (!advertiseFormValue.description) {
            errors["description"] = "Description is required";
        }

        if (Object.keys(errors).length <= 0) {
          
            // toast.success("Ad request sent", { theme: "colored" });
       
           const contactData = JSON.stringify({
            name: advertiseFormValue.name,
            email:advertiseFormValue.email,
            subject:advertiseFormValue.subject,
            message:advertiseFormValue.description ,
           })  
           toggleShow();
            Contact(contactData).then((res) => {
                if (res.status === 200) {
                    setAdvertiseFormValue(initialState)
                } else {
                    console.log("Unable to submit your contact us information")
                }

            }).catch(err => {
                console.log(err)
            });

        } else {
            setErrors(errors);
        }
    };

    const handleCreatePost = () => {

        submitAdvertiseRequest()

    };

    if (bannerFile) {
        let formData = new FormData();
        formData.append("files", bannerFile);
        console.log(bannerFile.size / 1024 / 1024)
    }


    return (
        <>
            <div style={{ paddingTop: currentWidth > 600 ? "77px" : "50px", backgroundColor: "white" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div style={{ textAlign: "center",lineHeight: "0" }}>
                        <h3
                            style={{
                                fontFamily: "Open Sans",
                                fontSize: "32px",
                                fontWeight: 700,
                                lineHeight: "44px",
                                letterSpacing: "0em",
                                color: " #fd7e14",

                            }}
                        >
                            Contact Us
                        </h3>
                        <br />
                        <p
                            style={{
                                fontFamily: "Open Sans",
                                fontSize: "19.16px",
                                fontWeight: 400,
                                lineHeight: "26.1px",
                                padding: "0px 23px"
                            }}
                        >
                            Help people get to know you
                        </p>{" "}
                        {currentWidth > 600 && <>

                        </>}

                    </div>
                </div>



                <div>


                    {currentWidth > 600 && <>
                        <br />

                    </>}
                    <form action="">
                        <div
                            class="card-advertiser"
                        >
                            <div class="card-body-to">
                                <div class="container" id="customclassforcontainer">
                                    <div class="row">
                                        <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                                            <h5 style={{ color: "#4a4a4a" }}>
                                                Name<span className="required-star">*</span>
                                            </h5>
                                        </div>
                                        <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                                            <input
                                                type="text"
                                                class="form-control"
                                                onChange={onChange}
                                                name="name"
                                                placeholder=""
                                                value={advertiseFormValue.name}
                                                required
                                            />
                                            {errors.name && (
                                                <p className="errorText">{errors.name}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div class="container" id="customclassforcontainer">
                                    <div class="row">
                                        <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                                            <label for="Location">
                                                <h5 style={{ color: "#4a4a4a" }}>
                                                    Email<span className="required-star">*</span>
                                                </h5>
                                            </label>
                                        </div>
                                        <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                                            <input
                                                type="text"
                                                class="form-control"
                                                onChange={onChange}
                                                name="email"
                                                id="inputlocation"
                                                value={advertiseFormValue.email}
                                                placeholder=""
                                            />
                                            {errors.email && (
                                                <p className="errorText">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>


                                <div class="container" id="customclassforcontainer">
                                    <div class="row">
                                        <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                                            <label for="Location">
                                                <h5 style={{ color: "#4a4a4a" }}>
                                                    Subject<span className="required-star">*</span>
                                                </h5>
                                            </label>
                                        </div>
                                        <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                                            <input
                                                type="text"
                                                class="form-control"
                                                onChange={onChange}
                                                name="subject"
                                                id="subject"
                                                value={advertiseFormValue.subject}
                                                placeholder=""
                                            />
                                            {errors.subject && (
                                                <p className="errorText">{errors.subject}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div class="container" id="customclassforcontainer">
                                    <div class="row">
                                        <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                                            <label for="Location">
                                                <h5 style={{ color: "#4a4a4a" }}>
                                                    Description
                                                    <span className="required-star">*</span>
                                                </h5>
                                            </label>
                                        </div>
                                        <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                                            <textarea
                                            style={{height:"110px"}}
                                                type="text"
                                                class="form-control"
                                                id=""
                                                onChange={onChange}
                                                name="description"
                                                value={advertiseFormValue.description}
                                            />
                                            {errors.description && (
                                                <p className="errorText">{errors.description}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div class="container adrequest" id="customclassforcontainer" >
                                        <button
                                            type="button"
                                            onClick={handleCreatePost}
                                            className="submitRequest"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>{" "}
                            </div>
                        </div>
                        <br />
                        <br />
                    </form>
                </div>
            </div>
            {/* Model */}
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1" 
            
            style={{             
            display: basicModal ? "flex": "none",
            justifyContent: "center",
             alignItems: "center",
            }}
              >
                <MDBModalDialog style={{ marginTop: "20px",width:"19%" }} className="send-model">
                    <MDBModalContent>
                        <span className="close-button">
                            <MDBBtn
                                className="btn-close model-close-btn"
                                color="none"
                                onClick={toggleShow}
                            ></MDBBtn>
                        </span>

                        <MDBModalBody
                            style={{
                                padding: "10%",
                                marginLeft: "auto",
                                marginRight: "auto",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"

                            }}
                        >
                           
                           
                            <h3 className="email-send-popup-text">Your Request Sent</h3>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default ContactUs