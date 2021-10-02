let globals = require(`../globals.js`);

module.exports = {
    name: 'loop',
    description: 'loop the current song',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');

        globals.looping = !globals.looping;
        if(globals.looping) return message.channel.send('Song will now loop');
        return message.channel.send('Song will no longer loop');
    }
}