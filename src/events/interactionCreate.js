const { Events } = require('discord.js');
const { TWSLogger } = require('../utils/twslogger.js')

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if(interaction.isChatInputCommand() || interaction.isContextMenuCommand()){
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
    
            TWSLogger.printInteraction(interaction);
    
            try {
                await command.execute(interaction);
            } catch (error) {
                TWSLogger.logError('An error ocurred while trying to execute a command', error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!' });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!' });
                }
            }
        }else if(interaction.isModalSubmit()){
            TWSLogger.printInteraction(interaction);
            interaction.reply({content: `Modal submited`});
        }else {
            TWSLogger.printInteraction(interaction);
            return;
        }
    },
};