const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('twelves')
        .setDescription('TWELVES!'),
    async execute(interaction) {
        
        await interaction.reply('TWELVES!');
    }
};

