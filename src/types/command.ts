import { Categories } from "./categories";

export type QueryStringOptionsType = {
  [index: string]: string;
};

export type CommandFlagsType = {
  private?: boolean;
};

export type CommandParamsType = {
  properties: string[];
  flags?: CommandFlagsType;
  query: QueryStringOptionsType;
  category: Categories;
};
