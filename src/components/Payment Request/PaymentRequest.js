// import { DataGrid } from "@mui/x-data-grid";
// import moment from "moment";
// import { useEffect, useState } from "react";
// import closeIcon from "..//..//assets/closeIcon.png";
// import EditIcon from "..//..//assets/Editicon.png";
// import date from "..//..//assets/date.png";
// import dollarIcon from "..//..//assets/price.png";
// import "./paymentRequest.css";
// import { GetPaymentRequest } from "../..//API/services/PaymentRequestAPI/GetPaymentRequest";
// import axiosInstance from "../../API/axiosInstance/AxiosInstance";

// function PaymentRequest() {
//   const [rowsData, setRowsData] = useState([]);
//   const [editOverlay, setEditOverlay] = useState(false);
//   const [activeIndex, setActiveIndex] = useState("");
//   // const [status, setStatus] = useState("");
//   const [refId, setRefId] = useState("");

//   const EditPaymentStatus = (id) => {
//     console.log("id", id);
//     return new Promise((resolve, reject) => {
//       axiosInstance
//         .post(`/admin/payoutsuccess/`, {
//           reservationId: id,
//           payoutReferenceId: refId,
//         })
//         .then((res) => {
//           resolve(res);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   };

//   const handleSave = async (e) => {
//     console.log("save called");
//     setEditOverlay(false);
//     const response = await EditPaymentStatus(activeIndex);
//   };
//   // function save() {
//   //   console.log(rowsData.row);
//   // rowsData.row.payoutStatus = status;
//   // rowsData.row.refId = refId;
//   // console.log("save function");
//   // }

//   function showOverlay(id) {
//     setActiveIndex(id);
//     setEditOverlay(true);
//   }
//   const getPaymentRequestData = async () => {
//     const response = await GetPaymentRequest();
//     if ((response.status = 200)) {
//       console.log(response.data.payouts);
//       setRowsData(response.data.payouts);
//     }
//   };

//   useEffect(() => {
//     getPaymentRequestData();
//   }, []);
//   const columns = [
//     {
//       //Date
//       field: "date",

//       headerName: (
//         <>
//           <img
//             className="headerIcon "
//             style={{ width: "18px" }}
//             src={date}
//             alt=""
//           />{" "}
//           Reservation Date
//         </>
//       ),
//       renderCell: (rowsData) => (
//         <div className="d-flex align-items-center gap-1">
//           <div className="columnData text-dark" style={{ marginTop: "0.2rem" }}>
//             {moment(rowsData.row.date).format("DD-MM-YYYY hh:mm A")}
//           </div>
//         </div>
//       ),
//       flex: 1,
//       minWidth: 200,
//     },
//     {
//       //Price
//       field: "price",
//       headerName: (
//         <>
//           <img
//             className="headerIcon "
//             style={{ width: "18px" }}
//             src={dollarIcon}
//             alt=""
//           />{" "}
//           Price
//         </>
//       ),
//       renderCell: (rowsData) => (
//         <div className="d-flex align-items-center gap-1">
//           <div className="columnData">{rowsData.row.price}</div>
//         </div>
//       ),
//       flex: 3,
//       minWidth: 150,
//     },
//     {
//       // Account Details
//       field: "userAccount",
//       headerName: (
//         <>
//           <img
//             className="headerIcon "
//             style={{ width: "18px" }}
//             src={dollarIcon}
//             alt=""
//           />{" "}
//           Stripe Account
//         </>
//       ),
//       renderCell: (rowsData) => (
//         <div className="d-flex align-items-center gap-1">
//           <div className="columnData">{rowsData.row.userAccount}</div>
//         </div>
//       ),
//       flex: 3,
//       minWidth: 150,
//     },
//     {
//       // Status
//       field: "payoutStatus",
//       headerName: "Payout Status",
//       renderCell: (rowsData) => (
//         <div className="d-flex align-items-center gap-1">
//           <div className="columnData text-capitalize text-dark">
//             {rowsData.row.payoutStatus}
//           </div>
//         </div>
//       ),
//       flex: 3,
//       minWidth: 150,
//     },
//     {
//       field: "",
//       headerName: "",
//       flex: 2,
//       minWidth: 250,
//       renderCell: (params) => {
//         return (
//           <div className="buttons d-flex align-items-center gap-2">
//             <button
//               style={{ backgroundColor: "#5BB0FF" }}
//               className="d-flex align-items-center"
//               onClick={() => {
//                 showOverlay(params.row.id);
//               }}
//             >
//               <img
//                 style={{ width: "1.2rem", marginRight: "0.5rem" }}
//                 src={EditIcon}
//                 alt=""
//               />
//               <span className="mt-1"> Edit</span>
//             </button>
//           </div>
//         );
//       },
//     },
//   ];
//   return (
//     <>
//       {editOverlay && <div className="overlayDelete"></div>}
//       {editOverlay && (
//         <div className="deleteModal  px-3 ">
//           <div className="">
//             <span
//               onClick={() => setEditOverlay(false)}
//               style={{
//                 cursor: "pointer",
//                 position: "absolute",
//                 right: "-1rem",
//                 top: "-4rem",
//               }}
//             >
//               <img src={closeIcon} alt="" />
//             </span>
//             <form
//               onSubmit={
//                 () => {}
//                 // handleSubmit(Submit)
//               }
//             >
//               {/* <div className="enterRefIdField mb-3 row align-items-center mt-5">
//                 <label htmlFor="#" className="col-4">
//                   Select Status
//                 </label>
//                 <select
//                   onChange={(e) => {
//                     setStatus(e.target.value);
//                     // console.log(e.target.value);
//                   }}
//                   class="form-select"
//                   aria-label="Default select example"
//                   className="col-8"
//                 >
//                   <option>{"Incomplete"}</option>
//                   <option>{"Complete"}</option>
//                 </select>
//               </div> */}
//               <div
//                 style={{}}
//                 className="enterRefIdField mb-3 row align-items-center mt-5"
//               >
//                 <label htmlFor="#" className="col-3">
//                   Enter Ref Id
//                 </label>
//                 <input
//                   className="col-7"
//                   onChange={(e) => {
//                     setRefId(e.target.value);
//                   }}
//                   type="text"
//                   placeholder=""
//                   // style={
//                   //   // errors.price ? { border: "0.760739px solid #E95048" } : {}
//                   // }
//                 />
//               </div>
//             </form>
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: "11px",
//                 left: "0",
//                 right: "0",
//               }}
//               className="d-flex justify-content-center gap-3"
//             >
//               <button
//                 onClick={() => {
//                   handleSave();
//                 }}
//                 style={{ backgroundColor: "#5BB0FF" }}
//               >
//                 Save
//               </button>
//               <button
//                 style={{ backgroundColor: "#E95048" }}
//                 onClick={() => setEditOverlay(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <div
//         className="users position-relative"
//         // onClick={() => setActiveId("")}
//         style={{ height: 600, width: "100%" }}
//       >
//         <DataGrid
//           rows={rowsData}
//           columns={columns}
//           pageSize={8}
//           rowsPerPageOptions={[8, 10, 15, 20]}
//           checkboxSelection={false}
//           rowHeight={70}
//         />
//       </div>
//     </>
//   );
// }

// export default PaymentRequest;
