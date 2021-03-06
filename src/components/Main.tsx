import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { theme } from "../theme";
import Console from "../components/Console";
import ScoresTable from "../components/ScoresTable";
import Login from "../components/Login";
import { lightGamePad } from "../utils/lightGamePad";
import { setSequence, setSound, resetGame } from "../store/actions";

import { getRandomIntInclusive } from "../utils/getRandomInt";

const Main = (props: any) => {
  const [gameOn, setGameOn] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [simonTurn, setSimonTurn] = useState(true);
  const [elements, setElements] = useState<(HTMLElement | null)[]>([]);
  const [isMessage, setMessage] = useState(false);
  const [isEditPlayer, setEditPlayer] = useState(false);

  const removeClassOff = () => {
    elements.forEach((el) => {
      if (el) el.classList.remove("off");
    });
  };

  const addClassOff = () => {
    elements.forEach((el) => {
      if (el) el.classList.add("off");
    });
  };

  const toggleTurns = () => {
    if (simonTurn) {
      removeClassOff();
      setMessage(true);
      setTimeout(() => setMessage(false), 3000);
      setSimonTurn(false);
      setPlayerTurn(true);
    }
    if (playerTurn) {
      addClassOff();
      setPlayerTurn(false);
      setSimonTurn(true);
    }
  };

  const getMessage = () => {
    switch (true) {
      case simonTurn && props.sequence.length === 0:
        return { msgId: "x", text: "READY?" };
      case gameOn && simonTurn:
        return { msgId: 1, text: "WATCH" };
      case gameOn && playerTurn:
        return { msgId: 2, text: "PLAY" };
      case !gameOn && props.sequence && props.sequence.length > 0:
        return { msgId: 3, text: "GAME OVER" };
      default:
        return { msgId: 0, text: "" };
    }
  };

  const handleGameOrder = (move: number) => {
    props.setSequence(move);
    setMessage(true);
    lightGamePad();
    setTimeout(() => {
      setMessage(false);
      toggleTurns();
    }, props.sequence.length * theme.simonLightSpan + 2000);
  };

  const handleEndGame = () => {
    setMessage(false);
    setSimonTurn(true);
    setPlayerTurn(false);
    props.resetGame();
  };

  const playGame = () => {
    switch (true) {
      case simonTurn && props.sequence.length === 0:
        const move = getRandomIntInclusive();
        handleGameOrder(move);
        break;
      case simonTurn && props.sequence.length === 1:
        const secondMove = props.sequence[0];
        handleGameOrder(secondMove);
        break;
      case simonTurn && props.sequence.length > 1:
        const nextMove = getRandomIntInclusive();
        handleGameOrder(nextMove);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    const green = document.getElementById("1");
    const red = document.getElementById("2");
    const yellow = document.getElementById("3");
    const blue = document.getElementById("4");
    const pads = [green, red, yellow, blue];
    if (pads) setElements(pads);

    if (gameOn) {
      playGame();
    } else if (!gameOn && props.sequence.length > 0) {
      setMessage(true);
    }
  }, [gameOn, playerTurn]);

  const isVisible =
    isMessage || (!gameOn && props.sequence.length > 0) ? "visible" : "hidden";
  const currBest = props.bestScores.length > 0 ? props.bestScores[0].score : 0;
  const onOff = props.isSound ? "on" : "off";
  const speakerPngUrl = `../assets/images/speaker-${onOff}.png`;
  return (
    <MainContainer>
      <Board>
        {isEditPlayer && <Login setEditPlayer={setEditPlayer} />}
        <PlayButton
          width="40px"
          src="../assets/images/edit-player2.png"
          alt="Change Player Button"
          title="Change Player"
          onClick={() => setEditPlayer(true)}
        />
        <h2>Score: {props.gameScore}</h2>
        <h2>Best: {currBest}</h2>
        <PlayButton
          width="50px"
          src={speakerPngUrl}
          alt="Sound control"
          title="Toggle Sound"
          onClick={() => {
            props.setSound(!props.isSound);
          }}
        />
      </Board>

      <MinorContainer>
        <PlayZone>
          <MessageBox style={{ visibility: isVisible }}>
            <MsgTxt>{getMessage().text}</MsgTxt>
            {!gameOn && props.sequence.length > 0 && (
              <ApproveBtn onClick={() => handleEndGame()}>Try Again</ApproveBtn>
            )}
          </MessageBox>
          <Console
            toggleTurns={toggleTurns}
            setGameOn={setGameOn}
            setMessage={setMessage}
            isGameOn={gameOn}
            disablePads={addClassOff}
          />
        </PlayZone>
        <ScoresTable />
      </MinorContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  max-width: 1440px;
  min-height: 85vh;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

const Board = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const PlayButton = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

const MinorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  @media (max-width: 1400px) {
    flex-direction: column;
  }
`;

const PlayZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MessageBox = styled.div`
  display: flex;
  margin: 10px 0 15px;
`;

const MsgTxt = styled.h2`
  margin-right: 20px;
`;

const ApproveBtn = styled.button`
  padding: 0 20px;
  border: 2px solid black;
  border-radius: 8px;
  background-color: purple;
  color: white;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
`;

const mapStateToProps = (state: any) => {
  return {
    gameScore: state.appStore.gameScore,
    bestScores: state.appStore.bestScores,
    sequence: state.appStore.sequence,
    isSound: state.appStore.isSound,
  };
};

const mapDispatchToProps = {
  setSequence,
  setSound,
  resetGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
