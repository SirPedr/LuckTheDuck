import fetch from "node-fetch";
import { BASE_API_URL } from "../config/generalConfig";

export const getFromAPI = (endpoint, params) => {
  const searchParams = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return fetch(`${BASE_API_URL}${endpoint}?${searchParams}`)
    .then((response) => response.json())
    .then((apiData) => apiData.results)
    .catch((error) => console.error(error));
};
