const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Name')
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        const { username } = interaction.targetUser;
        await interaction.reply({content: `Your name is ${username}` , flags: MessageFlags.Ephemeral });
    }
};