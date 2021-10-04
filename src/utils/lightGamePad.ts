import { theme } from "../theme";
import { store } from "../store/store";
const light = "light";

export const lightGamePad = () => {
  // console.log("My lightGamePad moves", moves);
  const state = store.getState();
  const sequence = state.appStore.sequence;
  // console.log("My lightGamePad state", state.appStore.sequence);

  sequence.forEach((move, idx) => {
    const el = document.getElementById(`${move}`);
    if (el) {
      setTimeout(() => el.classList.add(light), idx * theme.simonLightSpan);
      setTimeout(
        () => el.classList.remove(light),
        idx * theme.simonLightSpan + 700
      );
    }
  });
};

// Perhas use the store instead....
// Handle here as well the toggle of .off
// LAST LIGHT IS NOT VISIBLE!!!!!!!!!

// export const lightGamePad = (moves: number[]) => {
//   console.log("My lightGamePad moves", moves);

//   moves.forEach((move) => {
//     const el = document.getElementById(`${move}`);
//     let light = false;
//     const toggleLight = () => {
//       light = !light;
//     }
//     const handleLightEffect = () => {
//       if(el && light) {
//         setTimeout(() => el.classList.remove(_className), 700);
//       }
//     }
//     if (el) {
//       el.classList.add(_className);
//       toggleLight();
//       handleLightEffect();

//     }
//   });
// };
