import { MessageEmbed } from "discord.js";

import { normalizeKeyValuePair } from "../normalizer";
import { isValueValid } from "../validate";
import { getRandomColor } from "../randomColor";
import { getMonster } from "../monsters";

import { singleLineProperties } from "../../config/botConfig";
import { BASE_MORE_INFO_URL } from "../../config/generalConfig";

export const formatMonsterDataIntoMessage = (monster, selectedProperties = []) => {
  const { name, slug, ...monsterInfo } = monster;

  const formatedMessage = new MessageEmbed({
    title: name,
    color: getRandomColor(),
    url: `${BASE_MORE_INFO_URL}${slug}`,
  });

  const monsterInfoEntries = Object.entries(monsterInfo);
  const hasValidSelectedProperties = monsterInfoEntries.some(([key]) => selectedProperties.indexOf(key) >= 0);

  for (let [key, value] of Object.entries(monsterInfo)) {
    const [normalizedField, normalizedValue] = normalizeKeyValuePair(
      key,
      value
    );

    if (hasValidSelectedProperties && (selectedProperties.indexOf(key) < 0)) {
      continue;
    }

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

export const getMonsterBasedOnMonsterSelection = async (
  selectedIndex,
  monsterList
) => {
  const monsterName = monsterList[selectedIndex - 1];

  const selectedMonster = await getMonster(monsterName);

  return selectedMonster;
};
