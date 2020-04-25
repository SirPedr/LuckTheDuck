import { Client, MessageEmbed } from "discord.js";
import { getMonster } from "./libs/DnDInfo";
import { parseMessage } from "./libs/discordMessages";

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

    // @TODO: encapsular riação de mensagem com as informações
    const responseMessage = new MessageEmbed();

    responseMessage.setTitle(monsterData.name);
    responseMessage.addField("Type", monsterData.type, true);
    responseMessage.addField("Armor Class", monsterData.armor_class, true);
    responseMessage.addField("Dexterity", monsterData.dexterity, true);

    const channel = params.isPrivate ? message.author : message.channel;

    channel.send(responseMessage);
  }
});

client.login(BOT_TOKEN);
