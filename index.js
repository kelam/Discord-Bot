// Require necessary discord.js classes
const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");

// Create a new client instance
const client = new Client({ intents: 
    [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
});

// Runs once the bot is ready
client.once("ready", () => {
    console.log("The bot is online!");
});

/* Replying to commands */

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === "server") {
        await interaction.reply(`Server info name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === "user") {
        await interaction.reply("User info");
    }
});

// Login to Discord with my bot's token
client.login(token);

