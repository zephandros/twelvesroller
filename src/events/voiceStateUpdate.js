const { Events, channelMention } = require('discord.js');
const { TWSLogger } = require('../utils/twslogger.js')

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        const gameRoomChannelId = "1364451129957814272";
        const playingNowRoleId = "1364450283169517692";

        if(oldState){
            console.log(oldState.channelId);
        }
        if(newState){
            console.log(newState.channelId);
        }

    },
};