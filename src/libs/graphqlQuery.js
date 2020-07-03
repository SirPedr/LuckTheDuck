import { graphql } from "graphql";

import schema from "../schema/schema";

export const getFromAPI = (source, variableValues) => {
    return graphql({ schema, source, variableValues })
    .then((response) => {
      return !response.errors
        ? response.data
        : Promise.reject(response.errors);
    })
    .catch((err) => err);
}