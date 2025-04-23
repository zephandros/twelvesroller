const { Events, channelMention } = require('discord.js');
const { TWSLogger } = require('../utils/twslogger.js');
const { Config } = require('../utils/config.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        TWSLogger.log("Triggering event...");
        try{
            if(newState){
                if(newState.channelId == Config.gameRoomChannelId){
                    TWSLogger.log(`Added "Playing now" role to ${newState.member.displayName}.`)
                    newState.member.roles.add(Config.playingNowRoleId);
                }else{
                    TWSLogger.log(`Removed "Playing now" role from ${newState.member.displayName}.`)
                    newState.member.roles.remove(Config.playingNowRoleId);
                }
            } else{
                TWSLogger.log(`Removed "Playing now" role from ${oldState.member.displayName}.`)
                oldState.member.roles.remove(Config.playingNowRoleId);
            }
        }catch(error){
            TWSLogger.logError('Error on member entering or exiting a voice channel', error);
            return;
        }
    },
};