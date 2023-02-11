import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const Button = styled.div`
  padding: 1rem 0;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  width: 220px;
  font-size: 1.1rem;
  cursor: pointer;
  opacity: 0.8;
  font-weight: bold;
  background: linear-gradient(94.36deg, #eea657 0%, #ea674b 90.55%), #686868;
  &:hover {
    background: linear-gradient(94.36deg, #ec993f 60%, #e75534 90.55%), #797979;
  }
`;
function NewButton({ menuSelected }) {
  return (
    <Link
      className="text-capitalize"
      style={{ textDecoration: "none", color: "#fff", height: "100%" }}
      to={`/add${menuSelected}`}
    >
      <Button>
        <span className="addIcon mb-1">
          <AddIcon />
        </span>
        New {menuSelected}
      </Button>
    </Link>
  );
}

export default NewButton;
