import { theme } from "../theme";
import { store } from "../store/store";
import { setTimeout } from "timers";
const light = "light";

const lightDelay = (move: number, idx: number) => {
  const el = document.getElementById(`${move}`);
  if (el) {
    setTimeout(() => el.classList.add(light), idx * theme.simonLightSpan);
    setTimeout(
      () => el.classList.remove(light),
      idx * theme.simonLightSpan + 700
    );
  }
};

export const lightGamePad = () => {
  const state = store.getState();
  const sequence = state.appStore.sequence;
  const isFirstMoves =
    sequence.length === 2 || sequence.length === 3 ? true : false;

  if (isFirstMoves) {
    lightDelay(sequence[0], 1);
    setTimeout(() => lightDelay(sequence[1], 1), 1000);
    if (sequence.length === 3) {
      setTimeout(() => lightDelay(sequence[2], 2), 1000);
    }
  } else {
    sequence.forEach((move, idx) => lightDelay(move, idx));
  }
};
