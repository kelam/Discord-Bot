// fs is Node's file system module
const fs = require('fs');

// Require necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents:
    [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
});

// fs.readdirSync().filter() returns an array of all file names in given directory
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		// Callback function collects arguments returned using ... rest parameter syntax.
		// Calls event.execute() while passing in the args using the ... syntax
		// Different events in discord.js have diff nums of arguments
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Can access commands in other files
client.commands = new Collection();

// fs.readdirSync() returns array of all file names in a directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Dynamically set commands to client.commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

/* Dynamically executing commands */

// Fetch command in Collection and assign to var command
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	// Fetch command in Collection and assign to var command
	const command = client.commands.get(interaction.commandName);

	// If command doesn't exist, returns undefined
	if (!command) return;

	// If command does exist, call command's .execute() and pass in the interaction var as its argument
	try {
		await command.execute(interaction);
		// Logs any error
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with my bot's token
client.login(token);

