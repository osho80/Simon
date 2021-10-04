import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { theme } from "../theme";
import Console from "../components/Console";
import ScoresTable from "../components/ScoresTable";
import { lightGamePad } from "../utils/lightGamePad";
import {
  setPlayer,
  setScore,
  setBests,
  setSequence,
  resetGame,
} from "../store/actions";

import { getRandomIntInclusive } from "../utils/getRandomInt";

const Main = (props: any) => {
  const [gameOn, setGameOn] = useState(false);
  // const [next, setNext] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [simonTurn, setSimonTurn] = useState(true);
  // const [sequence, setSequence] = useState<number[]>([]);
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
    // const els = document.querySelectorAll(".off");
    // setElements(els);

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
    // if (props.sequence.length === 1) {
    //   // const newSequence = [props.sequence[0], props.sequence[0]];
    //   props.setSequence(props.sequence[0]);
    //   lightGamePad([props.sequence[0], props.sequence[0]]);
    //   toggleTurns();
    // } else {
    //   const move = getRandomIntInclusive();
    //   // props.sequence.push(move);

    //   props.setSequence(move);
    //   // lightGamePad(newSequence);
    //   // console.log("My newSequence:", props.sequence);
    //   lightGamePad(props.sequence);
    //   toggleTurns();
    // }
  };

  // useEffect(() => {
  //   if (gameOn && props.sequence.length === 0) {
  //     const move = getRandomIntInclusive();
  //     // const randomInt = getRandomIntInclusive();
  //     // const newSequence = [randomInt];
  //     props.setSequence(move);
  //     lightGamePad([move]);
  //     // lightGamePad(newSequence);
  //     toggleTurns();
  //   }
  //   if (!gameOn && props.sequence.length > 0) {
  //     props.resetGame();
  //   }
  // }, [gameOn]);

  // useEffect(() => {
  //   if (simonTurn && props.sequence.length > 0) {
  //     playGame();
  //   }
  // }, [simonTurn]);

  useEffect(() => {
    const els = document.querySelectorAll(".off");
    setElements(els);

    if (gameOn) {
      playGame();
    } else if (!gameOn && props.sequence.length > 0) {
      // props.resetGame();
      setMessage(true);
    }
  }, [gameOn, playerTurn]);
  // console.log("Game props:", props);
  // console.log("is play:", gameOn);
  // console.log("is next:", next);
  // console.log("is playerTurn:", playerTurn);
  // console.log("is simonTurn:", simonTurn);
  // console.log("els:", elements);
  // console.log("isMessage:", isMessage);
  const divStyle = gameOn ? { backgroundColor: "lightgrey" } : {};
  const isVisible = isMessage ? "visible" : "hidden";

  return (
    // Add messages to the game and activate next sequence
    // only after message is off.
    // Perhaps it will solve
    // "LAST LIGHT IS NOT VISIBLE!!!!!!!!!" @ lightGamePads
    // Draw chart of game sequence and send messages accordingly.
    <MainContainer style={divStyle}>
      <Board>
        <h2>{props.player} is Playing</h2>
        <h2>Score: {props.gameScore}</h2>
        <button onClick={() => setGameOn(true)}>Play</button>
      </Board>
      <PlayZone>
        <MessageBox style={{ visibility: isVisible }}>
          {getMessage().text}
          {!gameOn && props.sequence.length > 0 && (
            <button onClick={() => handleEndGame()}>Start Over</button>
          )}
          {/* {simonTurn && gameOn && <h3>watch</h3>} */}
        </MessageBox>
        <Console toggleTurns={toggleTurns} setGameOn={setGameOn} />
      </PlayZone>
      <ScoresTable />
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

const PlayZone = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  setScore,
  setBests,
  setSequence,
  resetGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
