import { MessageEmbed } from "discord.js";

import { MONSTER_NAME_REGEX, OPTIONS_REGEX } from "../../config/regex";

export const getParamsFromCommand = (messageContent) => {
  const normalizedMonsterName = messageContent
    .match(MONSTER_NAME_REGEX)
    .join("+")
    .toLowerCase();

  const additionalConfig = messageContent.match(OPTIONS_REGEX);

  const params = {
    name: normalizedMonsterName,
    isPrivate: additionalConfig.includes("private"),
  };

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

