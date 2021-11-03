import { getCookieValues } from "../services/cookieService";
import { AppState } from "../types/types";

const data = getCookieValues();
const { simonPlayer, simonBests } = data;
const currPlayer = simonPlayer ? simonPlayer : "Guest";
const bestScores = simonBests ? JSON.parse(simonBests) : [];

const initialState: AppState = {
  player: currPlayer,
  gameScore: 0,
  bestScores: bestScores,
  sequence: [],
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_PLAYER":
      return { ...state, player: action.player };
    case "SET_SCORE":
      return { ...state, gameScore: state.gameScore + 1 };
    case "SET_BESTS":
      return { ...state, bestScores: action.bests };
    case "SET_SEQUENCE":
      return { ...state, sequence: [...state.sequence, action.move] };
    case "RESET_GAME":
      return initialState;
    default:
      return state;
  }
};

export default appReducer;
