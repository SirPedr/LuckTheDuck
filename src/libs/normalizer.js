import { normalizeField, normalizeValue } from "./stringFormat";

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
};
