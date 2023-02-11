import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import data from "./data.js";
import "./resturant.css";
import { DataGrid } from "@mui/x-data-grid";

import deleteIcon from "..//..//assets/deleteIcon.png";
import EditIcon from "..//..//assets/Editicon.png";
import closeIcon from "..//..//assets/closeIcon.png";

import { GetResturants } from "../..//API/services/resturantsApis/GetResturants";
import { DeleteResturant } from "../..//API/services/resturantsApis/DeleteResturant";

function Restaurants() {
  const navigate = useNavigate("");
  const [rowsData, setRowsData] = useState([]);
  const [deleteOverlay, setDeleteOverlay] = useState(false);
  const [activeIndex, setActiveIndex] = useState("");

  function ShowOverlay(id) {
    setActiveIndex(id);
    setDeleteOverlay(true);
  }
  const handledit = (params) => {
    navigate("/addrestaurants", { state: params.row });
  };
  const handleDelete = async (e) => {
    setDeleteOverlay(false);
    const response = await DeleteResturant(activeIndex);
    if (response.status === 200) {
      setRowsData(rowsData.filter((item) => item.id !== activeIndex));
    }
  };

  const getresturantsdata = async () => {
    const response = await GetResturants();
    if ((response.status = 200)) {
      setRowsData(response.data.message);
    }
  };

  useEffect(() => {
    getresturantsdata();
  }, []);
  const columns = [
    {
      field: "logo",
      headerName: "Restaurants",
      flex: 1,
      minWidth: 180,
      renderCell: (rowsData) => {
        return (
          <div
            className="text-center"
            style={{ borderRight: "1px solid rgba(0,0,0,0.2)", width: "100%" }}
          >
            <img
              style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              src={`${process.env.REACT_APP_IMG_URL}${rowsData.row.logo}`}
              alt=""
            />
          </div>
        );
      },
    },
    {
      field: "imgUrl",
      headerName: "",
      flex: 3,
      minWidth: 220,
      renderCell: (rowsData) => {
        console.log("img", rowsData.row.img.imgs["0"]["0"]);
        return (
          <div>
            <img
              style={{
                height: "90px",
                borderRadius: "5px",
                width: "170px",
                objectFit: "cover",
              }}
              src={`${process.env.REACT_APP_IMG_URL}${rowsData.row.img.imgs["0"]["0"]}`}
              alt=""
            />
          </div>
        );
      },
    },
    {
      field: "resturantName",
      headerName: "",
      flex: 4,
      minWidth: 260,
      renderCell: (rowsData) => {
        console.log(rowsData);
        // count=count+1
        // console.log(rowsData.row.cityId)
        // const eachObj = city.filter((city) => city.id === rowsData.row.cityId);
        // console.log(eachObj);
        return (
          <div>
            <p
              className="mb-0 columnDataResturant"
              style={{
                fontWeight: "bold",
                color: "#E95048",
                fontFamily: "Inter",
                fontSize: "1.2rem",
              }}
            >
              {rowsData.row.restaurantName}
            </p>
            <p
              className="mb-0 text-uppercase columnDataCityName"
              style={{
                color: "#686868",
                fontWeight: "bold",
                fontSize: "0.7rem",
              }}
            >
              {rowsData.row.city.cityName}
            </p>
          </div>
        );
      },
    },
    {
      field: "address",
      headerName: "",
      flex: 4,
      minWidth: 470,
      renderCell: (rowsData) => {
        return (
          <div className="text-center d-flex align-items-center gap-2">
            <span className="locationIcon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.86326 1C5.30823 1 3.81689 1.61774 2.71731 2.71731C1.61773 3.81689 1 5.30823 1 6.86326C1 11.4524 5.4768 16.9735 6.64971 18.3295C6.71269 18.4016 6.80164 18.4458 6.89712 18.4525C6.99259 18.4592 7.08683 18.4278 7.15925 18.3652L7.19495 18.3295C8.35228 16.9684 12.7272 11.4517 12.7272 6.86326C12.7272 6.09324 12.5755 5.33075 12.2808 4.61934C11.9861 3.90793 11.5542 3.26154 11.0096 2.71708C10.4651 2.17262 9.81868 1.74075 9.10724 1.44613C8.3958 1.15151 7.63329 0.999915 6.86326 1V1ZM6.86326 9.3441C6.29409 9.34397 5.73773 9.17508 5.26453 8.85879C4.79133 8.54249 4.42254 8.09299 4.20479 7.56711C3.98703 7.04124 3.93009 6.46261 4.04116 5.90437C4.15224 5.34614 4.42633 4.83338 4.8288 4.43091C5.23127 4.02844 5.74404 3.75434 6.30227 3.64327C6.8605 3.5322 7.43913 3.58914 7.96501 3.80689C8.49088 4.02465 8.94038 4.39344 9.25668 4.86664C9.57298 5.33984 9.74187 5.89619 9.74199 6.46537V6.47251C9.74027 7.23481 9.4362 7.9653 8.8965 8.50366C8.3568 9.04202 7.62557 9.34427 6.86326 9.3441V9.3441Z"
                  stroke="#E95048"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <p
              className="mb-0 ColumnDataLocation"
              style={{ fontFamily: "Inter", fontSize: "0.8rem" }}
            >
              {rowsData.row.location}
            </p>
          </div>
        );
      },
    },
    {
      field: "",
      headerName: "",
      flex: 2,
      minWidth: 250,
      renderCell: (params) => {
        return (
          <div className="buttons d-flex align-items-center gap-2">
            <button
              style={{ backgroundColor: "#5BB0FF" }}
              className="d-flex align-items-center"
              onClick={() => {
                handledit(params);
              }}
            >
              <img
                style={{ width: "1.2rem", marginRight: "0.5rem" }}
                src={EditIcon}
                alt=""
              />
              <span className="mt-1"> Edit</span>
            </button>
            <button
              id={params.row.id}
              style={{ backgroundColor: "#E95048" }}
              onClick={() => ShowOverlay(params.row.id)}
              className="d-flex align-items-center"
            >
              <span>
                <img
                  style={{ width: "1.2rem", marginRight: "0.5rem" }}
                  src={deleteIcon}
                  alt=""
                />
              </span>
              <span className="mt-1">Delete</span>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {deleteOverlay && <div className="overlayDelete"></div>}
      {deleteOverlay && (
        <div className="deleteModal ">
          <div className="position-relative">
            <span
              onClick={() => setDeleteOverlay(false)}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "-1rem",
                top: "-4rem",
              }}
            >
              <img src={closeIcon} alt="" />
            </span>
            <p className="text-capitalize text-center mt-5">
              are you sure want to delete
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button
                onClick={() => setDeleteOverlay(false)}
                style={{ backgroundColor: "#5BB0FF" }}
              >
                Cancel
              </button>
              <button
                style={{ backgroundColor: "#E95048" }}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className="position-relative resturant"
        style={{
          height: 600,
          width: "100%",
          marginTop: "3.5rem",
          caretColor: "transparent",
        }}
      >
        <span className="tableimg">
          <svg
            width="30"
            height="15"
            viewBox="0 0 33 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.44947 8.21065H26.587V12.2354H6.44947V8.21065ZM0.408203 0.161133H32.6283V4.18589H0.408203V0.161133ZM12.4907 16.2602H20.5458V20.2849H12.4907V16.2602Z"
              fill="white"
            />
          </svg>
        </span>
        <DataGrid
          rows={rowsData}
          checkboxSelection={false}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8, 10, 15, 20]}
          rowHeight={100}
        />
      </div>
    </>
  );
}

export default Restaurants;
