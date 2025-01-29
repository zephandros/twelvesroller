const { Events, MessageFlags } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const channel = await member.guild.channels.cache.get('1333233556180303944');
        await channel.send({ content: `Welcome <@${member.id}>`, flags: MessageFlags.Ephemeral });
    },
};