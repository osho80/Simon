import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setPlayer } from "../store/actions";

const Login = (props: any) => {
  const [name, setName] = useState("");
  console.log("New name:", name);

  return (
    <LoginContainer>
      <h3>Please enter your name</h3>
      <NameInput
        type="text"
        placeholder={props.player}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          props.setPlayer(name);
          props.setEditPlayer(false);
        }}
      >
        OK
      </button>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  position: absolute;
  z-index: 4;
  width: 400px;
  height: 200px;
  border: 2px solid black;
  background-color: lightgrey;
`;

const NameInput = styled.input`
  padding: 10px;
`;

const mapStateToProps = (state: any) => {
  return {
    player: state.appStore.player,
  };
};

const mapDispatchToProps = {
  setPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
