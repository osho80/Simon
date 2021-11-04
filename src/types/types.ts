import { compose } from "redux";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type Score = {
  player: string;
  score: number;
};

export interface AppState {
  player: string;
  gameScore: number;
  bestScores: [] | Score[];
  sequence: number[];
  isSound: boolean;
}
