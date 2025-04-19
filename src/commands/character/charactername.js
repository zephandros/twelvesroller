const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags } = require('discord.js');
/* La idea*/
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Change Character Name')
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        if(interaction.user.id == interaction.targetUser.id){
            const { username } = interaction.targetUser;
            await interaction.reply({content: `Your name is ${username}` , flags: MessageFlags.Ephemeral });
        }else{
            await interaction.reply({content: `This command only works with  your own user` , flags: MessageFlags.Ephemeral });
        }
        
    }
};