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
    if (command === 'play' || command === 'skip' || command === 'p' || command === 'clear' || command === 's') {
        client.commands.get('play').execute(message, args);
    } else if (command === 'leave' || command === 'fuckoff' || command === 'begone') {
        client.commands.get('leave').execute(message, args);
    } else if (command === 'loop' || command === 'l') {
        client.commands.get('loop').execute(message, args);
    }
});

fs.readFile('./token.config', 'utf8' , (err, token) => {
    if (err) {
      console.error(err)
      return
    }
    client.login(token);
  });