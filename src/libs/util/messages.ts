import { MessageEmbed } from "discord.js";
import { singleLineProperties } from "../../config/botConfig";
import {
  SEARCH_CATEGORY_REGEX,
  SEARCH_OPTIONS_REGEX,
  SEARCH_PROPERTIES_REGEX,
  SEARCH_QUERY_REGEX
} from "../../config/regex";
import { FieldsToDisplayBasedOnQueryType } from "../../consts/fieldsToDisplay";
import { APIResponseType } from "../../types/api";
import { Categories } from "../../types/categories";
import { CommandParamsType, CommandFlagsType } from "../../types/command";
import { normalizeKeyValuePair } from "../normalizer";
import { getRandomColor } from "../randomColor";
import { isValueValid } from "../validate";

export const getParamsFromCommand = (
  messageContent: string
): CommandParamsType => {
  const searchedText = messageContent.match(SEARCH_QUERY_REGEX);
  const additionalConfig = messageContent.match(SEARCH_OPTIONS_REGEX);

  const chosenCategoryMatch = messageContent.match(SEARCH_CATEGORY_REGEX);

  const category = chosenCategoryMatch
    ? (chosenCategoryMatch[0] as Categories)
    : Categories.MONSTERS;

  const flags: CommandFlagsType = additionalConfig
    ? additionalConfig.reduce(
        (currentOptions, config) => ({ ...currentOptions, [config]: true }),
        {}
      )
    : {};

  return {
    properties: getSelectedProperties(messageContent),
    flags,
    query: { search: searchedText ? searchedText.join("+").toLowerCase() : "" },
    category
  };
};

export const createOptionsList = (
  options: string[]
): MessageEmbed | undefined => {
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
  data: APIResponseType,
  category: Categories,
  selectedProperties: string[],
  externalUrl?: string
): MessageEmbed => {
  const { name, ...infoToBeDisplayed } = data;
  const fieldsToDisplay = FieldsToDisplayBasedOnQueryType[category];

  const formatedMessage = new MessageEmbed({
    title: name as string,
    color: getRandomColor(),
    ...(externalUrl ? { url: externalUrl } : {})
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

  for (const [key, value] of entriesToDisplay) {
    const [normalizedField, normalizedValue] = normalizeKeyValuePair(
      key,
      value
    );

    const shouldValueBeInline = !singleLineProperties.includes(key);

    if (isValueValid(normalizedValue)) {
      if (Array.isArray(normalizedValue)) {
        for (const [title, description] of normalizedValue) {
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

const getSelectedProperties = (message: string) => {
  const properties = message.match(SEARCH_PROPERTIES_REGEX) || [];

  return properties.map(prop => prop.trim().replace(" ", "_").toLowerCase());
};
