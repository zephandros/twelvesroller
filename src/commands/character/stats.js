const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Shows your character stats'),
    async execute(interaction) {
        await interaction.reply({content: 'WIP: Here goes your stats!', flags: MessageFlags.Ephemeral });
    }
};