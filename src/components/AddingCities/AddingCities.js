import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";

import axios from "axios";
import Dropzone from "react-dropzone";

import "..//Cities/City.css";

import uploadIcon from "..//..//assets/uploadImg.png";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { AddCities } from "../../API/services/citiesApi/AddCities";
import { EditCity } from "../../API/services/citiesApi/EditCity";
import { GetStates } from "../../API/services/getstates/Getstates";
import { GetCityById } from "../../API/services/getstates/GetCityById";
const Input = styled.input({
  width: "40%",
  margin: "2rem 0",
  height: "4rem",
  border: "0.4px solid #686868",
  padding: "0 2rem",
  outline: "none",
  borderRadius: "20px",
});
const UploadBtn = styled.button`
  background: linear-gradient(90deg, #e95048 0%, #eea657 100%), #ec7850;
  padding: 0.6rem 2.2rem;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  color: #fff !important;
  &:hover {
    background: linear-gradient(94.36deg, #ec993f 0%, #e75534 90.55%), #797979;
  }
`;
const ResetBtn = styled.button`
  background: #fff;
  padding: 0.6rem 2.2rem;
  border: none;
  border-radius: 8px;
  color: #e95048 !important;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
`;

const OuterBorder = styled.div({
  overflow: "hidden",
  borderRadius: "10px",
  height: "200px",
  border: "1px solid #DBDBDB",

  width: "100%",

  display: "flex",
  alignItems: "center",
});
const InfoMSG = styled.div({
  textTransform: "uppercase",
  color: "#86BEFF",
  marginTop: "1rem",
});
const InnerBorder = styled.div({
  width: "96%",
  height: "96%",
  margin: "0 auto",
  border: "2px dashed #86BEFF",
  borderRadius: "10px",

  position: "relative",
});

