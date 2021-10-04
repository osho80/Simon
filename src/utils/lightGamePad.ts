import { theme } from "../theme";
const light = "light";

export const lightGamePad = (moves: number[]) => {
  console.log("My lightGamePad moves", moves);

  moves.forEach((move, idx) => {
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
