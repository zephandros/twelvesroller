const { Events, channelMention } = require('discord.js');
const { TWSLogger } = require('../utils/twslogger.js')

module.exports = {
    name: Events.VoiceStateUpdate,
    execute(oldState, newState) {
        const gameRoomChannelId = "1364451129957814272";
        const playingNowRoleId = "1364450283169517692";

        TWSLogger.log(`Member ${newState.member.displayName} joined channel ${newState.channelId}`);

        if(newState && newState.channelId == gameRoomChannelId){
            TWSLogger.log(`Member ${newState.member.displayName} joined the game room. Applying role...`);
            newState.member.roles.add(playingNowRoleId);
        }else{
            TWSLogger.log(`Member ${newState.member.displayName} joined another channel. Removing role...`);
            newState.member.roles.remove(playingNowRoleId);
        }
    },
};