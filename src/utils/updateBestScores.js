import { store } from "../store/store";
import { setCookie } from "../services/cookieService";
import { setBests } from "../store/actions";

export const updateBestScores = () => {
  const state = store.getState();
  const bests = state.appStore.bestScores;
  const score = state.appStore.gameScore;
  const player = state.appStore.player;
  const lowestScore = bests.length > 0 ? bests[bests.length - 1].score : 0;
  if (score > lowestScore || (score > 0 && bests.length < 10)) {
    bests.push({ player, score });
    const sorted = bests.sort((a, b) => b.score - a.score);
    if (sorted.length > 10) sorted.pop();
    setCookie("simonBests", JSON.stringify(sorted), 60);
    store.dispatch(setBests(sorted));
  } else {
    return;
  }
};
