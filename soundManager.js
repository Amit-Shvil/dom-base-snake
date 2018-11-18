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
      src: ['./sound/auch.mp3'],
      loop: false,
      volume: 0.5
    });

    this.foo1 = new Howl({
      src: ['./sound/1.mp3'],
      loop: false,
      volume: 0.5
    });
    this.foo2 = new Howl({
      src: ['./sound/2.mp3'],
      loop: false,
      volume: 0.5
    });
    this.foo3 = new Howl({
      src: ['./sound/3.mp3'],
      loop: false,
      volume: 0.5
    });
    this.foo4 = new Howl({
      src: ['./sound/4.mp3'],
      loop: false,
      volume: 0.5
    });
    this.foo5 = new Howl({
      src: ['./sound/5.mp3'],
      loop: false,
      volume: 0.5
    });
    this.foo6 = new Howl({
      src: ['./sound/6.mp3'],
      loop: false,
      volume: 0.5
    });
    this.foo7 = new Howl({
      src: ['./sound/7.mp3'],
      loop: false,
      volume: 0.5
    });
    
  }
  auchPlay() {
    this.auch.play();
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
    this['foo'+key].play();
  }
  playBoom() {
    this.boom.play();
  }
}
