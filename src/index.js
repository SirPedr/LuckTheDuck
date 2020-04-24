import { graphql } from "graphql";
import schema from "./schema/schema";
import { MonsterQuery as source} from "./schema/queries/monster";

const variableValues = {
    "name": "Adult black dragon"
};

graphql({ schema, source, variableValues}).then((response) => {
    console.log(response);
})