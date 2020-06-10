import { isString, capitalize } from "./string";
import { attributeSlugs } from "../config/botConfig";

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

const normalizeAttribute = attributeValue => {
  const modifier = Math.floor((attributeValue - 10) / 2);

  return `${attributeValue} (${modifier > 0 ? "+" : ""}${modifier})`;
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
  let customValueNormalizer = propertyHandler[key];

  if (attributeSlugs.includes(key)) {
    customValueNormalizer = normalizeAttribute;
  }

  return [
    normalizeField(key),
    (customValueNormalizer && customValueNormalizer(value)) ||
      normalizeValue(value)
  ];
};
