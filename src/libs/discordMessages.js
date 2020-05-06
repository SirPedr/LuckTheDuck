import { MessageEmbed } from "discord.js";

import { MONSTER_NAME_REGEX, OPTIONS_REGEX } from "../config/regex";

import { normalizeKeyValuePair } from "./normalizer";
import { isString } from "./stringFormat";

import { singleLineProperties } from "../config/botConfig";

const isValueValid = (value) => Array.isArray(value) || isString(value) ? value.length > 0 : !isNaN(value);

export const getParamsFromCommand = (messageContent) => {
  const normalizedMonsterName = messageContent
    .match(MONSTER_NAME_REGEX)
    .join("-")
    .toLowerCase();

  const additionalConfig = messageContent.match(OPTIONS_REGEX);

  const params = {
    name: normalizedMonsterName,
    isPrivate: additionalConfig.includes("private")
  };

  return params;
};

export const formatMonsterDataIntoMessage = (monster) => {
  const formatedMessage = new MessageEmbed();

  const { name, ...monsterInfo } = monster;

  formatedMessage.setTitle(name);

  for (let [key, value] of Object.entries(monsterInfo)) {

    const [normalizedField, normalizedValue] = normalizeKeyValuePair(key, value);
    
    const shouldValueBeInline = !singleLineProperties.includes(key);

    if(isValueValid(normalizedValue)) {
      formatedMessage.addField(normalizedField, normalizedValue, shouldValueBeInline);
    } 
  }

  return formatedMessage;
};