const defaultMonster = {
    size: "Huge",
    type: "Titan",
    armor_class: 25
};

const resolvers = {
    Query: {
        monster: (_, { name }) => ({name, ...defaultMonster})
    }
};

export default resolvers;