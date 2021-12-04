const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '-';

const fs = require('fs');
const globals = require(`./globals.js`);

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    startup();
});

function startup(){
    console.log('Shucklebot is online!');

}

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command) {
        case 'play':
        case 'p':
        case 'skip':
        case 's':
        case 'clear':
            client.commands.get('play').execute(message, args);
            break;
        case 'leave':
        case 'fuckoff':
        case 'begone':
            client.commands.get('leave').execute(message, args);
            break;
        case 'loop':
        case 'l':
            client.commands.get('loop').execute(message, args);
            break;
        case 'join':
        case 'j':
            client.commands.get('join').execute(message, args);
            break;
        case 'love':
        case 'ily':
            client.commands.get('love').execute(message, args);
            break;
        case 'fix':
            client.commands.get('fix').execute(message, args);
            break;
        default:
            client.commands.get('default').execute(message, args);
            break;
    }

    // if (command === 'play' || command === 'skip' || command === 'p' || command === 'clear' || command === 's') {
    //     client.commands.get('play').execute(message, args);
    // } else if (command === 'leave' || command === 'fuckoff' || command === 'begone') {
    //     client.commands.get('leave').execute(message, args);
    // } else if (command === 'loop' || command === 'l') {
    //     client.commands.get('loop').execute(message, args);
    // } else if (command === 'join' || command === 'j') {
    //     client.commands.get('join').execute(message, args);
    // }
});

fs.readFile('./token.config', 'utf8' , (err, token) => {
    if (err) {
      console.error(err)
      return
    }
    client.login(token);
  });