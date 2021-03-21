import { Client, MessageEmbed } from "discord.js";
import { AWAIT_MESSAGE_DEFAULT_OPTIONS, BOT_PREFIX } from "./config/botConfig";
import { EndpointBasedOnCategory } from "./consts/endpoints";
import { getFromAPI } from "./libs/api";
import {
  createOptionsList,
  formatDataIntoMessage,
  getParamsFromCommand,
} from "./libs/util/messages";

const client = new Client();

client.on("ready", () => {
  console.log("Luck the Duck is ready to roll!");
});

client.on("message", async (message) => {
  if (!message.author.bot && message.content.startsWith(BOT_PREFIX)) {
    const params = getParamsFromCommand(message.content);

    console.log(params);
    const channel = params.flags?.private ? message.author : message.channel;
    const queryEndpoint = EndpointBasedOnCategory[params.category];
    const queryData = await getFromAPI(queryEndpoint, params.query);

    let formatedMessage;

    if (queryData.length > 1) {
      formatedMessage = createOptionsList(
        queryData.map((result) => result.name as string)
      );

      const optionsMessage = await channel.send(formatedMessage);

      optionsMessage.channel
        .awaitMessages(({ content }) => {
          const parsedResponse = parseInt(content);

          return (
            !isNaN(parsedResponse) &&
            parsedResponse >= 0 &&
            parsedResponse <= queryData.length
          );
        }, AWAIT_MESSAGE_DEFAULT_OPTIONS)
        .then((collectedAnswer) => {
          const [{ content, channel }] = collectedAnswer.values();
          const selectedItemIndex = parseInt(content) - 1;

          const requestedItem = queryData[selectedItemIndex];
          const message = formatDataIntoMessage(
            requestedItem,
            params.category,
            params.properties
          );

          channel.send(message);
        });
    } else if (queryData.length === 1) {
      formatedMessage = formatDataIntoMessage(
        queryData[0],
        params.category,
        params.properties
      );

      channel.send(formatedMessage);
    } else {
      formatedMessage = new MessageEmbed({
        title: `Sorry, couldn't find an entry for ${params.query.search}.`,
      });

      channel.send(formatedMessage);
    }
  }
});

client.login("NzY2NjQyMDA3NDEzNjIwNzY4.X4mVAg.rycp-HS1Ees_b9gKiuBk8E7VE4U");
