import { compose } from "redux";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type score = {
  player: string;
  score: number;
};

export interface AppState {
  player: string;
  gameScore: number;
  bestScores: score | score[];
  gamePads: NodeListOf<Element>;
  sequence: number[];
}
