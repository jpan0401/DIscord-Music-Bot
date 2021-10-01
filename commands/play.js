const ytdl = require('ytdl-core')
const ytSearch = require('yt-search');

var songQueue = [];
var isPlaying = false;

module.exports = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        let cmd = message.content.slice(1).split(/ +/)[0].toLowerCase();

        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissions');
        if (cmd === 'play' && !args.length) return message.channel.send('You need to send the second argument!');

        if (cmd === 'clear') {
            message.channel.send("Clearing the queue");
            songQueue = [];
            isPlaying = false;
        } else if (cmd === 'skip' || cmd === 's') {
            message.channel.send("Skipping current song");
            isPlaying = false;
        } else {
            songQueue.push(args.join(' '));
        }
        await queueAndPlay(voiceChannel, message)
    }
}

async function queueAndPlay(voiceChannel, message) {
    song = checkQueue(voiceChannel, message);
    if (song != null)
        await playSong(voiceChannel, message, song);
}

function checkQueue(voiceChannel, message) {
    if (!isPlaying) {
        if (songQueue.length > 0 )
            return songQueue.shift();
        else {
            message.channel.send('leaving channel');
            voiceChannel.leave();
            return null;
        }
    }
    message.channel.send('Adding to queue');
    return null;
}

async function playSong(voiceChannel, message, song) {

    const validURL = (str) => {
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if(!regex.test(str)){
            return false;
        } else {
            return true;
        }
    }

    if(validURL(song.split(' ')[0])){
        const  connection = await voiceChannel.join();
        const stream  = ytdl(song.split(' ')[0], {filter: 'audioonly'});

        connection.play(stream, {seek: 0, volume: 1})
        .on('finish', () =>{
            isPlaying = false;
            queueAndPlay(voiceChannel, message);
        });

        await message.channel.send(`:thumbsup: Now Playing ***Your Link!***`)
        isPlaying = true;

        return
    }

    const connection = await voiceChannel.join();

    const videoFinder = async (query) => {
        const videoResult = await ytSearch(query);
        
        return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }

    const video = await videoFinder(args.join(' '));

    if(video){
        const stream = ytdl(video.url, {filter: 'audioonly'});
        connection.play(stream, {seek: 0, volume: 1})
        .on('finish', () =>{
            isPlaying = false;
            queueAndPlay(voiceChannel, message);
        });

        await message.channel.send(`:thumbsup: Now Playing ***${video.title}***`)
    }   else {
            message.channel.send('No video results found');
    }
}

