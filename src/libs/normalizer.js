import { isString, capitalize } from "./stringFormat";

const normalizeSpeed = speed => {
  return `Walk: ${speed.walk}${speed.fly ? ` | Fly: ${speed.fly}` : ""}${
    speed.swim ? ` | Swim: ${speed.swim}` : ""
  }`;
};

const normalizeActions = actions => {
  const normalizedActions = [];

  for (let action of actions) {
    normalizedActions.push([action.name, action.desc]);
  }

  return normalizedActions;
};

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

const propertyHandler = {
  speed: normalizeSpeed,
  actions: normalizeActions
};

export const normalizeKeyValuePair = (key, value) => {
  const customNormalizer = propertyHandler[key];

  return [
    normalizeField(key),
    (customNormalizer && customNormalizer(value)) || normalizeValue(value)
  ];
};
