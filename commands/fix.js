const globals = require("../globals");

module.exports = {
    name: 'fix',
    description: 'Called to fix shuckie',
    async execute(message, args) {
        globals.reset();
        return message.channel.send("Sorry friends, I'll be act like a good boy now.");
    }
}