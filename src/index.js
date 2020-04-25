import { Client, MessageEmbed } from "discord.js";
import { BOT_TOKEN } from "./config/botConfig";
import { getMonster } from "./libs/DnDInfo";

const client = new Client();

client.on("ready", () => {
  console.log("Luck the Duck is ready to roll!");
});

client.on("message", async (message) => {
  if (!message.author.bot) {
    const monsterData = await getMonster("adult-black-dragon");
    const responseMessage = new MessageEmbed();

    responseMessage.setTitle(monsterData.name);
    responseMessage.addField("Type", monsterData.type, true);
    responseMessage.addField("Armor Class", monsterData.armor_class, true);
    responseMessage.addField("Dexterity", monsterData.dexterity, true);

    message.channel.send(responseMessage);
  }
});

client.login(BOT_TOKEN);
