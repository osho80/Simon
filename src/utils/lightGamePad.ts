const _className = "light";
export const lightGamePad = (moves: number[]) => {
  console.log("My lightGamePad moves", moves);

  moves.forEach((move) => {
    const el = document.getElementById(`${move}`);
    if (el) {
      el.classList.add(_className);
      setTimeout(() => el.classList.remove(_className), 700);
    }
  });
};
