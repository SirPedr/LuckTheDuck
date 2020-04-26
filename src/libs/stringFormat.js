export const capitalize = (string) =>
  typeof string === "string" ? `${string.charAt(0).toUpperCase()}${string.slice(1)}` : string;

export const normalizeField = (field) =>
  field.split("_").map((word) => capitalize(word)).join(" ");
