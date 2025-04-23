const { Events, channelMention } = require('discord.js');
const { TWSLogger } = require('../utils/twslogger.js')

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        const gameRoomChannelId = "1364451129957814272";
        const playingNowRoleId = "1364450283169517692";

        try{
            if(newState){
                if(newState.channelId == gameRoomChannelId){
                    newState.member.roles.add(playingNowRoleId);
                }else{
                    newState.member.roles.remove(playingNowRoleId);
                }
            } else{
                oldState.member.roles.remove(playingNowRoleId);
            }
        }catch(error){
            TWSLogger.logError('Error on member entering or exiting a voice channel', error);
            return;
        }
    },
};