import { APIFiedlValueType } from "../types/api";
import { isString } from "./string";

export const isValueValid = (value: APIFiedlValueType): boolean =>
  Array.isArray(value) || isString(value)
    ? value.length > 0
    : value
    ? !isNaN(value)
    : false;
