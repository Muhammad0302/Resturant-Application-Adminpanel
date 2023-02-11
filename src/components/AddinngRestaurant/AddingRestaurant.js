import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Dropzone from "react-dropzone";

import axios from "axios";

import styled from "styled-components";

import "./AddingRestaurant.css";

import FileUploadIcon from "@mui/icons-material/FileUpload";

import { EditResturants } from "../../API/services/resturantsApis/EditResturants";
import { Addresturants } from "../../API/services/resturantsApis/AddResturants";
import { GetStates } from "../../API/services/getstates/Getstates";
import { GetCities } from "../../API/services/citiesApi/GetCities";
import { Grid } from "@mui/material";
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
  height: "96%",
  margin: "0 auto",
  border: "2px dashed #86BEFF",
  borderRadius: "10px",
  flex: 1,
  position: "relative",
});

const Button = styled.button`
  padding: 0.6em 2rem;
  background-color: #e95048;
  cursor: pointer;
  border: 1px solid #e6e6e6;

  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #fff;
`;
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
// let cities=[]
// let city={}

function AddingRestaurant() {
  // const [imgFile, setimgFile] = useState(null);
  const { state } = useLocation();
  const token = localStorage.getItem("token");

  console.log(state)

  // const [uploadedFiles, setUploadedFiles] = useState([]);
  const [imgFile1, setimgFile1] = useState("");
  const [imgFile2, setimgFile2] = useState("");
  const [imgFile3, setimgFile3] = useState("");
  const navigate = useNavigate(null);
  const types = ["image/jpeg", "image/png"];
  const [resturantName, setResturantName] = useState("");
  const [cityName, setcityname] = useState("");
  const [address, setaddress] = useState("");
  // const [resetdata, setresetdata] = useState(false);

  const [data, setdata] = useState(state);

  const [logoUrl, setLogoUrl] = useState("");
  const [citiesdata, setCityadata] = useState([]);
  const [isEdit, SetIsEdit] = useState(data ? true : false);
  console.log(isEdit)
  const [states, setStates] = useState([]);
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState(null);
  const [error, setError] = useState(false);
  const [uploadBtnFlag, setUploadBtnFlag] = useState(false);
  const [selectedState, setSelectedState] = useState()
  const [selectedStateId, setSelectedStateId] = useState(state?.city?.stateId)
  const getstatesID = (e) => {
    const selectedstate = states
      .filter((state) => state.stateName === e.target.value)
      .find((state) => state);
    setSelectedStateId(selectedstate.id)
    setSelectedState(selectedstate.stateName)
    // setcityname(selectedCity.cityName);
    setStateId(selectedstate.id);
    if (isEdit) {
      setUploadBtnFlag(true)
    }
    if (!isEdit) {
      if (resturantName && address && cityId && logoUrl && imgFile1) {
        setUploadBtnFlag(true)
      } else {
        setUploadBtnFlag(false)
      }
    }
  };

  useEffect(() => {
    //get states
    getstates();
  }, []);

  const getstates = async () => {
    const response = await GetStates();
    console.log(response.data.data)

    setStates(response.data.data);
    setStateId(response.data.data[0].id);

    response.data.data?.map((stateData, index) => {
      if (stateData.id === state?.city?.stateId) {
        setSelectedState(stateData.stateName)
      }
    })
  };



  const getCityId = (e) => {
    const selectedCity = citiesdata
      .filter((city) => city.cityName === e.target.value)
      .find((city) => city);
    setcityname(selectedCity.cityName);
    setCityId(selectedCity.id);
    if (isEdit) {
      setUploadBtnFlag(true)
    }
    if (!isEdit) {
      if (resturantName && address && stateId && logoUrl && imgFile1) {
        setUploadBtnFlag(true)
      } else {
        setUploadBtnFlag(false)
      }
    }
  };
  const uploadResturants = async () => {
    let resturansImages = [imgFile1, imgFile2, imgFile3];

    var data1 = {
      restaurantName: resturantName,
      cityId: cityId,
      logo: logoUrl,
      imgs: resturansImages,
      location: address,
    };

    if (isEdit) {
      data1.restaurantId = data.id;

      const response = await EditResturants(JSON.stringify(data1));

      navigate("/restaurants");
    } else {
      const response = await Addresturants(JSON.stringify(data1));
      navigate("/restaurants");
    }
  };
  function handleChangeResturant(e) {
    setResturantName(e.target.value);
    if (isEdit) {
      setUploadBtnFlag(true)
    }
    if (!isEdit) {
      if (address && stateId && cityId && logoUrl && imgFile1) {
        setUploadBtnFlag(true)
      } else {
        setUploadBtnFlag(false)
      }
    }
  }

  function handleChangeAddress(e) {
    setaddress(e.target.value);
    if (isEdit) {
      setUploadBtnFlag(true)
    }
    if (!isEdit) {
      if (resturantName && stateId && cityId && logoUrl && imgFile1) {
        setUploadBtnFlag(true)
      } else {
        setUploadBtnFlag(false)
      }
    }
  }

  const resetData = () => {
    setdata(null);
    setimgFile1("");
    setimgFile2("");
    setimgFile3("");
    SetIsEdit(false);
    setLogoUrl(null);
    setResturantName("");
    setcityname("");
    setaddress("");
  };
  const verifyImageFile = (files) => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;

      if (!types.includes(currentFileType)) {
        console.log("not accepted");
        return false;
      }
      return true;
    }
  };

  const handleOnDropLogoImage1 = async (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      verifyImageFile(rejectedFiles);
    }
    if (files && files.length > 0) {
      if (verifyImageFile(files)) {
        const currentFile = files[0];
        let formData1 = new FormData();

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
            // console.log(JSON.stringify(response.data));
            // console.log(response.data.img_url);
            setLogoUrl(response.data.img_url);
            if (isEdit) {
              setUploadBtnFlag(true)
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    if (!isEdit) {
      if (resturantName && address && stateId && cityId && imgFile1) {
        setUploadBtnFlag(true)
      } else {
        setUploadBtnFlag(false)
      }
    }
  };

  const handleOnDropImage1 = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      verifyImageFile(rejectedFiles);
    }
    if (files && files.length > 0) {
      if (verifyImageFile(files)) {
        const currentFile = files[0];
        let formData1 = new FormData();

        // console.log(currentFile);
        formData1.append("img", currentFile);
        //  try {
        //         const response = await ImageUpload(formData1);
        //         setLogoUrl(response.data.img_url);
        //       } catch (err) {
        //         console.log(err);
        //       }
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
            // console.log(response.data.img_url);
            setimgFile1(response.data.img_url);
          })
          .catch(function (error) {
            console.log(error);
          });

        console.log("file dropped");
      }
    }
    if (isEdit) {
      setUploadBtnFlag(true)
    }
    if (!isEdit) {
      if (resturantName && address && stateId && cityId && logoUrl) {
        setUploadBtnFlag(true)
      } else {
        setUploadBtnFlag(false)
      }
    }

  };

  const handleOnDropImage2 = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      verifyImageFile(rejectedFiles);
    }
    if (files && files.length > 0) {
      if (verifyImageFile(files)) {
        const currentFile = files[0];
        let formData1 = new FormData();

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
            setimgFile2(response.data.img_url);
            // setResturantImages([...resImages, response.data.img_url]);
          })
          .catch(function (error) {
            console.log(error);
          });

        console.log("file dropped");
      }
    }
    if (isEdit) {
      setUploadBtnFlag(true)
    }
  };

  const handleOnDropImage3 = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      verifyImageFile(rejectedFiles);
    }
    if (files && files.length > 0) {
      if (verifyImageFile(files)) {
        const currentFile = files[0];
        let formData1 = new FormData();

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
            setimgFile3(response.data.img_url);
            // setResturantImages([...resImages, response.data.img_url]);
          })
          .catch(function (error) {
            console.log(error);
          });

        console.log("file dropped");
      }
    }
    if (isEdit) {
      setUploadBtnFlag(true)
    }
  };

  useEffect(() => {
    Getcities(state?.city?.stateId);
  }, [selectedStateId]);

  const Getcities = async (id) => {

    const response = await GetCities(id);
    console.log("cities", response.data.data);
    const cityData = response.data.data.filter(city => city.stateId === selectedStateId)

    setCityadata(cityData);

    setCityId(response.data.data.id);

    setcityname(response.data.data[0].cityName);

    if (data) {
      setcityname(data.city.cityName);
      const stateofcity = citiesdata.filter((city) => console.log(city));
      console.log(stateofcity);
    } else {
      setcityname(response.data.data[0].cityName);
    }

  };
  //   const getstates=async()=>{
  //     const response=await GetStates()
  //     setStates(response.data.data)

  //     setStateId(response.data.data[0].id)
  //   }
  // }
  useEffect(() => {
    if (data) {
      console.log("data", data);

      setLogoUrl(data.logo);
      setimgFile1(data.img.imgs["0"]["0"]);
      setimgFile2(data.img.imgs["1"]["1"]);
      setimgFile3(data.img.imgs["2"]["2"]);
      setResturantName(data.restaurantName);
      setaddress(data.location);
      setcityname(data.city.cityName);
    }
  }, []);

  return (
    <div className="newResturants w-100 py-2">
      <div className="addingLogo">
        <div className="logoConatiner  justify-content-center d-flex">
          <div
            className="logoImg "
            style={{
              caretColor: "transparent",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              padding: "0.5rem",
            }}
          >
            <div
              className="uploadLogoArea"
              style={{
                border: "3.51995px dashed #E95048",
                height: "100%",
                borderRadius: "50%",
                position: "relative",
              }}
            >
              <Dropzone
                name="dropzone1"
                accept="image/*"
                onDrop={handleOnDropLogoImage1}
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <section className="mx-auto h-100">
                    <div {...getRootProps()} className="h-100">
                      <div className="h-100 text-center">
                        <img
                          alt=""
                          src={
                            logoUrl
                              ? `${process.env.REACT_APP_IMG_URL}${logoUrl}`
                              : ""
                          }
                          style={
                            !logoUrl
                              ? {}
                              : {
                                // maxWidth: "100%",
                                width: "100%",
                                maxHeight: "100%",
                                height: "186px",
                                objectFit: "cover",
                                borderRadius: "50%",
                              }
                          }
                          className="mb-3"
                        />
                        <input {...getInputProps()} />
                        <input className="input-zone" {...getInputProps()} />
                        {!logoUrl && (
                          <p className="text-capitalize mb-4 mx-auto w-75">
                            drop your image here
                          </p>
                        )}

                        <Button
                          style={
                            !logoUrl
                              ? { padding: "0.2rem 0.8rem" }
                              : {
                                position: "absolute",
                                top: "60%",
                                left: "30%",
                                padding: "0.2rem 0.8rem",
                              }
                          }
                        >
                          <span>
                            <FileUploadIcon />
                          </span>
                          {!logoUrl ? "Upload" : "Edit"}
                        </Button>
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </div>

          <div className="formWrapper">
            {error && (
              <p style={{ color: "red", marginBottom: "0" }}>
                Please fill all the fields
              </p>
            )}
            <form>
              <div
                className="UploadLogoForm form d-flex flex-column gap-3  align-self-center"
                style={{ fontFamily: "Inter" }}
              >
                <div className="field mb-3 d-flex align-items-center">
                  <label
                    style={{
                      color: "#686868",
                      width: "140px",
                    }}
                    htmlFor=""
                  >
                    <b>Restaurant Name</b>
                  </label>
                  <input
                    style={{
                      width: "340px",
                    }}
                    type="text"
                    value={resturantName}
                    onChange={handleChangeResturant}
                  />
                </div>
                <div className="field mb-3 d-flex">
                  <label
                    style={{
                      color: "#686868",
                      width: "140px",
                    }}
                    htmlFor=""
                  >
                    <b>States</b>
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={getstatesID}
                    value={selectedState}
                  >
                    {/* {selectedState && <>
                      <option
                      
                      >{selectedState}</option>
                    </>} */}
                    {states.map((state, index) => (
                      <option
                        defaultValue={selectedState}
                        defaultChecked={selectedState}
                        key={index}>{state.stateName}</option>
                    ))}
                  </select>
                </div>
                <div className="field mb-3 d-flex">
                  <label
                    style={{
                      color: "#686868",
                      width: "140px",
                    }}
                    htmlFor=""
                  >
                    <b>City</b>
                  </label>
                  {/*  <input type="text" value={cityName} onChange={getCityId} /> */}
                  <select
                    // defaultValue={cityName}
                    class="form-select"
                    aria-label="Default select example"
                    onChange={getCityId}
                    value={cityName}
                  >
                    {citiesdata?.map((city, index) => (
                      <option
                        defaultValue={cityName}
                        defaultChecked={cityName}
                        key={index}
                      >
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field d-flex">
                  <label
                    style={{
                      color: "#686868",
                      width: "140px",
                    }}
                    htmlFor=""
                  >
                    <b>Location</b>
                  </label>
                  <input
                    style={{
                      width: "340px",
                    }}
                    type="text"
                    value={address}
                    onChange={handleChangeAddress}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Missing code goes here */}
      <div className="uploadImg">
        <OuterBorder>
          <InnerBorder>
            {/* {imgFile === null ? ( */}
            <Dropzone
              name="dropzone1"
              accept="image/*"
              onDrop={handleOnDropImage1}
              maxSize={2e6}
              multiple={true}
            // disabled={imgFile1.length > 2 ? true : false}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="mx-auto w-100 h-100">
                  <div
                    {...getRootProps()}
                    className="h-100 d-flex  align-items-center"
                  >
                    <input {...getInputProps()} />

                    <div
                      className={`${!imgFile1
                        ? "mx-auto text-center "
                        : "h-100 w-100 text-center"
                        } `}
                    >
                      {/* {imgFile1.length > 0 && !data && (
                        <UploadSlider
                          imgFile1={imgFile1}
                          fileIndex={fileIndex}
                          uploadIcon={uploadIcon}
                        />
                      )} */}
                      <img
                        src={
                          imgFile1
                            ? `${process.env.REACT_APP_IMG_URL}${imgFile1}`
                            : ""
                        }
                        style={
                          !imgFile1
                            ? {}
                            : {
                              maxWidth: "100%",
                              maxHeight: "100%",
                              height: "186px",
                              objectFit: "cover",
                            }
                        }
                        alt=""
                        className="mb-3"
                      />
                      {!imgFile1 && (
                        <p className="text-capitalize mb-4">
                          drop your image here
                        </p>
                      )}
                      <Button
                        style={
                          !imgFile1
                            ? {}
                            : { position: "absolute", top: "60%", left: "45%" }
                        }
                      >
                        <label htmlFor="uploadImg">
                          {" "}
                          <span>
                            <FileUploadIcon />
                          </span>
                          {imgFile1 === "" && !data ? "Upload" : "Edit"}
                        </label>
                      </Button>
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          </InnerBorder>
          <InnerBorder>
            {/* {imgFile === null ? ( */}
            <Dropzone
              name="dropzone1"
              accept="image/*"
              onDrop={handleOnDropImage2}
              maxSize={2e6}
              multiple={true}
            // disabled={uploadedFiles.length > 2 ? true : false}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="mx-auto w-100 h-100">
                  <div
                    {...getRootProps()}
                    className="h-100 d-flex  align-items-center"
                  >
                    <input {...getInputProps()} />

                    <div
                      className={`${!imgFile2
                        ? "mx-auto text-center "
                        : "h-100 w-100 text-center"
                        } `}
                    >
                      <img
                        src={
                          imgFile2
                            ? `${process.env.REACT_APP_IMG_URL}${imgFile2}`
                            : ""
                        }
                        style={
                          !imgFile2
                            ? {}
                            : {
                              maxWidth: "100%",
                              maxHeight: "100%",
                              height: "186px",
                              objectFit: "cover",
                            }
                        }
                        alt=""
                        className="mb-3"
                      />

                      {!imgFile2 && (
                        <p className="text-capitalize mb-4">
                          drop your image here
                        </p>
                      )}
                      <Button
                        style={
                          !imgFile2
                            ? {}
                            : { position: "absolute", top: "50%", left: "50%" }
                        }
                      >
                        <label htmlFor="uploadImg">
                          {" "}
                          <span>
                            <FileUploadIcon />
                          </span>
                          {!imgFile2 ? "Upload" : "Edit"}
                        </label>
                      </Button>
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          </InnerBorder>
          <InnerBorder>
            {/* {imgFile === null ? ( */}
            <Dropzone
              name="dropzone1"
              accept="image/*"
              onDrop={handleOnDropImage3}
              maxSize={2e6}
              multiple={true}
            // disabled={uploadedFiles.length > 2 ? true : false}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="mx-auto w-100 h-100">
                  <div
                    {...getRootProps()}
                    className="h-100 d-flex  align-items-center"
                  >
                    <input {...getInputProps()} />

                    <div
                      className={`${!imgFile3
                        ? "mx-auto text-center "
                        : "h-100 w-100 text-center"
                        } `}
                    >
                      <img
                        src={
                          imgFile3
                            ? `${process.env.REACT_APP_IMG_URL}${imgFile3}`
                            : ""
                        }
                        style={
                          !imgFile3
                            ? {}
                            : {
                              maxWidth: "100%",
                              maxHeight: "100%",
                              height: "186px",
                              objectFit: "cover",
                            }
                        }
                        alt=""
                        className="mb-3"
                      />

                      {!imgFile3 && (
                        <p className="text-capitalize mb-4">
                          drop your image here
                        </p>
                      )}
                      <Button
                        style={
                          !imgFile3
                            ? {}
                            : { position: "absolute", top: "60%", left: "45%" }
                        }
                      >
                        <label htmlFor="uploadImg">
                          {" "}
                          <span>
                            <FileUploadIcon />
                          </span>
                          {!imgFile3 ? "Upload" : "Edit"}
                        </label>
                      </Button>
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          </InnerBorder>
        </OuterBorder>
        <InfoMSG>
          Source files should be at least 800 x 600 pixels.Formate files should
          be Jpg & Png.
        </InfoMSG>
      </div>

      <div className="d-flex buttons justify-content-center gap-4 mt-5">
        <ResetBtn onClick={resetData}>Reset</ResetBtn>

        {uploadBtnFlag && (
          <UploadBtn onClick={uploadResturants}>Upload</UploadBtn>
        )}
      </div>
    </div>
  );
}
export default AddingRestaurant;
