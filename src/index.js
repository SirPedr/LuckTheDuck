import { getMonster } from "./libs/DnDInfo";

getMonster("adult-black-dragon")
  .then((response) => console.table(response.data.monster))
  .catch((error) => console.log(error));
