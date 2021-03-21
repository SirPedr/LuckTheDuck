import { Categories } from "../types/categories";

// Field will be displayed in the same order they appear in the array
export const FieldsToDisplayBasedOnQueryType: {
  [index in Categories]: string[];
} = {
  monsters: [
    "name",
    "slug",
    "type",
    "size",
    "alignment",
    "armor_class",
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
    "hit_points",
    "hit_dice",
    "languages",
    "speed",
    "damage_vulnerabilities",
    "damage_resistances",
    "damage_immunities",
    "actions",
  ],
  spells: [
    "name",
    "range",
    "components",
    "duration",
    "ritual",
    "duration",
    "concentration",
    "casting_time",
    "level",
    "school",
    "dnd_class",
    "desc",
    "higher_level",
  ],
};
