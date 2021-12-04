let songQueue = [];
let isPlaying = false;
let looping = false;
let leaveOnFinish = false;
let connection = null;
let dispatcher = null;

module.exports = {
    name: 'globals',
    description: 'global variables for use in other classes',
    isPlaying,
    looping,
    leaveOnFinish,
    connection,
    dispatcher,
    getQueue() {
        return songQueue;
    },
    clearQueue() {
        songQueue = [];
    }, reset() {
        songQueue = [];
        this.isPlaying = false;
        this.looping = false;
        this.connection = null;
        this.dispatcher = null;
    }
}