const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Shows your character stats'),
    async execute(interaction) {

        const characterStatEmbed = new EmbedBuilder()
            .setTitle('Your Character')
            .setDescription('Some description here')
            .addFields(
                { name: 'Bloodline', value: 'Your bloodline'},
                { name: 'Origin', value: 'Your origin' },
                { name: 'Physique', value: '12 (+0)',  inline: true },
                { name: 'Dexterity', value: '12 (+0)',  inline: true },
                { name: 'Intellect', value: '12 (+0)',  inline: true },
                { name: 'Presence', value: '12 (+0)',  inline: true },
            )

        await interaction.reply({embeds: [characterStatEmbed], flags: MessageFlags.Ephemeral });
    }
};