const Button = styled.button({
  padding: "0.6em 2rem",
  backgroundColor: "#E95048",
  cursor: "pointer",
  border: "1px solid #E6E6E6",

  borderRadius: "5px",
  color: "#fff",
});
function AddingCities({ flag }) {
  const { state } = useLocation();
  const navigate = useNavigate(null);

  const [stateId, setStateId] = useState();

  const [data, setdata] = useState(state);
  const [cityname, setcityname] = useState("");

  const [imgUrl, setImgUrl] = useState("");
  const [isEdit, SetIsEdit] = useState(data ? true : false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const token = localStorage.getItem("token");
  const types = ["image/jpeg", "image/png"];
  function resetData() {
    setdata(null);
    setImgUrl("");
    SetIsEdit(false);
    setcityname("");
  }

  function handleChange(e) {
    setcityname(e.target.value);
  }

  const uploadCity = async () => {
    var data1 = {
      cityName: cityname,
      cityImg: imgUrl,
      stateId: stateId,
    };

    if (isEdit) {
      data1.cityId = data.id;

      const response = await EditCity(JSON.stringify(data1));
      navigate("/city");
    } else {
      console.log("add city", data1);
      const response = await AddCities(data1);
      SetIsEdit(true);

      navigate("/city");
    }
  };

  const getstatesID = (e) => {
    const selectedstate = states
      .filter((state) => state.stateName === e.target.value)
      .find((state) => state);

    setStateId(selectedstate.id);
  };

  useEffect(() => {
    //get states
    getstates();
  }, []);
  useEffect(() => {
    //get cities by stateId
    GetCitiesById();
  }, [stateId]);

  useEffect(() => {
    //when editing cities
    if (data) {
      setImgUrl(data.cityImg);
      setcityname(data.cityName);
    }
  }, []);
  useEffect(() => {
    GetCitiesById();
  }, [stateId]);

  const GetCitiesById = async () => {
    const response = await GetCityById(stateId);
    console.log(response);
    setCities(response.data.data);
    setcityname(response.data.data[0].cityName);
  };
  const getstates = async () => {
    const response = await GetStates();
    setStates(response.data.data);
    setStateId(response.data.data[0].id);
  };

  const getCityname = (e) => {
    setcityname(e.target.value);
    console.log(e.target.value);
  };

  const verifyImageFile = (files) => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;

      if (!types.includes(currentFileType)) {
        // obj.createNotification(
        //   "error",
        //   "This file type is not allowed, Only Images are allowed"
        // );
        console.log("not accepted");
        return false;
      }
      return true;
    }
  };
  useEffect(() => {
    if (data) {
      setImgUrl(data.cityImg);
      setcityname(data.cityName);
    }
  }, []);
  const handleOnDropImage = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      verifyImageFile(rejectedFiles);
    }
    if (files && files.length > 0) {
      console.log(files);
      if (verifyImageFile(files)) {
        let formData1 = new FormData();
        const currentFile = files[0];
        console.log(currentFile);
        formData1.append("img", currentFile);

        var config = {
          method: "post",
          url: `${process.env.REACT_APP_HOST_URL}/image`,
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
          data: formData1,
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log(response.data.img_url);
            setImgUrl(response.data.img_url);
          })
          .catch(function (error) {
            console.log(error);
          });
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            // setimgFile(reader.result);
            // setUploadedImg(currentFile.path);
          },
          false
        );
        reader.readAsDataURL(currentFile);

        console.log("file droppesd");
      }
    }
  };

  return (
    <div>
      <div className="newCityWrapper">
        <OuterBorder>
          <InnerBorder>
            <Dropzone
              name="dropzone1"
              accept="image/*"
              onDrop={handleOnDropImage}
              maxSize={2e10}
              multiple={true}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="mx-auto w-100 h-100">
                  <div
                    {...getRootProps()}
                    className="h-100 d-flex  align-items-center"
                  >
                    <input {...getInputProps()} />
                    {/* <i
                    className="fa fa-image fa-3x pb-10"
                    style={{ color: "#20A84C" }}
                  />
                  <br />
                  <span className="fs-10">
                    Click or Drag Image to Upload Here.
                    <br />
                    (x-png, png, jpg, jpeg, gif)
                  </span> */}
                    <div
                      className={`${
                        !imgUrl ? "mx-auto text-center " : " w-100 text-center"
                      } `}
                    >
                      <img
                        src={`${process.env.REACT_APP_IMG_URL}/${imgUrl}`}
                        style={
                          !imgUrl
                            ? {}
                            : {
                                maxHeight: "100%",
                                height: "186px",
                                width: "60%",
                                objectFit: "cover",
                              }
                        }
                        alt=""
                      />

                      {/* {data ? (
                        <img
                          src={data.imgUrl}
                          style={
                            data.imgUrl === ""
                              ? {}
                              : {
                                  width: "100%",
                                  height: "186px",
                                  objectFit: "cover",
                                }
                          }
                          alt=""
                          className="mb-3"
                        />
                      ) : (
                        ""
                      )} */}
                      {/* <img
                      src={data.imgUrl !== "" ? data.imgUrl : uploadIcon}
                      style={
                        data.imgUrl !== ""
                          ? {}
                          : {
                              width: "100%",
                              height: "186px",
                              objectFit: "cover",
                            }
                      }
                      alt=""
                      className="mb-3"
                    /> */}
                      {!imgUrl && (
                        <p className="text-capitalize mb-4">
                          drop your image here
                        </p>
                      )}
                      <Button
                        // onClick={uploadImg}
                        style={
                          !imgUrl
                            ? {}
                            : {
                                position: "absolute",
                                top: "60%",
                                left: "45%",
                              }
                        }
                      >
                        <label htmlFor="uploadImg">
                          {" "}
                          <span>
                            <FileUploadIcon />
                          </span>
                          {!imgUrl ? "Upload" : "Edit"}
                        </label>
                      </Button>
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
            {/* ) : (
            <div className="w-100 h-100">
              <img
                src={uploadedFiles[0].preview}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt=""
              />
              <Button
                className="uploadBtn"
                style={{
                  position: "absolute",
                  zIndex: "333333",
                  bottom: "20px",
                  left: "50%",
                }}
                onClick={handleOnDropImage}
              >
                <input
                  //   onChange={handleUpload}
                  style={{ display: "none" }}
                  type="file"
                  id="uploadImg"
                />
                <label htmlFor="uploadImg">
                  {" "}
                  <span>
                    <FileUploadIcon />
                  </span>
                  Edit
                </label>
              </Button>
            </div>
          )} */}
          </InnerBorder>
        </OuterBorder>
        <InfoMSG>
          Source files should be at least 800 x 600 pixels.Formate files should
          be Jpg & Png.
        </InfoMSG>
        {/* 
        <div className="my-5">
          <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            Select State
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={getstatesID}
        
          >
            {states.map((state, index) => (
              <option key={index}>{state.stateName}</option>
            ))}
          </select>
        </div> */}
        <div className="my-5">
          <div className="my-5">
            <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              Select State
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={getstatesID}
            >
              {states.map((state, index) => (
                <option key={index}>{state.stateName}</option>
              ))}
            </select>
          </div>
          {/* <div className="my-5">
            <label style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              Select City
            </label>
            <select
              defaultValue={cityname}
              class="form-select"
              aria-label="Default select example"
              onChange={getCityname}
              value={cityname}
            >
              {cities.map((city, index) => (
                <option key={index}>{city.cityName}</option>
              ))}
            </select>
          </div> */}
          <div className="textField text-center">
            <Input
              value={cityname}
              onChange={handleChange}
              placeholder="ENTER CITY NAME"
            />
            {cityname === "" && (
              <p style={{ color: "red" }}>Please Enter City Name</p>
            )}
            <div className="d-flex buttons justify-content-center gap-4">
              <ResetBtn onClick={resetData}>Reset</ResetBtn>
              <Link to="/city">
                <UploadBtn onClick={uploadCity}>Upload</UploadBtn>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddingCities;
