import React, { useLayoutEffect, useState } from "react";

import "./NewReservation.css";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TimePickers from "../UtilityComps/TimePickers";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Datepicker from "../UtilityComps/Datepicker";
import moment from "moment";

import { UpdateReservation } from "../../API/services/reservations/UpdateReservation";
import { useEffect } from "react";
import { GenerateCode } from "../../API/services/reservations/GenerateCode";
import { GetResturants } from "../../API/services/resturantsApis/GetResturants";
import { AddReservation } from "../../API/services/reservations/AddReservation";

function AddNewReservation() {
	const { state } = useLocation();
	const [data, setdata] = useState(state);

	const navigate = useNavigate(null);

	const [resturants, setResturants] = useState([]);
	const [resturantId, setResturantId] = useState(null);
	const [isEdit, SetIsEdit] = useState(data ? true : false);

	const [date, setdate] = useState(
		data ? data.date : moment().format("DD MMM yyyy")
	);

	const [time, setTime] = useState(
		data
			? data.time
				? data.time
				: moment(data.date).format("HH:mm A")
			: moment().format("hh:mm a")
	);

	// const [time, setTime] = useState(
	//   data ? data.time : moment().format("hh:mm a")
	// );

	const [code, setCode] = useState(null);
	const [error, setError] = useState(false);
	const [resetTimeDate, setResetTimeDate] = useState(false);
	const schema = yup.object().shape({
		seats: yup.number().required(),
		price: yup.number().min(1).required(),

		purchasingCode: yup.string().required(),
	});
	console.log(state);
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			seats: state ? state.seats : "",
			price: state ? state.price : "",
			purchasingCode: state ? state.code : "",
		},
		resolver: yupResolver(schema),
	});

	const Submit = async (data, e) => {
		e.preventDefault();
		const dateObject = new Date(`${date} ${time}`);
		const formattedDate = dateObject.toISOString();
		var data1 = {
			date: formattedDate,
			time: time,
			price: data.price,
			code: data.purchasingCode,
			restaurantId: resturantId,
			seats: data.seats,
		};
		// console.log(data1);
		try {
			if (isEdit) {
				delete data1.restaurantId;
				data1.reservationId = state.id;

				const response = await UpdateReservation(JSON.stringify(data1));
				console.log(response);
				navigate("/available");
			} else {
				const response = await AddReservation(JSON.stringify(data1));
				navigate("/available");
			}
		} catch (error) {}
	};

	function handleReset(e) {
		e.preventDefault();

		setdate(moment().format("DD MMM yyyy"));
		setTime(moment().format("hh:mm a"));
		reset({
			price: "",
			seats: "",
			purchasingCode: "",
		});
	}
	const getResturantId = (e) => {
		const selectedResturant = resturants
			.filter((resturant) => resturant.restaurantName === e.target.value)
			.find((res) => res);

		setResturantId(selectedResturant.id);
	};

	const getResturants = async () => {
		setError(false);

		try {
			const response = await GetResturants();
			setResturants(response.data.message);
			// console.log(response.data.message[0]);
			setResturantId(response.data.message[0].id);
		} catch (err) {
			console.log(err);
		}
	};

	const generateCode = async (e) => {
		e.preventDefault();
		const response = await GenerateCode();
		// console.log(response.data.data);
		setCode(response.data.data);
	};
	useEffect(() => {
		// getting resturants data

		getResturants();
	}, []);

	const getDate = (date) => {
		//setting date onchange datepicker
		console.log("dsafasdf");
		setdate(date);
	};
	const getTime = (time) => {
		setTime(time);
	};
	console.log(errors);
	return (
		<div className="newReservation">
			<div className="formWrapper">
				{error && (
					<p style={{ color: "red", marginBottom: "0" }}>
						Please fill all the fields
					</p>
				)}
				<div className="form">
					<form onSubmit={handleSubmit(Submit)}>
						<div className="newReservationField mb-3 row align-items-center">
							<label htmlFor="#" className="col-4">
								Restaurant Name
							</label>
							<select
								class="form-select"
								aria-label="Default select example"
								onChange={getResturantId}
								className="col-8"
							>
								{resturants.map((resturant, index) => (
									<option key={index}>{resturant.restaurantName}</option>
								))}
							</select>
						</div>

						<div className="newReservationField mb-3 row  align-items-center position-relative">
							<label htmlFor="#" className="col-4">
								Date
							</label>

							<Datepicker
								resetTimeDate={resetTimeDate}
								control={control}
								setResetTimeDate={setResetTimeDate}
								date={date}
								getDate={getDate}
							/>
						</div>
						<div className="newReservationField mb-3 row  align-items-center">
							<label className="col-4" htmlFor="#">
								Time
							</label>

							<TimePickers
								setResetTimeDate={setResetTimeDate}
								resetTimeDate={resetTimeDate}
								time={time}
								getTime={getTime}
							/>
						</div>
						<div className="newReservationField mb-3 row align-items-center">
							<label htmlFor="#" className="col-4">
								Seats
							</label>
							<input
								className="col-8"
								type="number"
								min={1}
								{...register("seats")}
								placeholder="Enter no of seats"
								style={
									errors.seats ? { border: "0.760739px solid #E95048" } : {}
								}
							/>
							{/* <p>{errors.seats ? "must be greater than 1" : ""}</p> */}
						</div>
						<div className="newReservationField mb-3 row  align-items-center">
							<label htmlFor="#" className="col-4">
								Price
							</label>
							<input
								className="col-8"
								type="text"
								{...register("price")}
								placeholder="$75..."
								style={
									errors.price ? { border: "0.760739px solid #E95048" } : {}
								}
							/>
						</div>
						<div className="newReservationField mb-3 row   align-items-center">
							<label htmlFor="#" className="col-4">
								Code
							</label>
							<div className="col-8">
								<div className="row">
									<div className="col-8 px-0">
										<input
											type="text"
											placeholder="Purchasing Code"
											{...register("purchasingCode")}
											value={code}
											style={
												errors.purchasingCode
													? { border: "0.760739px solid #E95048" }
													: {}
											}
										/>
									</div>
									<div className="col-4 align-self-center">
										<button
											onClick={generateCode}
											className="autoGenerate"
											style={{
												borderRadius: "15",
												width: "143px",
												height: "45px",
												borderSpacing: "1",
											}}
										>
											Auto Generate
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="formButtons row  mt-4  ">
							<div className="col-3 "></div>
							<div className="col-9 d-flex justify-content-center gap-4 ">
								<div className="col-4">
									<button onClick={handleReset} className="reset w-100">
										reset
									</button>
								</div>
								<div className="col-4">
									<button
										type="submit"
										// onClick={Submit}
										className="submit w-100"
									>
										submit
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AddNewReservation;
