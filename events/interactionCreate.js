module.exports = {
    // Name states which event this file is for
    name: "interactionCreate",
    execute(interaction) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
    },
};