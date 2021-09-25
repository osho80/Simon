import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { theme } from "../theme";

import { setCookie } from "../services/cookieService";

const Console = () => {
  return (
    <GameConsole>
      <TopLeft id={"1"}></TopLeft>
      <TopRight id={"2"}></TopRight>
      <BottomLeft id={"3"}></BottomLeft>
      <BottomRight id={"4"}></BottomRight>
      <ConsoleCenter />
    </GameConsole>
  );
};

const GameConsole = styled.div`
  width: ${theme.consoleCenterSize * 3}px;
  height: ${theme.consoleCenterSize * 3}px;
  outline: ${theme.consoleBorder * 2}px solid black;
  border-radius: 50%;
  margin: 20px;
  position: relative;
  display: grid;
  grid-template-areas:
    "topLeft topRight"
    "bottomLeft bottomRight";
`;

const TopLeft = styled.div`
  grid-area: topLeft;
  background-color: green;
  border-radius: 90% 0 0 0;
  border-right: ${theme.consoleBorder}px solid black;
  border-bottom: ${theme.consoleBorder}px solid black;
  box-shadow: inset 200px 200px 200px 200px rgba(0, 0, 0, 0.3);
  &.light {
    ${theme.greenLight}
  }
  &:hover {
    cursor: pointer;
    // box-shadow: inset 200px 200px 200px 200px rgba(255, 255, 255, 0.4);
  }
`;
const TopRight = styled.div`
  grid-area: topRight;
  background-color: red;
  border-radius: 0 90% 0 0;
  border-left: ${theme.consoleBorder}px solid black;
  border-bottom: ${theme.consoleBorder}px solid black;
  box-shadow: inset 200px 200px 200px 200px rgba(0, 0, 0, 0.3);
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
  &.light {
    ${theme.noShadow}
  }
`;
const BottomLeft = styled.div`
  grid-area: bottomLeft;
  background-color: yellow;
  border-radius: 0 0 0 90%;
  border-right: ${theme.consoleBorder}px solid black;
  border-top: ${theme.consoleBorder}px solid black;
  box-shadow: inset 200px 200px 200px 200px rgba(0, 0, 0, 0.3);
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
  &.light {
    ${theme.noShadow}
  }
`;
const BottomRight = styled.div`
  grid-area: bottomRight;
  background-color: blue;
  border-radius: 0 0 90% 0;
  border-left: ${theme.consoleBorder}px solid black;
  border-top: ${theme.consoleBorder}px solid black;
  box-shadow: inset 200px 200px 200px 200px rgba(0, 0, 0, 0.3);
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
  &.light {
    ${theme.noShadow}
  }
`;

const ConsoleCenter = styled.div`
  width: ${theme.consoleCenterSize}px;
  height: ${theme.consoleCenterSize}px;
  border-radius: 50%;
  background-color: black;
  position: absolute;
  top: ${theme.consoleCenterSize}px;
  right: ${theme.consoleCenterSize}px;
`;

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Console);
