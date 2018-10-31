
class SoundManager {

    constructor() {
        this.bg = new Howl({src: ['./bg-sound.mp3']});
        this.eatSng = new Howl({src: ['./eat.mp3']});
        this.boom = new Howl({src: ['./bg-sound.mp3'],loop: false});
        this.auch = new Howl({src: ['./bg-sound.mp3'],loop: false});
    }

    stopBg() {
        (this.bg) ? this.bg.stop() : null;
    }
    startBg() {
        (this.bg) ? this.bg.play() : null;
    }
    eat() {
        (this.eatSng) ? this.eatSng.play() : null;
    }
    playKey(key) {
        this[key].play();
    }
}