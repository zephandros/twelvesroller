const { Events } = require('discord.js');
const { TWSLogger } = require('../utils/twslogger.js');
const { Config } = require('../utils/config.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    cooldown: 5,
    async execute(oldState, newState) {
        try{
            if(newState){
                /* User entered a channel */

                /* Retrieving role */
                const memberHasRole = newState.member.roles.cache.get(Config.playingNowRoleId) != null;

                if(newState.channelId == Config.gameRoomChannelId){
                    /* User entered game room */
                    if(!memberHasRole){
                        TWSLogger.log(`Added "Playing now" role to ${newState.member.displayName}.`)
                        newState.member.roles.add(Config.playingNowRoleId);
                    }
                }else{
                    /* User entered any other channel */
                    if(memberHasRole){
                        TWSLogger.log(`Removed "Playing now" role from ${newState.member.displayName}.`)
                        newState.member.roles.remove(Config.playingNowRoleId);
                    }
                }
            } else{
                /* Member exited a channel*/

                const memberHasRole = oldState.member.roles.cache.get(Config.playingNowRoleId) != null;

                if(memberHasRole){
                    TWSLogger.log(`Removed "Playing now" role from ${oldState.member.displayName}.`)
                    oldState.member.roles.remove(Config.playingNowRoleId);
                }
            }
        }catch(error){
            TWSLogger.logError('Error on member entering or exiting a voice channel', error);
            return;
        }
    }
};