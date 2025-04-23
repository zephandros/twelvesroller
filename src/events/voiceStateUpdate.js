const { Events, channelMention } = require('discord.js');
const { TWSLogger } = require('../utils/twslogger.js');
const { Config } = require('../utils/config.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        try{
            if(newState){
                if(newState.channelId == gameRoomChannelId){
                    TWSLogger.log(`Added "Playing now" role to ${oldState.member.displayName}.`)
                    newState.member.roles.add(Config.playingNowRoleId);
                }else{
                    TWSLogger.log(`Removed "Playing now" role from ${oldState.member.displayName}.`)
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