const { Events, channelMention } = require('discord.js');
const { TWSLogger } = require('../utils/twslogger.js')

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        const gameRoomChannelId = "1364451129957814272";
        const playingNowRoleId = "1364450283169517692";

        if(newState.channelId === null){
            console.log('user left channel', oldState.channelId);
        }else if(oldState.channelId === null){
            console.log('user joined channel', newState.channelId);
        }else{
            console.log('user moved channels', oldState.channelId, newState.channelId)
        }

    },
};