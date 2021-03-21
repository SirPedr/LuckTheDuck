export const SEARCH_QUERY_REGEX = /(?<![\w![\];])(\w+)(?![\w\s;]*\])/g;
export const SEARCH_CATEGORY_REGEX = /(?<=!)(?=monsters|spells)\w+/g;
export const SEARCH_PROPERTIES_REGEX = /(?<=!properties\s\[|;)[^;\]]+/g;
export const SEARCH_OPTIONS_REGEX = /(?<=!)(?!luck|spells|properties|monsters)\w+/g;
