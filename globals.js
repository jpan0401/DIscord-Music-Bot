
let songQueue = [];
let isPlaying = false;
let looping = false;
let leaveOnFinish = false;

module.exports = {
    name: 'globals',
    description: 'global variables for use in other classes',
    isPlaying,
    looping,
    leaveOnFinish,
    getQueue() {
        return songQueue;
    },
    clearQueue() {
        songQueue = [];
    }
}