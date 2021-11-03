import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { theme } from "../theme";
import { setScore } from "../store/actions";
import { updateBestScores } from "../utils/updateBestScores";

const Console = (props: any) => {
  const [numOfMove, setNumOfMove] = useState<number>(0);
  const { isGameOn } = props;

  useEffect(() => {
    if (!isGameOn) props.disablePads();
  }, [isGameOn]);

  const centralButton = () => {
    switch (true) {
      case !isGameOn && props.sequence.length === 0:
        return {
          src: "../assets/images/play-blue.png",
          alt: "Play button",
          title: "Play Game",
          callback: () => {
            props.setMessage(true);
            setTimeout(() => {
              props.setMessage(false);
              props.setGameOn(true);
            }, 2000);
          },
        };
      case isGameOn:
        return {
          src: "../assets/images/Quick_restart.png",
          alt: "Restart button",
          title: "Restart Game",
          callback: () => {
            props.setGameOn(false);
            setNumOfMove(0);
          },
        };
      case !isGameOn && props.sequence.length > 0:
        return {
          src: "../assets/images/disapointed-emoji.gif",
          alt: "Disapointed Emoji Gif",
          title: "Try Again",
        };
      default:
        return {
          src: "",
          alt: "",
          title: "",
        };
    }
  };
  const { src, alt, title, callback } = centralButton();

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
      <ConsoleCenter>
        {src && alt && title && (
          <PlayButton
            src={src}
            alt={alt}
            title={title}
            onClick={callback}
          ></PlayButton>
        )}
      </ConsoleCenter>
    </GameConsole>
  );
};

const consoleSizeNormal = theme.consoleCenterSize * 3;
const consoleSizeSmall = theme.consoleCenterSize * 2;
const centerSizeNormal = theme.consoleCenterSize;
const centerSizeSmall = theme.consoleCenterSize * 0.667;
const borderStyle = `${theme.consoleBorder}px solid black;`;

const GameConsole = styled.div`
  width: ${consoleSizeNormal}px;
  height: ${consoleSizeNormal}px;
  outline: ${theme.consoleBorder * 2}px solid black;
  border-radius: 50%;
  margin: 20px;
  position: relative;
  display: grid;
  grid-template-areas:
    "topLeft topRight"
    "bottomLeft bottomRight";
  @media (max-width: 720px) {
    width: ${consoleSizeSmall}px;
    height: ${consoleSizeSmall}px;
  }
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
  border-right: ${borderStyle}
  border-bottom: ${borderStyle}
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
  border-left: ${borderStyle}
  border-bottom: ${borderStyle}
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
  border-right: ${borderStyle}
  border-top: ${borderStyle}
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
  border-left: ${borderStyle}
  border-top: ${borderStyle}
  box-shadow: inset 200px 200px 200px 200px rgba(0, 0, 0, 0.3);
  &.light {
    ${theme.noShadow}
  }
  ${gameConsole}
`;

const ConsoleCenter = styled.div`
  width: ${centerSizeNormal}px;
  height: ${centerSizeNormal}px;
  border-radius: 50%;
  background-color: black;
  position: absolute;
  top: ${centerSizeNormal}px;
  right: ${centerSizeNormal}px;
  @media (max-width: 720px) {
    width: ${centerSizeSmall}px;
    height: ${centerSizeSmall}px;
    top: ${centerSizeSmall}px;
    right: ${centerSizeSmall}px;
  }
`;

const PlayButton = styled.img`
  width: 140px;
  margin: 30px 0 0;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
  &.disabled {
    pointer-events: none;
  }
  @media (max-width: 720px) {
    width: 100px;
    margin-top: 17px;
  }
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
