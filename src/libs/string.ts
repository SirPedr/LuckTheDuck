export const capitalize = (text: string) =>
  isString(text)
    ? `${text.charAt(0).toUpperCase()}${text.slice(1)}`
    : text;

export const isString = (value: any): value is string  =>
  typeof value === "string" || value instanceof String;
