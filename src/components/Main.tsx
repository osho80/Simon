import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { theme } from "../theme";
import Console from "../components/Console";
import ScoresTable from "../components/ScoresTable";
import { lightGamePad } from "../utils/lightGamePad";
import { setPlayer, setSequence, resetGame } from "../store/actions";

import { getRandomIntInclusive } from "../utils/getRandomInt";

const Main = (props: any) => {
  const [gameOn, setGameOn] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [simonTurn, setSimonTurn] = useState(true);
  const [elements, setElements] = useState<[] | NodeListOf<Element>>([]);
  const [isMessage, setMessage] = useState(false);

  const removeClassOff = () => {
    elements.forEach((el) => {
      el.classList.remove("off");
    });
  };

  const addClassOff = () => {
    elements.forEach((el) => {
      el.classList.add("off");
    });
  };

  const toggleTurns = () => {
    if (simonTurn) {
      removeClassOff();
      setSimonTurn(false);
      setPlayerTurn(true);
    }
    if (playerTurn) {
      addClassOff();
      setMessage(true);
      setTimeout(() => setMessage(false), 2000);
      setPlayerTurn(false);
      setSimonTurn(true);
    }
  };

  const getMessage = () => {
    switch (true) {
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

  const handleEndGame = () => {
    setMessage(false);
    setSimonTurn(true);
    setPlayerTurn(false);
    props.resetGame();
  };

  const playGame = () => {
    switch (true) {
      case simonTurn && props.sequence.length === 0:
        console.log("Let's play!!");

        const move = getRandomIntInclusive();
        props.setSequence(move);
        setMessage(true);
        lightGamePad();
        setTimeout(() => {
          setMessage(false);
          toggleTurns();
        }, props.sequence.length * theme.simonLightSpan + 2000);
        // one function can do all of the above, just send the move number
        break;
      case simonTurn && props.sequence.length === 1:
        props.setSequence(props.sequence[0]);
        setMessage(true);
        lightGamePad();
        setTimeout(() => {
          setMessage(false);
          toggleTurns();
        }, props.sequence.length * theme.simonLightSpan + 2000);
        break;
      case simonTurn && props.sequence.length > 1:
        const nextMove = getRandomIntInclusive();
        props.setSequence(nextMove);
        setMessage(true);
        lightGamePad();
        setTimeout(() => {
          setMessage(false);
          toggleTurns();
        }, props.sequence.length * theme.simonLightSpan + 2000);
        break;
      default:
        console.log("props.sequence.length = ", props.sequence.length);
    }
  };

  useEffect(() => {
    const els = document.querySelectorAll(".off");
    setElements(els);

    if (gameOn) {
      playGame();
    } else if (!gameOn && props.sequence.length > 0) {
      setMessage(true);
    }
  }, [gameOn, playerTurn]);

  useEffect(() => {
    console.log("Best Scores Updated - useEffect:", props.bestScores);
  }, [props.bestScores]);

  const divStyle = gameOn ? { backgroundColor: "lightgrey" } : {};
  const isVisible = isMessage ? "visible" : "hidden";

  return (
    <MainContainer style={divStyle}>
      <Board>
        <h2>{props.player} is Playing</h2>
        <h2>Score: {props.gameScore}</h2>
        <button onClick={() => setGameOn(true)}>Play</button>
      </Board>
      <MinorContainer>
        <PlayZone>
          <MessageBox style={{ visibility: isVisible }}>
            <h3>{getMessage().text}</h3>
            {!gameOn && props.sequence.length > 0 && (
              <button onClick={() => handleEndGame()}>Start Over</button>
            )}
          </MessageBox>
          <Console toggleTurns={toggleTurns} setGameOn={setGameOn} />
        </PlayZone>
        <ScoreZone>
          <MessageBox>
            <h3>Score Board</h3>
          </MessageBox>
          <ScoresTable />
        </ScoreZone>
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
`;

const Board = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MinorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;

  // flex-wrap: wrap;
`;

const PlayZone = styled.div`
  // width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ScoreZone = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 0;
  margin: 0 50px;
`;

const MessageBox = styled.div`
  background-color: purple;
  margin: 50px;
`;

const mapStateToProps = (state: any) => {
  return {
    player: state.appStore.player,
    gameScore: state.appStore.gameScore,
    bestScores: state.appStore.bestScores,
    sequence: state.appStore.sequence,
  };
};

const mapDispatchToProps = {
  setPlayer,
  setSequence,
  resetGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
