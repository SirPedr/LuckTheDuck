export type APIResponseType = {
  [index: string]: APIFiedlValueType;
};

export type APIFiedlValueType =
  | number
  | string
  | string[]
  | Array<{ [index: string]: APIFiedlValueType }>
  | null;

export type ActionType = {
  name: string;
  desc: string;
};

export type SpeedType = {
  walk: string;
  fly?: string;
  swim?: string;
};
