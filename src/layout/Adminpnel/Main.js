import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import MenuIcon from "@mui/icons-material/Menu";
import Navbar from "../navbar/Navbar";

import Sidebar from "../sidebar/Sidebar";
function Main(props) {
  const [showSidebar, setShowSidebar] = useState(false);
  const { menuSelected, flag, childComp } = props;

  return (
    <div>
      <div className="d-flex mainContent  gap-4">
        <span className="menuIcon" onClick={() => setShowSidebar(true)}>
          <MenuIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
        </span>

        <div className={` ${showSidebar ? "showSidebar" : "sidebar"}`}>
          <Sidebar />
          <span className="closeIcon" onClick={() => setShowSidebar(false)}>
            <CloseIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
          </span>
        </div>

        <div className="main mt-3">
          {showSidebar && <div className="screenOverlay"></div>}
          <div className="NavBar">
            {flag && <Navbar menuSelected={menuSelected} />}

            <div className="table1">{childComp}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
