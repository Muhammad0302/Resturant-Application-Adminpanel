import React, { useState } from "react";
import Topbar from "../topbar/Topbar";
// import Sidebar from "../sidebar/Sidebar";

import "./AdminPanel.css";
import { display } from "@mui/system";
function AdminPanel(props) {
  const {showTitle, childComp } = props;
  return (
    <div>
      <Topbar text={showTitle? "":"New Reservation"} />
      <div>{childComp}</div>
    </div>
  );
}

export default AdminPanel;
