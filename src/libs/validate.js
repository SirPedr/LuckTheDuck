import { isString } from "./stringFormat";

export const isValueValid = value =>
  Array.isArray(value) || isString(value) ? value.length > 0 : !isNaN(value);
