import React from "react";

function CancelPage() {
  return (
    <div
      //   className="d-flex align-items-center"
      style={{
        background:
          "linear-gradient(94.36deg, #EEA657 0%, #EA674B 90.55%), #E95048",
      }}
    >
      <div
        className="CancelPageWrapper"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          rowGap: "1rem",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            textTransform: "capitalize",
            fontFamily: "Roboto",
            color: "white",
          }}
        >
          cancel
        </h1>
      </div>
    </div>
  );
}

export default CancelPage;
