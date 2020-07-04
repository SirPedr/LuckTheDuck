import { Client, MessageEmbed } from "discord.js";
import { getMonster, getAvailableMonsters } from "./libs/monsters";
import {
  getParamsFromCommand,
  formatMonsterDataIntoMessage,
  createOptionsList,
} from "./libs/messages";

import { BOT_TOKEN } from "./config/botPrivateConfig";
import { BOT_PREFIX, AWAIT_MESSAGE_DEFAULT_OPTIONS } from "./config/botConfig";

const client = new Client();

client.on("ready", () => {
  console.log("Luck the Duck is ready to roll!");
});

client.on("message", async (message) => {
  if (!message.author.bot && message.content.startsWith(BOT_PREFIX)) {
    const params = getParamsFromCommand(message.content);
    const channel = params.isPrivate ? message.author : message.channel;

    let responseMessage = new MessageEmbed();

    message.delete();

    const availableMonsters = (
      await getAvailableMonsters(params.name)
    ).results.map((monster) => monster.name);

    if (availableMonsters.length === 1) {
      const selectedMonster = await getMonster(availableMonsters[0]);

      responseMessage = formatMonsterDataIntoMessage(selectedMonster);

      channel.send(responseMessage);
    } else if (availableMonsters.length > 1) {
      responseMessage = createOptionsList(availableMonsters);

      await channel.send(responseMessage);

      const optionSelectionHandler = async (response) => {
        if (
          !isNaN(response.content) &&
          response.content >= 0 &&
          response.content <= availableMonsters.length
        ) {
          const selectedMonster = await getMonster(
            availableMonsters[response.content - 1]
          );

          const monsterDataMessage = formatMonsterDataIntoMessage(
            selectedMonster
          );
          channel.send(monsterDataMessage);
        }
      };

      channel.awaitMessages(
        optionSelectionHandler,
        AWAIT_MESSAGE_DEFAULT_OPTIONS
      );
    } else {
      responseMessage.setTitle(
        `Sorry, couldn't find an entry for ${params.name}.`
      );

      channel.send(responseMessage);
    }
  }
});

client.login(BOT_TOKEN);
