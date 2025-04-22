class TWSLogger {
    static printInteraction(interaction) {
        if(Object.hasOwn(interaction, 'commandName')){
            /* Is a CommandInteraction*/
            console.log(`${interaction.createdAt.toISOString()} : ${interaction.user.username} has issued command "${interaction.commandName}".`);
        }else{
            /*Is a different type of interaction*/
            console.log(`${interaction.createdAt.toISOString()} : ${interaction.user.username} has issued an unknown interaction.`);
        }
    }
}

module.exports = { TWSLogger }