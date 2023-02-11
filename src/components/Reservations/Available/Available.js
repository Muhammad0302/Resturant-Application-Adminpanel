import React, { useState, useEffect } from "react";
import "./Available.css";
import { useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";

import seat from "..//..//..//assets/headerSeat.png";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import editicon from "..//..//..//assets/Edit Icon.png";
import threeDots from "..//..//..//assets/three dots.png";
import dollarIcon from "..//..//..//assets/price.png";
import topicon from "..//..//..//assets//tabletopicon.png";
import date from "..//..//..//assets/date.png";

import { GetReservation } from "../..//..//API/services/reservations/GetReservation";
import { GetResturants } from "../..//..//API/services/resturantsApis/GetResturants";
import { DeleteReservation } from "../..//..//API/services/reservations/DeleteReservation";
import moment from "moment";

function Available() {
	const [rowsData, setRowsData] = useState([]);

	const [activeId, setActiveId] = useState("");

	const [Yposition, setYposition] = useState("");
	const [resturants, setResturants] = useState([]);
	const navigate = useNavigate(null);
	const handledit = (params) => {
		navigate("/addreservation", { state: params.row });
	};

	const getresturantsdata = async () => {
		try {
			const response = await GetResturants();
			setResturants(response.data.message);
		} catch (err) {
			console.log(err);
		}
	};
	const getReservations = async () => {
		try {
			const response = await GetReservation();
			if (response.data.success) {
				setRowsData(response.data.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getresturantsdata();
		getReservations();
	}, []);

	const columns = [
		{
			field: "Restaurant",
			headerName: "Restaurant",

			flex: 1,
			minWidth: 180,
			renderCell: (rowsData) => {
				console.log(rowsData);

				return (
					<div
						className="d-flex align-items-center  gap-3"
						style={{ width: "100%" }}
					>
						<Avatar
							sx={{ fontSize: "43rem" }}
							src={`${process.env.REACT_APP_IMG_URL}${rowsData.row.restaurant.logo}`}
						/>
						<div className="columnData">
							{rowsData.row.restaurant.restaurantName}
						</div>
					</div>
				);
			},
		},
		{
			field: "time",

			renderHeader: () => (
				<div className="d-flex align-items-center gap-1">
					<AccessTimeIcon />
					<div className="columnHeader" style={{ marginTop: "0.2rem" }}>
						Time
					</div>
				</div>
			),
			renderCell: (rowsData) => (
				<div className="d-flex align-items-center gap-1">
					<div className="columnData" style={{ marginTop: "0.2rem" }}>
						{rowsData.row.time ? (
							<> {rowsData.row.time}</>
						) : (
							moment(rowsData.row.date).utc().format("HH:mm A")
						)}
					</div>
				</div>
			),
			flex: 1,
			minWidth: 130,
		},
		{
			field: "date",
			headerName: (
				<>
					<img
						className="headerIcon "
						style={{ width: "18px" }}
						src={date}
						alt=""
					/>{" "}
					Date
				</>
			),
			renderCell: (rowsData) => (
				<div className="d-flex align-items-center gap-1">
					<div className="columnData" style={{ marginTop: "0.2rem" }}>
						{moment(rowsData.row.date).format("DD-MM-YYYY")}
					</div>
				</div>
			),
			flex: 1,
			minWidth: 220,
		},
		{
			field: "location",
			renderHeader: () => (
				<div className="d-flex align-items-center gap-1">
					<svg
						width="21"
						height="21"
						viewBox="0 0 23 28"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.2244 15.021C13.3363 15.021 15.0483 13.3089 15.0483 11.197C15.0483 9.08509 13.3363 7.37305 11.2244 7.37305C9.11244 7.37305 7.40039 9.08509 7.40039 11.197C7.40039 13.3089 9.11244 15.021 11.2244 15.021Z"
							stroke="white"
							stroke-width="1.77343"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M11.2246 1C8.5201 1 5.9264 2.07435 4.01404 3.9867C2.10169 5.89905 1.02734 8.49276 1.02734 11.1972C1.02734 13.6089 1.53975 15.1869 2.93933 16.9332L11.2246 26.4931L19.5098 16.9332C20.9094 15.1869 21.4218 13.6089 21.4218 11.1972C21.4218 8.49276 20.3475 5.89905 18.4351 3.9867C16.5228 2.07435 13.9291 1 11.2246 1V1Z"
							stroke="white"
							stroke-width="1.77343"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<div className="columnHeader" style={{ marginTop: "0.2rem" }}>
						Location
					</div>
				</div>
			),
			flex: 3,
			minWidth: 320,
			renderCell: (rowsData) => {
				// let resturant = resturants
				//   .filter((data) => data.id == rowsData.row.restaurantId)
				//   .find((each) => each);
				// console.log(resturant);
				return (
					<div
						className="columnData"
						// className="RowTopContent d-flex align-items-center  gap-3"
						// style={{ width: "100%" }}
					>
						{rowsData.row.restaurant.location}
					</div>
				);
			},
		},
		{
			field: "seats",
			headerName: (
				<>
					<img
						className="headerIcon "
						style={{ width: "18px" }}
						src={seat}
						alt=""
					/>{" "}
					Seats
				</>
			),
			renderCell: (rowsData) => (
				<div className="d-flex align-items-center gap-1">
					<div className="columnData text-dark" style={{ marginTop: "0.2rem" }}>
						{rowsData.row.seats}
					</div>
				</div>
			),

			flex: 1,
			minWidth: 60,
		},
		{
			field: "city",
			headerName: "City",
			description: "This column has a value getter and is not sortable.",
			sortable: false,
			flex: 1,
			minWidth: 150,
			renderCell: (rowsData) => {
				return (
					<div className="columnData">
						{rowsData.row.restaurant.city.cityName}
					</div>
				);
			},
		},
		{
			field: "id",
			headerName: "Reservation ID",
			description: "This column has a value getter and is not sortable.",
			sortable: false,
			flex: 1,
			minWidth: 120,
			renderCell: (rowsData) => {
				return (
					<div
						className="columnData"
						// className="RowTopContent d-flex align-items-center  gap-3"
						// style={{ width: "100%" }}
					>
						{rowsData.row.id}
					</div>
				);
			},
		},
		{
			field: "price",
			headerName: (
				<>
					<img
						className="headerIcon "
						style={{ width: "18px" }}
						src={dollarIcon}
						alt=""
					/>{" "}
					Price
				</>
			),
			renderCell: (rowsData) => (
				<div className="d-flex align-items-center gap-1">
					<div className="columnData text-dark" style={{ marginTop: "0.2rem" }}>
						{rowsData.row.seats}
					</div>
				</div>
			),
			description: "This column has a value getter and is not sortable.",
			sortable: false,
			flex: 1,
			minWidth: 80,
		},
		{
			description: "This column has a value getter and is not sortable.",
			sortable: false,
			flex: 1,
			minWidth: 150,
			renderCell: (rowsData) => {
				return (
					<div id={rowsData.row.id} className=" w-100">
						{activeId === rowsData.row.id ? (
							<div
								className="overlay align-items-center  position-absolute d-flex flex-column"
								style={{
									top: Yposition - 20,
									right: "10px",
									zIndex: 444444444,
								}}
							>
								<div
									className="d-flex align-items-center px-1 tablebtn"
									style={{ width: "90%" }}
								>
									<span style={{ color: "red" }}>
										<img src={editicon} style={{ width: "18px" }} alt="" />
									</span>{" "}
									<button
										onClick={() => {
											handledit(rowsData);
										}}
									>
										Edit
									</button>
								</div>
								<div
									className="borderbottom w-100 my-2 "
									style={{ border: "0.1px solid #E3E3E3" }}
								></div>
								<div
									className="d-flex align-items-center tablebtn"
									style={{ width: "90%" }}
								>
									<span style={{ color: "red" }}>
										<DeleteOutlineIcon />
									</span>{" "}
									<button onClick={() => deleteRow(rowsData.row.id)}>
										Delete
									</button>
								</div>
							</div>
						) : (
							""
						)}
						<button
							onClick={showOverlay1}
							style={{ background: "none", border: "none" }}
						>
							<img src={threeDots} style={{ width: "5px" }} alt="" />
						</button>
					</div>
				);
			},
		},
	];

	function showOverlay1(e) {
		const tableElement =
			e.target.parentElement.parentElement.parentElement.parentElement
				.parentElement;
		// console.log(tableElement);
		let bounds = tableElement.getBoundingClientRect();
		// let x = e.clientX - tableElement.left;
		let y = e.clientY - bounds.top;
		// console.log("y is" + y);
		setYposition(y);
		const id = e.target.parentElement.parentElement.id;
		console.log(e.target.parentElement.id);
		setActiveId(Number(id));
		// setActiveId(id);
	}
	const deleteRow = async (id) => {
		// console.log("delete");
		// console.log(activeId);
		const response = await DeleteReservation(id);
		setRowsData(rowsData.filter((item) => item.id !== activeId));
	};

	// function handlerowEdit(rowsData) {
	//   console.log(params);
	// }
	return (
		<div
			className=" available position-relative"
			style={{ height: 600, width: "100%", marginTop: "2rem" }}
		>
			<span style={{ position: "absolute", top: "0.5rem", right: "5rem" }}>
				<img style={{ width: "2rem" }} src={topicon} alt="" />
			</span>
			<DataGrid
				rows={rowsData}
				columns={columns}
				pageSize={8}
				rowsPerPageOptions={[8, 10, 15, 20]}
				checkboxSelection={false}
				rowHeight={70}
				// onSelectionModelChange={(data) => {
				//   console.log(data);
				// }}
			/>
		</div>
	);
}

export default Available;
