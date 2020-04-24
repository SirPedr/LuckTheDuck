import { graphql } from "graphql";
import schema from "./schema/schema";
import { MonsterQuery as source} from "./schema/queries/monster";


const variableValues = {
    "name": "adult-black-dragon"
};

graphql({ schema, source, variableValues}).then((response) => {
    console.log(response);
});