import { isString, capitalize } from "./stringFormat";

export const normalizeKeyValuePair = (key, value) => {
  const propertyHandler = {
    speed: normalizeSpeed(value)
  };

  return [normalizeField(key), propertyHandler[key] || normalizeValue(value)];
};

const normalizeSpeed = speed => {
  return `Walk: ${speed.walk}${speed.fly ? ` | Fly: ${speed.fly}` : ""}${
    speed.swim ? ` | Swim: ${speed.swim}` : ""
  }`;
}

const normalizeField = field =>
  field
    .split("_")
    .map(word => capitalize(word))
    .join(" ");

const normalizeValue = value => {
  return Array.isArray(value)
    ? capitalize(value.join(", "))
    : isString(value)
    ? capitalize(value)
    : value;
};