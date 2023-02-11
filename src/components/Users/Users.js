import React, { useState, useEffect } from "react";
import "./users.css";
import { useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";

import closeIcon from "..//..//assets/closeIcon.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import editicon from "..//..//assets/Edit Icon.png";
import blockUsers from "..//..//assets/user menu icons/block users.png";
import resrticted from "..//..//assets//user menu icons/restict.png";
import paymentIcon from "..//..//assets/user menu icons/paymentDetails.png";
import reservationDetails from "..//..//assets/user menu icons/reservdetails.png";

import { GetUsers } from "../..//API/services/usersList/GetUsers";

function Users() {
  const [rowsData, setRowsData] = useState([]);

  const [activeId, setActiveId] = useState("");
  const [Yposition, setYposition] = useState("");
  const [deleteOverlay, setDeleteOverlay] = useState(false);
  const [userName, setusername] = useState("");

  const navigate = useNavigate(null);

  useEffect(() => {
    const getusers = async () => {
      try {
        const response = await GetUsers();
        setRowsData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getusers();
  }, []);

  const showreservationdetails = (userID) => {
    const buyerData = rowsData
      .filter((buyer) => buyer.id === userID)
      .find((each) => each);
    navigate("/reservationdetails", { state: buyerData });
  };

  const showpaymentdetails = (userID) => {
    console.log("id is", userID);
    const buyerData = rowsData
      .filter((buyer) => buyer.id === userID)
      .find((each) => each);

    navigate("/paymentdetails", { state: buyerData });
  };
  const columns = [
    {
      field: "username",
      headerName: "User Name",

      flex: 3,
      minWidth: 150,
      renderCell: (rowsData) => {
        return (
          <div
            className=" d-flex align-items-center gap-2"
            style={{ width: "100px" }}
          >
            <Avatar
              src={`http://3.88.217.129:5000/files/${rowsData.row.profileImg}`}
            />
            <p className="columnData">
              {`${rowsData.row.firstName} ${rowsData.row.lastName}`}
            </p>
          </div>
        );
      },
    },
    {
      field: "phoneNumber",

      renderHeader: () => (
        <div className="d-flex align-items-center gap-1">
          <span>
            <svg
              width="21"
              height="21"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.88 1C15.28 1 18 3.72 18 7.12M11.88 4.4C13.24 4.4 14.6 5.76 14.6 7.12M1 1C1 12.56 6.44 18 18 18V12.56L13.24 11.2L11.88 13.24C9.16 13.24 5.76 9.84 5.76 7.12L7.8 5.76L6.44 1H1Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <div className="columnHeader">Phone Number</div>
        </div>
      ),
      flex: 3,
      minWidth: 150,
    },

    {
      description: "This column has a value getter and is not sortable.",
      sortable: false,

      minWidth: 200,
      renderCell: (rowsData) => {
        return (
          <div className="w-100">
            {activeId === rowsData.row.id ? (
              <div
                className="overlay position-absolute d-flex flex-column"
                style={{
                  top: Yposition - 20,
                  right: "30px",
                  zIndex: 444444444,
                  width: "190px",
                }}
              >
                <ul className="menuList list-style-none px-0 py-3">
                  {/* <li className="d-flex gap-4 px-3 ">
                    <span className="icon">
                      <img src={editicon} style={{ width: "20px" }} alt="" />
                    </span>{" "}
                    <span className="text">Edit</span>
                  </li>
                  <div
                    className="borderbottom w-100 my-3"
                    style={{ border: "0.1px solid #E3E3E3" }}
                  ></div> */}
                  <li
                    className="d-flex gap-4 px-3"
                    onClick={() => DeleteUser(rowsData.row.id)}
                  >
                    <span className="icon">
                      <DeleteOutlineIcon style={{ color: "#FF0000" }} />
                    </span>{" "}
                    <span className="text">Delete</span>
                  </li>
                  <div
                    className="borderbottom w-100 my-3"
                    style={{ border: "0.1px solid #E3E3E3" }}
                  ></div>
                  <li className="d-flex gap-4 px-3">
                    <span className="icon">
                      <img src={resrticted} style={{ width: "20px" }} alt="" />
                    </span>{" "}
                    <span className="text">Restrict</span>
                  </li>
                  <div
                    className="borderbottom w-100 my-3"
                    style={{ border: "0.1px solid #E3E3E3" }}
                  ></div>
                  <li
                    className="d-flex gap-4 px-3"
                    onClick={() =>
                      blockUser(
                        `${rowsData.row.firstName} ${rowsData.row.lastName} `
                      )
                    }
                  >
                    <span className="icon">
                      <img src={blockUsers} style={{ width: "20px" }} alt="" />
                    </span>{" "}
                    <span className="text">Block User</span>
                  </li>
                  <div
                    className="borderbottom w-100 my-3"
                    style={{ border: "0.1px solid #E3E3E3" }}
                  ></div>
                  <li
                    onClick={() => showreservationdetails(rowsData.row.id)}
                    className="d-flex gap-4 px-3"
                    style={{height:"24px"}}
                  >
                    <span className="icon">
                      <img
                        src={reservationDetails}
                        style={{ width: "20px" }}
                        alt=""
                      />
                    </span>{" "}
                    <p className="text">Reservation details</p>
                  </li>
                  <div
                    className="borderbottom w-100 my-3"
                    style={{ border: "0.1px solid #E3E3E3" }}
                  ></div>
                  <li
                    onClick={() => showpaymentdetails(rowsData.row.id)}
                    className="d-flex gap-4 px-3"
                    style={{height:"3px"}}
                  >
                    <span className="icon">
                      <img src={paymentIcon} style={{ width: "20px" }} alt="" />
                    </span>{" "}
                    <p className="text">Payment details</p>
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}
            <button
              // id={params.row.id}
              onClick={(e) => showOverlay1(e, rowsData.row.id)}
              style={{ background: "none", border: "none" }}
            >
              <MoreVertIcon />
            </button>
          </div>
        );
      },
    },
  ];
  const blockUser = (username) => {
    console.log(username);
    setDeleteOverlay(true);
    setActiveId(null);
    setusername(username);
  };
  const DeleteUser = (id) => {
    setRowsData(rowsData.filter((item) => item.id !== id));
  };
  function showOverlay1(e, userid) {
    console.log(userid);

    console.log(e.target.parentElement.parentElement.id);
    const tableElement =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    console.log(tableElement);
    let bounds = tableElement.getBoundingClientRect();

    let y = e.clientY - bounds.top;
    console.log("y is" + y);
    setYposition(y);

    setActiveId(Number(userid));
  }

  return (
    <>
      {deleteOverlay && <div className="overlayDelete"></div>}
      {deleteOverlay && (
        <div className="deleteModal">
          <div className="position-relative d-flex align-items-center h-100 justify-content-center">
            <span
              onClick={() => setDeleteOverlay(false)}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "-1rem",
                top: "-1rem",
              }}
            >
              <img src={closeIcon} alt="" />
            </span>
            <p
              className="text-capitalize text-center "
              style={{ fontWeight: "bold", fontFamily: "Inter" }}
            >
              {userName} account has been{" "}
              <span className="block" style={{ color: "red" }}>
                Blocked
              </span>
            </p>
          </div>
        </div>
      )}
      <div
        className="users position-relative"
        // onClick={() => setActiveId("")}
        style={{ height: 600, width: "100%" }}
      >
        <DataGrid
          rows={rowsData}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8, 10, 15, 20]}
          checkboxSelection={false}
          rowHeight={70}
        />
      </div>
    </>
  );
}

export default Users;
