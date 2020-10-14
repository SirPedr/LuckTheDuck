import { Client, MessageEmbed } from "discord.js";

import { getMonster, getAvailableMonsters } from "./libs/monsters";

import {
  getParamsFromCommand,
  createOptionsList,
} from "./libs/messages/messagesUtil";

import {
  formatMonsterDataIntoMessage,
  getMonsterBasedOnMonsterSelection,
} from "./libs/messages/monsterMessages";

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

    const availableMonsters = (
      await getAvailableMonsters(params.name)
    ).results.map((monster) => monster.name);

    if (availableMonsters.length === 1) {
      const selectedMonster = await getMonster(availableMonsters[0]);

      responseMessage = formatMonsterDataIntoMessage(selectedMonster);

      channel.send(responseMessage);
    } else if (availableMonsters.length > 1) {
      responseMessage = createOptionsList(availableMonsters);

      const privateSendedMessage = await channel.send(responseMessage);

      privateSendedMessage.channel
        .awaitMessages(({ content }) => {
          const parsedResponse = parseInt(content);

          return (
            typeof parsedResponse === "number" &&
            parsedResponse > 0 &&
            parsedResponse <= availableMonsters.length
          );
        }, AWAIT_MESSAGE_DEFAULT_OPTIONS)
        .then((collectedAnswers) => {
          const [{ content, channel }] = collectedAnswers.values();
          const parsedUserResponse = parseInt(content);

          getMonsterBasedOnMonsterSelection(
            parsedUserResponse,
            availableMonsters
          )
            .then((monster) => {
              const monsterDataMessage = formatMonsterDataIntoMessage(monster);

              channel.send(monsterDataMessage);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => console.error(error));
    } else {
      responseMessage.setTitle(
        `Sorry, couldn't find an entry for ${params.name}.`
      );

      channel.send(responseMessage);
    }
  }
});

client.login(process.env.BOT_TOKEN);
