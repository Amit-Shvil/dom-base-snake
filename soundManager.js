class SoundManager {

  constructor() {
    this.bg = new Howl({
      src: ['./sound/bg-sound.mp3'],
      volume: 0.1
    });
    this.eatSng = new Howl({
      src: ['./sound/eat.mp3'],
      volume: 0.5
    });
    this.boom = new Howl({
      src: ['./sound/boom.mp3'],
      loop: false,
      volume: 0.5
    });
    this.auch = new Howl({
      src: ['./bg-sound.mp3'],
      loop: false,
      volume: 0.5
    });
  }

  stopBg() {
    (this.bg) ? this.bg.stop(): null;
  }
  startBg() {
    (this.bg) ? this.bg.play(): null;
  }
  eat() {
    (this.eatSng) ? this.eatSng.play(): null;
  }
  playKey(key) {
    this[key].play();
  }
}
