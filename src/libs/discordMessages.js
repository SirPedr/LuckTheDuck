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
