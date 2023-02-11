import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import date from "..//..//assets/date.png";
import { DataGrid } from "@mui/x-data-grid";

import closeIcon from "..//..//assets/closeIcon.png";
import deleteIcon from "..//..//assets/deleteIcon.png";
import EditIcon from "..//..//assets/Editicon.png";

import { DeleteCity } from "../..//API/services/citiesApi/DeleteCity";
import { GetCities } from "../..//API/services/citiesApi/GetCities";
import "./City.css";

function City() {
  const [rowsData, setRowsData] = useState([]);
  const [deleteOverlay, setDeleteOverlay] = useState(false);
  const navigate = useNavigate("");
  const [activeIndex, setActiveIndex] = useState("");

  function ShowOverlay(id) {
    setActiveIndex(id);

    setDeleteOverlay(true);
  }
  function handledit(rowsData) {
    navigate("/addcity", { state: rowsData.row });
  }
  const handleDelete = async (e) => {
    setDeleteOverlay(false);

    const response = await DeleteCity(activeIndex);
    if (response.status === 200) {
      setRowsData(rowsData.filter((item) => item.id !== activeIndex));
    }

    console.log(response.status);
  };
  const getcitydata = async () => {
    const response = await GetCities();
    console.log(response);
    if (response.data.succes) {
      setRowsData(response.data.data);
    }
  };

  useEffect(() => {
    getcitydata();
  }, []);

  const columns = [
    {
      field: "All city",
      headerName: "All Cities",
      flex: 1,
      minWidth: 180,
      renderCell: (rowsData) => {
        console.log(rowsData.row.cityImg);
        return (
          <div
            style={{
              borderRight: "1px solid rgba(0,0,0,0.2)",
              width: "100%",
            }}
            className="RowTopContent d-flex justify-content-center align-items-center gap-2"
          >
            <img
              src={`${process.env.REACT_APP_IMG_URL}${rowsData.row.cityImg}`}
              alt={date}
            />
          </div>
        );
      },
    },
    {
      field: "cityName",
      headerName: "",
      flex: 4,
      minWidth: 120,
    },
    {
      field: "",
      headerName: "",
      flex: 1,
      minWidth: 250,
      renderCell: (params) => {
        // console.log(params.row.id);
        return (
          <div className="buttons d-flex align-items-center gap-2">
            <button
              onClick={() => {
                handledit(params);
              }}
              style={{ backgroundColor: "#5BB0FF" }}
              className="d-flex align-items-center"
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
              <span id={params.row.id}>
                <img
                  style={{ width: "1.1rem", marginRight: "0.5rem" }}
                  src={deleteIcon}
                  alt=""
                />
              </span>
              <span className="mt-1"> Delete</span>
            </button>
          </div>
        );
      },
    },
  ];
  //   const rows = rowsData;
  //   function showOverlay1(e) {
  //     const id = e.target.parentElement.parentElement.id;
  //     console.log(e.target.parentElement.parentElement.id);
  //     setActiveId(Number(id));
  //     // setActiveId(id);
  //   }
  //   function deleteRow() {
  //     console.log("delete");
  //     console.log(activeId);
  //     setRowsData(rowsData.filter((item) => item.id !== activeId));
  //   }
  return (
    <>
      {deleteOverlay && <div className="overlayDelete"></div>}
      {deleteOverlay && (
        <div className="deleteModal ">
          <div className="position-relative">
            {" "}
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
                style={{ backgroundColor: "#5BB0FF" }}
                onClick={() => setDeleteOverlay(false)}
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
        className="position-relative city"
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
          columns={columns}
          pageSize={8}
          checkboxSelection={false}
          rowsPerPageOptions={[5, 10, 15, 20]}
          rowHeight={100}
        />
      </div>
    </>
  );
}

export default City;
