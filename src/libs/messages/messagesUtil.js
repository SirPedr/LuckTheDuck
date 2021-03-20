import { MessageEmbed } from "discord.js";

import {
  SEARCH_QUERY_REGEX,
  SEARCH_CATEGORY_REGEX,
  SEARCH_OPTIONS_REGEX,
  SEARCH_PROPERTIES_REGEX,
} from "../../config/regex";

export const getParamsFromCommand = (messageContent) => {
  const query = messageContent.match(SEARCH_QUERY_REGEX);
  const additionalConfig = messageContent.match(SEARCH_OPTIONS_REGEX);
  const [category] = messageContent.match(SEARCH_CATEGORY_REGEX);

  const options = additionalConfig.reduce(
    (currentOptions, config) => ({ ...currentOptions, [config]: true }),
    {}
  );

  const params = {
    query: query ? query.join("+").toLowerCase() : "",
    properties: getSelectedProperties(messageContent),
    ...options,
    category,
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

const getSelectedProperties = (message) => {
  const properties = message.match(SEARCH_PROPERTIES_REGEX) || [];

  return properties.map((prop) => prop.trim().replace(" ", "_").toLowerCase());
};
