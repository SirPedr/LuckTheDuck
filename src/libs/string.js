export const capitalize = string =>
  isString(string)
    ? `${string.charAt(0).toUpperCase()}${string.slice(1)}`
    : string;

export const isString = value =>
  typeof value === "string" || value instanceof String;
