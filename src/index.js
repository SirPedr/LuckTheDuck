import { Client, MessageEmbed } from "discord.js";
import { getMonster } from "./libs/DnDInfo";
import {
  getParamsFromCommand,
  formatMonsterDataIntoMessage
} from "./libs/discordMessages";

import { BOT_TOKEN } from "./config/botPrivateConfig";
import { BOT_PREFIX } from "./config/botConfig";

const client = new Client();

client.on("ready", () => {
  console.log("Luck the Duck is ready to roll!");
});

client.on("message", message => {
  if (!message.author.bot && message.content.startsWith(BOT_PREFIX)) {
    const params = getParamsFromCommand(message.content);
    const channel = params.isPrivate ? message.author : message.channel;

    let responseMessage = new MessageEmbed();

    getMonster(params.name)
      .then(monster => {
        message.delete();

        responseMessage = formatMonsterDataIntoMessage(monster);

        channel.send(responseMessage);
      })
      .catch(err => {
        console.log(err);
        responseMessage.setTitle("Sorry, couldn't find such a monster...");
        channel.send(responseMessage);
      });
  }
});

client.login(BOT_TOKEN);
