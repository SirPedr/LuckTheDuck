const AvailableMonstersQuery = `
query getAvailableMonsters($name: String!) {
    availableMonsters(name: $name) {
        count
        results {
            name
        }
    }
}
`;

export default AvailableMonstersQuery;
