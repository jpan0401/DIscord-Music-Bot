module.exports = {
    name: 'join',
    description: 'join the channel',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send("You need to be in a voice channel for the bot to join you!");
        await voiceChannel.join();
    }
}