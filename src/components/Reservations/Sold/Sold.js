import React, { useEffect, useState } from "react";
import "./Sold.css";

import { Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import threeDots from "..//..//..//assets/three dots.png";
import seat from "..//..//..//assets/headerSeat.png";
import dollarIcon from "..//..//..//assets/price.png";
import topicon from "..//..//..//assets//tabletopicon.png";

import { SoldReservations } from "../../..//API/services/reservations/SoldReservations";
import moment from "moment";
function Sold() {
  const [rowsData, setRowsData] = useState([]);

  const [activeId, setActiveId] = useState("");
  const [Yposition, setYposition] = useState("");

  useEffect(() => {
    const getSoldReservations = async () => {
      try {
        const response = await SoldReservations();
        console.log(response.data.data);
        setRowsData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSoldReservations();
  }, []);
  const columns = [
    {
      field: "Restaurant",
      headerName: "Restaurant",
      flex: 1,
      minWidth: 180,
      renderCell: (rowsData) => {
        return (
          <div style={{ width: "100%" }}>
            <div className="d-flex gap-2 align-items-center">
              <Avatar
                src={`${process.env.REACT_APP_IMG_URL}${rowsData.row.reservation.restaurant.logo}`}
              />

              <p className="columnData">
                {" "}
                {rowsData.row.reservation.restaurant.restaurantName}
              </p>
            </div>
            <div className="DateTime d-flex gap-2">
              {moment(rowsData.row.date).format("DD-MM-YYYY hh:mm A")}
            </div>
          </div>
        );
      },
    },
    {
      field: "BuyerName",
      headerName: "Buyer Name",
      renderCell: (rowsData) => {
        return <p className="columnData">{rowsData.row.user.firstName}</p>;
      },
      flex: 1,
      minWidth: 120,
    },

    {
      field: "Seats",
      renderHeader: () => (
        <div className="d-flex align-items-center gap-1">
          <img src={seat} alt="" style={{ width: "14px" }} />
          <div className="columnHeader" style={{ marginTop: "0.2rem" }}>
            Seats
          </div>
        </div>
      ),
      renderCell: (rowsData) => {
        return <p className="columnData">{rowsData.row.reservation.seats}</p>;
      },
      flex: 1,
      minWidth: 80,
    },
    {
      field: "City",
      headerName: "City",
      description: "This column has a value getter and is not sortable.",
      renderCell: (rowsData) => {
        return (
          <p className="columnData">
            {rowsData.row.reservation.restaurant.city.cityName}
          </p>
        );
      },
      sortable: false,
      flex: 1,
      minWidth: 120,
    },
    {
      field: "reservationId",
      headerName: "Reservation ID",
      description: "This column has a value getter and is not sortable.",
      renderCell: (rowsData) => (
        <div className="d-flex align-items-center gap-1">
          <div className="columnData text-dark" style={{ marginTop: "0.2rem" }}>
            {rowsData.row.reservationId}
          </div>
        </div>
      ),
      sortable: false,
      flex: 1,
      minWidth: 120,
    },
    {
      field: "Price",
      renderHeader: () => (
        <div className="d-flex align-items-center gap-1">
          <img src={dollarIcon} alt="" style={{ width: "18px" }} />
          <div className="columnHeader" style={{ marginTop: "0.2rem" }}>
            Price
          </div>
        </div>
      ),
      renderCell: (rowsData) => {
        return <p className="columnData">{rowsData.row.reservation.price}</p>;
      },
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      minWidth: 80,
    },

    {
      field: "PaidIdsecretCode",
      headerName: "Paid Id/ Secret Code",
      description: "This column has a value getter and is not sortable.",
      renderCell: (rowsData) => {
        return <p className="columnData">{rowsData.row.reservation.code}</p>;
      },
      sortable: false,
      flex: 1,
      minWidth: 150,
    },
    {
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return (
          <div id={params.row.id} className="w-100">
            {activeId === params.row.id ? (
              <div
                className="overlay  align-items-center  position-absolute d-flex flex-column"
                style={{
                  top: Yposition - 20,
                  right: "20px",
                  zIndex: 444444444,
                }}
              >
                <div className="d-flex align-items-center tablebtn">
                  <span style={{ color: "red" }}>
                    <DeleteOutlineIcon />
                  </span>{" "}
                  <button onClick={deleteRow}>Delete</button>
                </div>
              </div>
            ) : (
              ""
            )}

            <button
              style={{
                border: "none",
                background: "none",
              }}
              onClick={showOverlay1}
            >
              <img src={threeDots} style={{ width: "5px" }} alt="" />
            </button>
          </div>
        );
      },
    },
  ];
  const rows = rowsData;
  function showOverlay1(e) {
    const tableElement =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    console.log(tableElement);
    let bounds = tableElement.getBoundingClientRect();

    let y = e.clientY - bounds.top;
    console.log("y is" + y);
    setYposition(y);
    const id = e.target.parentElement.parentElement.id;
    // console.log(e.target.parentElement.parentElement.id);
    setActiveId(Number(id));
    // setActiveId(id);
  }
  function deleteRow() {
    setRowsData(rowsData.filter((item) => item.id !== activeId));
  }
  return (
    <div
      className="position-relative sold"
      style={{
        height: 600,
        width: "100%",
        marginTop: "3.5rem",
        caretColor: "transparent",
      }}
    >
      <span style={{ position: "absolute", top: "0.5rem", right: "5rem" }}>
        <img style={{ width: "2rem" }} src={topicon} alt="" />
      </span>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8, 10, 15, 20]}
        checkboxSelection={false}
        rowHeight={90}
      />
    </div>
  );
}

export default Sold;
