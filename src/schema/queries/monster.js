export const MonsterQuery = `
  query GetMonster($name: String!) {
    monster(name: $name) {
      name
      type
      size
      alignment
      armor_class
      strength
      dexterity
      constitution
      intelligence
      wisdom
      charisma
      hit_points
      hit_dice
      languages
      speed {
        walk
        fly
        swim
      }
      damage_vulnerabilities
      damage_resistances
      damage_immunities
    }
  }
`;
