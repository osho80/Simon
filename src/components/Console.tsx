import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { theme } from "../theme";
import { setScore } from "../store/actions";
import { updateBestScores } from "../utils/updateBestScores";

const Console = (props: any) => {
  const [numOfMove, setNumOfMove] = useState<number>(0);

  const handlePlayerMove = (value: number) => {
    const light = "light";
    const el = document.getElementById(`${value}`);
    if (el) {
      el.classList.add(light);
      setTimeout(() => el.classList.remove(light), 200);
    }
    if (value === props.sequence[numOfMove]) {
      if (numOfMove === props.sequence.length - 1) {
        props.setScore();
        props.toggleTurns();
        setNumOfMove(0);
      } else {
        setNumOfMove(numOfMove + 1);
      }
    } else {
      updateBestScores();
      props.setGameOn(false);
      setNumOfMove(0);
    }
  };
  return (
    <GameConsole>
      <TopLeft
        id={"1"}
        className="off"
        onClick={() => handlePlayerMove(1)}
      ></TopLeft>
      <TopRight
        id={"2"}
        className="off"
        onClick={() => handlePlayerMove(2)}
      ></TopRight>
      <BottomLeft
        id={"3"}
        className="off"
        onClick={() => handlePlayerMove(3)}
      ></BottomLeft>
      <BottomRight
        id={"4"}
        className="off"
        onClick={() => handlePlayerMove(4)}
      ></BottomRight>
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

const gameConsole = `
&:hover {
  cursor: pointer;
}
&.off {
  pointer-events: none;
}
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
  ${gameConsole}
`;
const TopRight = styled.div`
  grid-area: topRight;
  background-color: red;
  border-radius: 0 90% 0 0;
  border-left: ${theme.consoleBorder}px solid black;
  border-bottom: ${theme.consoleBorder}px solid black;
  box-shadow: inset 200px 200px 200px 200px rgba(0, 0, 0, 0.3);
  &.light {
    ${theme.noShadow}
  }
  ${gameConsole}
`;
const BottomLeft = styled.div`
  grid-area: bottomLeft;
  background-color: yellow;
  border-radius: 0 0 0 90%;
  border-right: ${theme.consoleBorder}px solid black;
  border-top: ${theme.consoleBorder}px solid black;
  box-shadow: inset 200px 200px 200px 200px rgba(0, 0, 0, 0.3);
  &.light {
    ${theme.noShadow}
  }
  ${gameConsole}
`;
const BottomRight = styled.div`
  grid-area: bottomRight;
  background-color: blue;
  border-radius: 0 0 90% 0;
  border-left: ${theme.consoleBorder}px solid black;
  border-top: ${theme.consoleBorder}px solid black;
  box-shadow: inset 200px 200px 200px 200px rgba(0, 0, 0, 0.3);
  &.light {
    ${theme.noShadow}
  }
  ${gameConsole}
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
  return {
    sequence: state.appStore.sequence,
  };
};

const mapDispatchToProps = {
  setScore,
};

export default connect(mapStateToProps, mapDispatchToProps)(Console);
