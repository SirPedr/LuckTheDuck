import { MessageEmbed } from "discord.js";
import { MONSTER_NAME_REGEX, OPTIONS_REGEX } from "../config/regex";
import { capitalize, normalizeField } from "./stringFormat";

export const parseMessage = (messageContent) => {
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
    const fieldName = normalizeField(key);
    const normalizedValue =
      typeof value === "string" ? capitalize(value) : value;

    formatedMessage.addField(fieldName, normalizedValue, true);
  }

  return formatedMessage;
};
