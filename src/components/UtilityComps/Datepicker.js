import React, { useState, useEffect, useLayoutEffect } from "react";
// import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers";

import moment from "moment";


function Datepicker({ date, getDate,resetTimeDate,setResetTimeDate,control }) {
  // console.log("date is"+date)
  const [dateValue, setDateValue] = useState(date);
// if(resetTimeDate && moment(dateValue).format("DD MMM yyyy")!==moment().format("DD MMM yyyy")){
//  setDateValue(moment().format())

// }
  const setDate = (date) => {

      //  setResetTimeDate(false)
    setDateValue(date);
    
    getDate(moment(date).format("DD MMM yyyy"));
  };
  useEffect(() => {
    console.log("reset date is"+date)
  setDateValue(date);
    // getDate(moment(date).format("DD MMM yyyy"));
  }, [date]);

//   useLayoutEffect(()=>{
// setResetTimeDate(false)
//   },[])

//   if(resetTimeDate){
//    setDateValue(moment().format())
//   }
  // useEffect(()=>{
  //   setResetTimeDate(false)
  // },[dateValue])
// useEffect(()=>{

//   console.log("dsads")

// },[])
//   useEffect(()=>{
    
//    setDateValue(moment().format());

// },[resetTimeDate])
// if(resetTimeDate){
//   setResetTimeDate(false)
// }
//  const resetTime=()=>{
// setDateValue(moment().format())
//  }
    



// if(resetTimeDate){
// resetTime()

// }
  // setResetTimeDate(false)


  return (
    <div className="col-8 px-0 ">
      {" "}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date desktop"
            // inputFormat="day month year"
            inputFormat="dd MMM yyyy"
            // views={["year", "month", "day"]}

            value={dateValue}
            // onChange={(newValue) => {
            //   setValue1(newValue);
            // }}
            onChange={setDate}
            renderInput={(params) => <TextField  placeholder="s" {...params} />}
          />
   
      </LocalizationProvider>
      {/* <input
                type="date"
                placeholder="17 June 2022"
                defaultValue={state ? state.Date : ""}
                style={errorMsg ? { border: "0.760739px solid #E95048" } : {}}
              />
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Basic example"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider> */}
    </div>
  );
}

export default Datepicker;
