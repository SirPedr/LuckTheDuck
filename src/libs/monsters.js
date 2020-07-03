import { getFromAPI } from "./graphqlQuery";

import { MonsterQuery } from "../schema/queries/monster";
import AvailableMonstersQuery from "../schema/queries/availableMonsters";

export const getMonster = (monsterName) => {
  const variableValues = {
    name: monsterName,
  };

  return getFromAPI(MonsterQuery, variableValues).then((data) => data.monster);
};

export const getAvailableMonsters = (monsterName) => {
  const variableValues = {
    name: monsterName,
  };

  return getFromAPI(AvailableMonstersQuery, variableValues).then(
    (data) => data.availableMonsters
  );
};
