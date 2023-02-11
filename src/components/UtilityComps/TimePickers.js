import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import { IosShare } from "@mui/icons-material";

function TimePickers({ time, getTime,setResetTimeDate,resetTimeDate }) {
  const [timeValue, setTimeValue] = useState(moment(time, "hh:mm a").format());

  // console.log(moment(time).format("h:mm a"));
  // useEffect(() => {
  //   setValue(time);
  // }, [value]);
  const SetTime = (timevalue) => {
    console.log("dsd")
    setTimeValue(timevalue);
    // console.log(moment(timevalue, "hh:mm s").format("LT"));
    getTime(moment(timevalue, "LT").format("hh:mm a"));
  };
  useEffect(() => {
        setTimeValue(moment(time, "hh:mm a").format());
    // getTime(moment(timeValue).format("hh:mm a"));
  }, [time]);

//  const resetTime=()=>{
// setTimeValue(moment().format())
//  }
    
// if(resetTimeDate){
//   SetTime(moment().format())
// }

// useEffect(()=>{
// if(resetTimeDate){
// resetTime()
//   // setResetTimeDate(false)
// }
// },[])
  



  return (
    <div className="col-8 px-0">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack component="form" noValidate spacing={3}>
          <TimePicker
            value={timeValue}
            inputFormat="hh:mm a"
            onChange={SetTime}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
}

export default TimePickers;
