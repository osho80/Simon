export const setPlayer = (player) => {
  return (dispatch) => {
    dispatch(_setPlayer(player));
  };
};

export const setScore = (score) => {
  return (dispatch) => {
    dispatch(_setScore(score));
  };
};

export const setBests = (bests) => {
  return (dispatch) => {
    dispatch(_setBests(bests));
  };
};

export const setSequence = (move) => {
  return (dispatch) => {
    dispatch(_setSequence(move));
  };
};

export const setSound = (isSound) => {
  return (dispatch) => {
    dispatch(_setSound(isSound));
  };
};

export const resetGame = () => {
  return (dispatch) => {
    dispatch(_resetGame());
  };
};
const _setPlayer = (player) => {
  return { type: "SET_PLAYER", player };
};

const _setScore = (score) => {
  return { type: "SET_SCORE", score };
};

const _setBests = (bests) => {
  return { type: "SET_BESTS", bests };
};

const _setSequence = (move) => {
  return { type: "SET_SEQUENCE", move };
};

const _setSound = (isSound) => {
  return { type: "SET_SOUND", isSound };
};

const _resetGame = () => {
  return { type: "RESET_GAME" };
};
