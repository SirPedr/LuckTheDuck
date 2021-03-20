import { MessageEmbed } from "discord.js";
import { singleLineProperties } from "../../config/botConfig";
import {
  SEARCH_CATEGORY_REGEX,
  SEARCH_OPTIONS_REGEX,
  SEARCH_PROPERTIES_REGEX,
  SEARCH_QUERY_REGEX,
} from "../../config/regex";
import { FieldsToDisplayBasedOnQueryType } from "../../consts/fieldsToDisplay";
import { normalizeKeyValuePair } from "../normalizer";
import { getRandomColor } from "../randomColor";
import { isValueValid } from "../validate";

export const getParamsFromCommand = (messageContent) => {
  const query = messageContent.match(SEARCH_QUERY_REGEX);
  const additionalConfig = messageContent.match(SEARCH_OPTIONS_REGEX);
  const [category] = messageContent.match(SEARCH_CATEGORY_REGEX);

  const options = additionalConfig
    ? additionalConfig.reduce(
        (currentOptions, config) => ({ ...currentOptions, [config]: true }),
        {}
      )
    : {};

  const params = {
    properties: getSelectedProperties(messageContent),
    options: { ...options, search: query ? query.join("+").toLowerCase() : "" },
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

export const formatDataIntoMessage = (
  data,
  category,
  selectedProperties,
  externalUrl
) => {
  const { name, ...infoToBeDisplayed } = data;
  const fieldsToDisplay = FieldsToDisplayBasedOnQueryType[category];

  const formatedMessage = new MessageEmbed({
    title: name,
    color: getRandomColor(),
    ...(externalUrl ? { url: externalUrl } : {}),
  });

  const filteredInfo = Object.entries(infoToBeDisplayed).filter(([entryKey]) =>
    fieldsToDisplay.includes(entryKey)
  );

  const entriesToDisplay = (!selectedProperties.length
    ? filteredInfo
    : filteredInfo.filter(
        ([propertyKey]) => selectedProperties.indexOf(propertyKey) >= 0
      )
  ).sort(
    ([firstEntryKey], [secondEntryKey]) =>
      fieldsToDisplay.indexOf(firstEntryKey) -
      fieldsToDisplay.indexOf(secondEntryKey)
  );

  for (let [key, value] of entriesToDisplay) {
    const [normalizedField, normalizedValue] = normalizeKeyValuePair(
      key,
      value
    );

    const shouldValueBeInline = !singleLineProperties.includes(key);

    if (isValueValid(normalizedValue)) {
      if (Array.isArray(normalizedValue)) {
        for (let [title, description] of normalizedValue) {
          formatedMessage.addField(title, description, shouldValueBeInline);
        }
      } else {
        formatedMessage.addField(
          normalizedField,
          normalizedValue,
          shouldValueBeInline
        );
      }
    }
  }

  return formatedMessage;
};

const getSelectedProperties = (message) => {
  const properties = message.match(SEARCH_PROPERTIES_REGEX) || [];

  return properties.map((prop) => prop.trim().replace(" ", "_").toLowerCase());
};
