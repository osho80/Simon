export const getRandomIntInclusive = (min: number = 1, max: number = 4) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
