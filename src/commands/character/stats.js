const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Shows your character stats'),
    async execute(interaction) {

        // const characterStatEmbed = new EmbedBuilder()
        //     .setTitle('Your Character')
        //     .setDescription('Some description here')
        //     .addFields(
        //         { name: '** **', value: '** **'},
        //         { name: 'Bloodline', value: 'Your bloodline'},
        //         { name: 'Origin', value: 'Your origin' },
        //         { name: 'Occupation', value: 'Your current job',  inline: true },
        //         { name: 'Points', value: '999',  inline: true },
        //         { name: '** **', value: '** **'},
        //         { name: 'Physique', value: '12 (+0)',  inline: true },
        //         { name: 'Dexterity', value: '12 (+0)',  inline: true },
        //         { name: '** **', value: '** **'},
        //         { name: 'Intellect', value: '12 (+0)',  inline: true },
        //         { name: 'Presence', value: '12 (+0)',  inline: true },
        //         { name: '** **', value: '** **'},
        //         { name: 'Dodge', value: '12',  inline: true },
        //         { name: 'Parry', value: '12',  inline: true },
        //         { name: 'Block', value: '12',  inline: true },
        //         { name: '** **', value: '** **'},
        //         { name: 'Init', value: '12',  inline: true },
        //         { name: 'Speed', value: '12',  inline: true },
        //         { name: 'Wit', value: '12',  inline: true },
        //     )

        const character = {
            name: "Zephandro",
            physique: 0,
            dexterity: 0,
            intelect: 0,
            presence: 0,
            stress:0,
            health:0,
        }

        /* 
            PHYSIQUE - TOUGHNESS
                > PARRY
            DEXTERITY - DODGE
                > INSTICT
            INTELECT - KNOWLEDGE
                > WIT
            PRESENCE - CHARISMA
                > AURA
        */

        const characterStatEmbed = new EmbedBuilder()
            .setTitle(`${character.name}'s Character Sheet`)
            .setDescription(`
                \# ${character.name} \n 
                \#\#\# HEALTH \n 
                \#\# \u25C6\u25C7\u25C7 \n 
                \#\#\# STRESS \n 
                \#\# \u25AE\u25AE\u25AE\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF\u25AF \n 
                \#\#\# PHYSIQUE ${12+character.physique} [${character.physique}] \n
                \#\#\# DEXTERITY ${12+character.dexterity} [${character.dexterity}] \n
                \#\#\# INTELECT ${12+character.intelect} [${character.intelect}] \n
                \#\#\# PRESENCE ${12+character.presence} [${character.presence}] \n
                `);

        await interaction.reply({embeds: [characterStatEmbed], flags: MessageFlags.Ephemeral });
    }
};