const { Events } = require('discord.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    execute(oldState, newState) {
        const gameRoomChannelId = "1364451129957814272";
        const playingNowRoleId = "1364450283169517692";

        if(newState && newState.channelId == gameRoomChannelId){
            newState.member.roles.add(playingNowRoleId);
        }else{
            newState.member.roles.remove(playingNowRoleId);
        }
    },
};