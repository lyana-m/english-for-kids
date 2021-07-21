export const playSound = (src: string | undefined) => {
  const audio = new Audio();
  if (src) audio.src = src;
  audio.currentTime = 0;
  audio.play();
};

export const getRandomInteger = (min: number, max: number) => {
  const minRound = Math.ceil(min);
  const maxRound = Math.floor(max);
  return Math.floor(Math.random() * (maxRound - minRound + 1)) + minRound;
};
