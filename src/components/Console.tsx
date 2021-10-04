import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { theme } from "../theme";
import {
  setPlayer,
  setScore,
  setBests,
  setSequence,
  resetGame,
} from "../store/actions";
import { updateBestScores } from "../utils/updateBestScores";
import { setCookie } from "../services/cookieService";

const Console = (props: any) => {
  const [numOfMove, setNumOfMove] = useState<number>(0);

  const handlePlayerMove = (value: number) => {
    // console.log("My handlePlayerMove", value);
    const light = "light";
    const el = document.getElementById(`${value}`);
    if (el) {
      el.classList.add(light);
      setTimeout(() => el.classList.remove(light), 200);
    }
    if (value === props.sequence[numOfMove]) {
      // console.log("Yipi Kay yei!!!");
      if (numOfMove === props.sequence.length - 1) {
        console.log("Equal!!!", numOfMove, props.sequence.length - 1);

        props.setScore();
        props.toggleTurns();
        setNumOfMove(0);
      } else {
        console.log("Strange!!!", numOfMove, props.sequence.length - 1);

        setNumOfMove(numOfMove + 1);
      }
    } else {
      console.log(
        "props.sequence[numOfMove]:",
        props.sequence[numOfMove],
        "value:",
        value
      );
      updateBestScores();
      props.setGameOn(false);
      setNumOfMove(0);
      console.log("You lose !!!");
      // App breaks after second round - why????
    }
  };
  // console.log("My Console props", props);
  console.log("My numOfMove", numOfMove);
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
  // &:hover {
  //   cursor: pointer;
  //   // box-shadow: inset 200px 200px 200px 200px rgba(255, 255, 255, 0.4);
  // }
  // &.off {
  //   pointer-events: none;
  // }
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
  // &:hover {
  //   cursor: pointer;
  //   box-shadow: none;
  // }
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
  // &:hover {
  //   cursor: pointer;
  //   box-shadow: none;
  // }
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
  // &:hover {
  //   cursor: pointer;
  //   box-shadow: none;
  // }
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
    gameScore: state.appStore.gameScore,
    bestScores: state.appStore.bestScores,
  };
};

const mapDispatchToProps = {
  setScore,
  resetGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(Console);
