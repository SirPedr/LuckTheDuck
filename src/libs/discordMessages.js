import { MONSTER_NAME_REGEX } from "../config/regex";

export const parseMessage = (messageContent) => {
  const normalizedMonsterName = messageContent
    .match(MONSTER_NAME_REGEX)
    .join("-")
    .toLowerCase();

  /* @TODO: Verificar presença de parâmetros adicionais (ex: !private)
   na mensagem e colocar no objeto "params" */

  const params = {
    name: normalizedMonsterName,
  };

  return params;
};
