import { theme } from "../theme";
import { store } from "../store/store";
const light = "light";

export const lightGamePad = () => {
  const state = store.getState();
  const sequence = state.appStore.sequence;

  sequence.forEach((move, idx) => {
    const el = document.getElementById(`${move}`);
    if (el) {
      setTimeout(() => el.classList.add(light), idx * theme.simonLightSpan);
      setTimeout(
        () => el.classList.remove(light),
        idx * theme.simonLightSpan + 1000 // was 700
      );
    }
  });
};
