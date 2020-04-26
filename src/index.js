import { Client } from "discord.js";
import { getMonster } from "./libs/DnDInfo";
import { parseMessage, formatMonsterDataIntoMessage } from "./libs/discordMessages";

import { BOT_TOKEN } from "./config/botPrivateConfig";
import { BOT_PREFIX } from "./config/botConfig";

const client = new Client();

client.on("ready", () => {
  console.log("Luck the Duck is ready to roll!");
});

client.on("message", async (message) => {
  if (!message.author.bot && message.content.startsWith(BOT_PREFIX)) {
    const params = parseMessage(message.content);

    // @TODO: Tratar caso de monstro não encontrado
    const monsterData = await getMonster(params.name);

    message.delete();

    const responseMessage = formatMonsterDataIntoMessage(monsterData);

    const channel = params.isPrivate ? message.author : message.channel;

    channel.send(responseMessage);
  }
});

client.login(BOT_TOKEN);
