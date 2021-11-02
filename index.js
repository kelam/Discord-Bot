require("dotenv").config();

const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, Intents } = require("discord.js");
const music = require("@koenie06/discord.js-music");
const client = new Client({ intents: 
    [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
});

client.on("ready", () => {
    console.log("The bot is online!");
});

client.login(process.env.TOKEN);

