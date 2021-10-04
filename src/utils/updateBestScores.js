import { store } from "../store/store";
import { setCookie } from "../services/cookieService";
import { setBests, resetGame } from "../store/actions";
// type score = {
//   player: string;
//   score: number;
// };

export const updateBestScores = () => {
  const state = store.getState();
  const bests = state.appStore.bestScores;
  const score = state.appStore.gameScore;
  const player = state.appStore.player;
  // if (bests.length > 0)
  //   console.log("current:", score, bests[bests.length - 1].score);
  const lowestScore = bests.length > 0 ? bests[bests.length - 1].score : 0;
  if (score > lowestScore || (score > 0 && bests.length < 10)) {
    // const newScore = { player, score };
    bests.push({ player, score });
    // bests.push(newScore);
    // console.log("bests:", bests);
    const sorted = bests.sort((a, b) => b.score - a.score);
    if (sorted.length > 10) sorted.pop();
    // console.log("sorted:", sorted);

    setCookie("simonBests", JSON.stringify(sorted), 60);
    store.dispatch(setBests(sorted));
  } else {
    console.log("Bests remain");
  }
  // store.dispatch(resetGame());
};
