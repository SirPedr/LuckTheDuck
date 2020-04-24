import { graphql } from "graphql";
import schema from "../schema/schema";
import { MonsterQuery as source } from "../schema/queries/monster";

export const getMonster = (monsterName) => {
  const variableValues = {
    name: monsterName
  };

  return graphql({ schema, source, variableValues }).then((response) =>
    !response.errors ? response : Promise.reject("Monster not found!")
  );
};