module.exports = {
    name: 'love',
    description: 'shows his love',
    async execute(message, args) {
        return message.channel.send("Love you too :heart:");
    }
}