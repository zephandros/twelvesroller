const { Events } = require('discord.js');
const { TWSLogger } = require('../utils/twslogger.js');
const { Config } = require('../utils/config.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        if(oldState){
            console.log(JSON.stringify({
                date: new Date().toJSONString(),
                channelId: oldState.channelId,
                sessionId: oldState.sessionId,
                member: oldState.member.displayName
            }));
        }
        if(newState){
            console.log(JSON.stringify({
                date: new Date().toJSONString(),
                channelId: newState.channelId,
                sessionId: newState.sessionId,
                member: newState.member.displayName
            }));
        }
        return;
        
        // try{
        //     if(newState){
        //         /* User entered a channel */

        //         /* Retrieving role */
        //         const memberHasRole = newState.member.roles.cache.get(Config.playingNowRoleId) != null;

        //         if(newState.channelId == Config.gameRoomChannelId){
        //             /* User entered game room */
        //             if(!memberHasRole){
        //                 TWSLogger.log(`Added "Playing now" role to ${newState.member.displayName}.`)
        //                 newState.member.roles.add(Config.playingNowRoleId);
        //             }
        //         }else{
        //             /* User entered any other channel */
        //             if(memberHasRole){
        //                 TWSLogger.log(`Removed "Playing now" role from ${newState.member.displayName}.`)
        //                 newState.member.roles.remove(Config.playingNowRoleId);
        //             }
        //         }
        //     } else{
        //         /* Member exited a channel*/

        //         const memberHasRole = oldState.member.roles.cache.get(Config.playingNowRoleId) != null;

        //         if(memberHasRole){
        //             TWSLogger.log(`Removed "Playing now" role from ${oldState.member.displayName}.`)
        //             oldState.member.roles.remove(Config.playingNowRoleId);
        //         }
        //     }
        // }catch(error){
        //     TWSLogger.logError('Error on member entering or exiting a voice channel', error);
        //     return;
        // }
    }
};