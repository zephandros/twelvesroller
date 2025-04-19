const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
/* La idea*/
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Change Character Name')
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        if(interaction.user.id == interaction.targetUser.id){
            const { username } = interaction.targetUser;

            const modal = new ModalBuilder().setCustomId('nameModal').setTitle('Character Info')

            const nameInput = new TextInputBuilder()
                .setCustomId('nameInput')
                .setLabel('Name')
                .setValue(username)
                .setStyle(TextInputStyle.Short)

            

            const nameActionRow = new ActionRowBuilder().addComponents(nameInput)

            modal.addComponents(nameActionRow)

            
            await interaction.showModal(modal);
        }else{
            await interaction.reply({content: `This command only works with  your own user` , flags: MessageFlags.Ephemeral });
        }
        
    }
};