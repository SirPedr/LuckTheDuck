import { MessageEmbed } from "discord.js";
import { MONSTER_NAME_REGEX, OPTIONS_REGEX } from "../config/regex";

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

  formatedMessage.setTitle(monster.name);
  formatedMessage.addField("Type", monster.type, true);
  formatedMessage.addField("Armor Class", monster.armor_class, true);
  formatedMessage.addField("Dexterity", monster.dexterity, true);

  return formatedMessage;
};
