export const MonsterQuery = `
  query GetMonster($name: String!) {
    monster(name: $name) {
      name
      type
      armor_class
      dexterity
    }
  }
`;
