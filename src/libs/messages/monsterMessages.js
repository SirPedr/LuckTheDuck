import { MessageEmbed } from "discord.js";

import { normalizeKeyValuePair } from "../normalizer";
import { isValueValid } from "../validate";
import { getRandomColor } from "../randomColor";
import { getMonster } from "../monsters";

import { singleLineProperties } from "../../config/botConfig";
import { BASE_MORE_INFO_URL } from "../../config/generalConfig";

export const formatMonsterDataIntoMessage = (monster) => {
  const formatedMessage = new MessageEmbed();

  const { name, slug, ...monsterInfo } = monster;

  formatedMessage
    .setTitle(name)
    .setColor(getRandomColor())
    .setURL(`${BASE_MORE_INFO_URL}${slug}`);

  for (let [key, value] of Object.entries(monsterInfo)) {
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

export const handleMonsterSelection = async (response, monsterList) => {
  if (
    !isNaN(response.content) &&
    response.content >= 0 &&
    response.content <= monsterList.length
  ) {
    const selectedMonster = await getMonster(monsterList[response.content - 1]);

    const monsterDataMessage = formatMonsterDataIntoMessage(selectedMonster);

    return monsterDataMessage;
  }
};
