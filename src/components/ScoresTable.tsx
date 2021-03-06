import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

type Score = {
  player: string;
  score: number;
};

const ScoresTable = (props: any) => {
  useEffect(() => {}, [props.score]);

  return (
    <TableContainer>
      <h3>Score Board</h3>
      <BestScores>
        <Row>
          <Head>#</Head>
          <Head>Name</Head>
          <Head>Score</Head>
        </Row>
        {props.bestScores.map((item: Score, idx: number) => {
          return (
            <Row>
              <Body>{idx + 1}</Body>
              <Body>{item.player}</Body>
              <Body>{item.score}</Body>
            </Row>
          );
        })}
      </BestScores>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  min-width: 300px;
  margin: 20px auto 0;
`;
const BestScores = styled.table`
  width: 100%;
  border: 2px solid black;
  padding: 30px;
`;
const Row = styled.tr``;
const Head = styled.th`
  font-size: 20px;
`;
const Body = styled.td`
  padding-top: 10px;
`;
const mapStateToProps = (state: any) => {
  return {
    bestScores: state.appStore.bestScores,
    score: state.appStore.gameScore,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ScoresTable);
