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

// Login to Discord with my bot's token
client.login(token);

