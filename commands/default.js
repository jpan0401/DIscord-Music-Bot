module.exports = {
    name: 'default',
    description: 'Called when no command was found',
    async execute(message, args) {
        return message.channel.send("I didn't understand you..");
    }
}