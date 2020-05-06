export const capitalize = string =>
  isString(string)
    ? `${string.charAt(0).toUpperCase()}${string.slice(1)}`
    : string;

export const normalizeField = field =>
  field
    .split("_")
    .map(word => capitalize(word))
    .join(" ");

export const normalizeValue = value => {
  return Array.isArray(value)
    ? capitalize(value.join(", "))
    : isString(value)
    ? capitalize(value)
    : value;
};

export const isString = value =>
  typeof value === "string" || value instanceof String;
