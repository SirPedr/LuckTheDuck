export const capitalize = (text: string): string =>
  isString(text) ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : text;

export const isString = (value: unknown): value is string =>
  typeof value === "string" || value instanceof String;
