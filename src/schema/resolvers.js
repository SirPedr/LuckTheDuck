const defaultMonster = {
    name: "Tarrasque",
    size: "Huge",
    type: "Titan",
    armor_class: 25
};

const resolvers = {
    Query: {
        monster: () => (defaultMonster)
    }
};

export default resolvers;