import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setPlayer } from "../store/actions";
import { setCookie } from "../services/cookieService";

const Login = (props: any) => {
  const [name, setName] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const isVisible = snackbar ? "visible" : "hidden";

  const submitName = (name: string) => {
    if (name.length < 3 || name.length > 15) {
      setSnackbar(true);
      return;
    } else {
      props.setPlayer(name);
      setCookie("simonPlayer", name, 60);
      props.setEditPlayer(false);
    }
  };

  return (
    <LoginComponent>
      <CloseBtn
        onClick={() => {
          props.setEditPlayer(false);
        }}
      >
        X
      </CloseBtn>
      <Text>Please enter your name</Text>
      <LoginForm>
        <NameInput
          type="text"
          placeholder={props.player}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onFocus={() => setSnackbar(false)}
        />
        <ConfirmBtn onClick={() => submitName(name)}>OK</ConfirmBtn>
      </LoginForm>
      <ErrMsg style={{ visibility: isVisible }}>
        Name must be 3-15 characters long
      </ErrMsg>
    </LoginComponent>
  );
};

const LoginComponent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 4;
  width: 400px;
  height: 250px;
  top: 0;
  left: 80px;
  border: 4px solid yellow;
  border-radius: 8px;
  background-color: blue;
`;

const CloseBtn = styled.button`
  padding: 8px 10px;
  margin: 10px 10px;
  border-radius: 50%;
  align-self: end;
  font-weight: bold;
  font-size: 16px;
  color: red;
  border: 2px solid red;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.h3`
  margin: 0;
  color: white;
`;

const LoginForm = styled.div`
  margin-bottom: 50px;
  // have less when snackbar is on
`;
const NameInput = styled.input`
  padding: 10px;
`;

const ConfirmBtn = styled.button`
  padding: 10px;
  font-weight: bold;
  font-size: 14px;
  color: green;
  border: 2px solid green;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
`;
const ErrMsg = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: red;
  margin-bottom: 10px;
  background-color: white;
  padding: 8px;
  border: 2px solid red;
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
