
let songQueue = [];
let isPlaying = false;
let looping = false;

module.exports = {
    name: 'globals',
    description: 'global variables for use in other classes',
    isPlaying,
    looping,
    getQueue() {
        return songQueue;
    },
    clearQueue() {
        songQueue = [];
    }
}