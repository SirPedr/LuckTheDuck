export const getRandomColor = () =>
  `#${Math.floor(Math.random() * Math.pow(256, 3)).toString(16)}`;
