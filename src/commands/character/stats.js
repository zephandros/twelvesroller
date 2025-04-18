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
                { name: '** **', value: '** **'},
                { name: 'Bloodline', value: 'Your bloodline'},
                { name: 'Origin', value: 'Your origin' },
                { name: 'Occupation', value: 'Your current job',  inline: true },
                { name: 'Points', value: '999',  inline: true },
                { name: '** **', value: '** **'},
                { name: 'Physique', value: '12 (+0)',  inline: true },
                { name: 'Dexterity', value: '12 (+0)',  inline: true },
                { name: '** **', value: '** **'},
                { name: 'Intellect', value: '12 (+0)',  inline: true },
                { name: 'Presence', value: '12 (+0)',  inline: true },
                { name: '** **', value: '** **'},
                { name: 'Dodge', value: '12',  inline: true },
                { name: 'Parry', value: '12',  inline: true },
                { name: 'Block', value: '12',  inline: true },
                { name: '** **', value: '** **'},
                { name: 'Init', value: '12',  inline: true },
                { name: 'Speed', value: '12',  inline: true },
                { name: 'Wit', value: '12',  inline: true },
            )

        await interaction.reply({embeds: [characterStatEmbed], flags: MessageFlags.Ephemeral });
    }
};