import { BASE_API_URL } from "../config/generalConfig";
import fetch from "node-fetch";

const resolvers = {
  Query: {
    monster: (_, { name }) => {
      return fetch(`${BASE_API_URL}/${name}`)
        .then((response) => response.json())
        .then((apiResponse) => {
          return !apiResponse.error
            ? apiResponse
            : Promise.reject();
        });
    }
  }
};

export default resolvers;
