// import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import createRoutes from "./routes";
const routes = createRoutes();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(routes);
