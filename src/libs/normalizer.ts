import { isString, capitalize } from "./string";
import { attributeSlugs } from "../config/botConfig";
import { ActionType, APIFiedlValueType, SpeedType } from "../types/api";

const normalizeSpeed = (speed: SpeedType) => {
  return `Walk: ${speed.walk}${speed.fly ? ` | Fly: ${speed.fly}` : ""}${
    speed.swim ? ` | Swim: ${speed.swim}` : ""
  }`;
};

const normalizeActions = (actions: ActionType[]) => {
  const normalizedActions = [];

  for (const action of actions) {
    normalizedActions.push([action.name, action.desc]);
  }

  return normalizedActions;
};

const normalizeAttribute = (attributeValue: number) => {
  const modifier = Math.floor((attributeValue - 10) / 2);

  return `${attributeValue} (${modifier > 0 ? "+" : ""}${modifier})`;
};

const normalizeFieldName = (field: string) =>
  field
    .split("_")
    .map(word => capitalize(word))
    .join(" ");

const normalizeValue = (value: APIFiedlValueType) => {
  return Array.isArray(value)
    ? capitalize(value.join(", "))
    : isString(value)
    ? capitalize(value)
    : value;
};

const customNormalizerBasedOnPropertyKey: {
  // @TODO: Think about a better way to type the custom normalizer for values
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: (...args: any) => any;
} = {
  speed: normalizeSpeed,
  actions: normalizeActions,
  attribute: normalizeAttribute
};

export const normalizeKeyValuePair = (
  key: string,
  value: APIFiedlValueType
): [string, string | [string, string]] => {
  const valueNormalizer = attributeSlugs.includes(key)
    ? customNormalizerBasedOnPropertyKey.attribute
    : customNormalizerBasedOnPropertyKey[key] || normalizeValue;

  return [normalizeFieldName(key), valueNormalizer(value)];
};
