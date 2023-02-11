import React from "react";


import NewButton from "./Button/NewButton";
import styled from "styled-components";
const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  margin-top: 3.5rem;

  gap: 2.3rem;
`;

function Navbar({ menuSelected }) {
  return (
    <Nav>
  
      <NewButton menuSelected={menuSelected} />
    </Nav>
  );
}

export default Navbar;
