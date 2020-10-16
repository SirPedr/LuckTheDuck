export const MONSTER_NAME_REGEX = /(?<![\w\!\[\];])(\w+)(?![\w\s;]*\])/g;
export const OPTIONS_REGEX = /(?<=!)\w+/g;
export const MONSTER_PROPERTIES_REGEX = /(?<=!properties\s\[|;)[^;\]]+/g;