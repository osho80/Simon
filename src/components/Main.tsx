import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { theme } from "../theme";
import Console from "../components/Console";
import { lightGamePad } from "../utils/lightGamePad";
import { setPlayer, setScore, setBests, setSequence } from "../store/actions";

import { getRandomIntInclusive } from "../utils/getRandomInt";

const Main = (props: any) => {
  const [gameOn, setGameOn] = useState(false);
  const [next, setNext] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(false);
  useEffect(() => {
    if (gameOn) {
      let move = getRandomIntInclusive();
      props.setSequence(move);
      lightGamePad([move]);
      setPlayerTurn(true);
    }
  }, [gameOn]);

  //   const playGame = () => {
  //     if (play) {
  //       let move = getRandomIntInclusive();
  //       props.setSequence(move);
  //     }
  //   };

  //   playGame();
  console.log("Game props:", props);
  console.log("is play:", gameOn);
  console.log("is next:", next);
  const divStyle = gameOn ? { backgroundColor: "lightgrey" } : {};
  return (
    <MainContainer style={divStyle}>
      <button onClick={() => setGameOn(true)}>Play</button>
      <Console />
      {/* <ScoresTable /> */}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  max-width: 1440px;
  min-height: 85vh;
  margin: auto;
  display: flex;
  flex-wrap: wrap;s

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
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
