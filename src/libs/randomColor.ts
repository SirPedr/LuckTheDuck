export const getRandomColor = (): string =>
  `#${Math.floor(Math.random() * Math.pow(256, 3)).toString(16)}`;
