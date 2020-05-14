import resolvers from "../schema/resolvers";
import { makeExecutableSchema } from "graphql-tools";

const typeDefs = `
  type Monster {
    name: String!
    size: String!
    type: String
    subtype: String
    alignment: String
    armor_class: Int!
    hit_points: Int!
    hit_dice: String!
    speed: Speed!
    strength: Int!
    dexterity: Int!
    constitution: Int!
    intelligence: Int!
    wisdom: Int!
    charisma: Int!
    proficiencies: [Proficiency!]!
    damage_vulnerabilities: String!
    damage_resistances: String!
    damage_immunities: String!
    condition_immunities: [Condition!]!
    # TODO: Figure out a solution to 'senses' field
    languages: String!
    actions: [Action!]!
    legendary_actions: [Action!]!
  }

  type Speed {
    walk: String!
    fly: String
    swim: String
  }

  type Proficiency {
    name: String!
  }

  type Condition {
    name: String!
  }

  type Hability {
    name: String!
    desc: String!
    usage: Usage
  }

  type Usage {
    type: String!
    times: Int!
  }

  type Action {
    name: String!
    desc: String!
  }

  type Query {
    monster(name: String!): Monster
  }

  schema {
    query: Query
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers 
});

export default schema;
