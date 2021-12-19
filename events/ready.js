module.exports = {
	// Name states which event this file is for
	name: 'ready',
	once: true,
	// For event logic, which is called by event handler whenever the event emits
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};