import { MessageEmbed } from "discord.js";

import { MONSTER_NAME_REGEX, OPTIONS_REGEX, MONSTER_PROPERTIES_REGEX } from "../../config/regex";

export const getParamsFromCommand = (messageContent) => {
  const monsterName = messageContent
  .match(MONSTER_NAME_REGEX);

  const additionalConfig = messageContent.match(OPTIONS_REGEX);

  const params = {
    name: "",
    isPrivate: additionalConfig.includes("private")
  }; 
  
  if (monsterName) {
    params.name = monsterName
    .join("+")
    .toLowerCase();
  }

  return params;
};

export const createOptionsList = (options) => {
  if (options.length) {
    const optionsListMessage = new MessageEmbed();

    optionsListMessage.setTitle(
      "Found many entries in my books. Wich one do you want? (Type the number)"
    );

    const optionsListContent = options
      .map((option, index) => `**${index + 1})** ${option}`)
      .join("\n");

    optionsListMessage.setDescription(optionsListContent);

    return optionsListMessage;
  }
};

export const getSelectedProperties = (message) => {
  const properties = message.match(MONSTER_PROPERTIES_REGEX) || [];

  return properties.map(prop => prop.trim().replace(" ", "_").toLowerCase());
}