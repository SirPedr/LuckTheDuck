import { Categories } from "../types/categories";

export const EndpointBasedOnCategory: { [index in Categories]: string } = {
  spells: "/spells/",
  monsters: "/monsters/",
};
