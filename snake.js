//Alow Alef - Beat.
//Have 2 version of the game 
//Show itays the before content.

class Dir {};
Dir.LEFT = 'left';
Dir.RIGHT = 'right';
Dir.DOWON = 'down';
Dir.UP = 'UP';

class Game {
  constructor() {
    this.soundMgr = new SoundManager();
    this.numOfFood = 22;
    this.bord = null;
    this.gameInterval = null;
    this.snake = [];
    this.dir = Dir.RIGHT;
    this.bordSize = 17;
    this.foods = [];
  }
  fistTimeOnly() {
    this.ceateBoard();
  }
  restart() {

    this.snake = [];
    this.dir = Dir.RIGHT;
    this.foods = [];
    this.gameOver();
    this.init();
  }
  init() {
    this.soundMgr.startBg();
    this.createSnake();
    this.initFood();
    this.startGame();
    this.draw();
  }
  initFood() {
    for (let index = 0; index < 23; index++) {
      this.createFood();
    }
  }

  startGame() {
    this.gameInterval = setInterval(() => this.onFrame(), 400);
    document.onkeydown = () => this.onKey();
  }
  onKey(e) {
    e = e || window.event;
    if (e.keyCode == '38' && this.dir !== Dir.DOWON) {
      this.dir = Dir.UP;
    } else if (e.keyCode == '40' && this.dir !== Dir.UP) {
      this.dir = Dir.DOWON;
    } else if (e.keyCode == '37' && this.dir !== Dir.RIGHT) {
      this.dir = Dir.LEFT;
    } else if (e.keyCode == '39' && this.dir !== Dir.LEFT) {
      this.dir = Dir.RIGHT;
    }
  }

  createFood() {
    let pos = this.getEmptyRandomPlace();
    pos.value = this.createRandomInt(1, this.numOfFood);
    this.foods.push(pos);
  }
  createRandomInt(from, to) {
    return Math.floor((Math.random() * to) + from);
  }
  getEmptyRandomPlace() {
    const row = Math.floor(Math.random() * Math.floor(this.bordSize));
    const colm = Math.floor(Math.random() * Math.floor(this.bordSize));
    const isTaken = this.snake.some(pos => pos.row == row && pos.colm === colm) || this.foods.some(pos => pos.row == row && pos.colm === colm)
    if (isTaken) {
      return this.getEmptyRandomPlace();
    } else {
      return {
        row,
        colm
      };
    }
  }
  createSnake() {
    let pos = {
      row: Math.floor(this.bordSize / 2),
      colm: Math.floor(this.bordSize / 2)
    };
    this.snake.push(pos);
    for (let index = 0; index < 5; index++) {
      pos = this.getNextPos(pos, this.dir);
      pos.value = 'snakePart';
      this.snake.push(pos);
    }

  }
  drawSnake() {
    this.snake.forEach((pos) => {
      let element = this.getElementByPos(pos);
      element.classList.add(pos.value);
    })
  }

  getNextPos(pos, dir) {
    let resPos = Object.assign({}, pos);
    switch (dir) {
      case Dir.LEFT:
        resPos.colm = resPos.colm - 1;
        break;
      case Dir.RIGHT:
        resPos.colm = resPos.colm + 1;
        break;
      case Dir.DOWON:
        resPos.row = resPos.row + 1;
        break;
      case Dir.UP:
        resPos.row = resPos.row - 1;
        break;
    }
    return resPos;
  }

  getElementByPos(pos) {
    return document.getElementById(pos.row + '-' + pos.colm);
  }

  onFrame() {
    let isGameOver = this.doMove();
    this.draw();
    if (isGameOver) {
      this.gameOver();
    }
  }
  get snakHead() {
    return this.snake[this.snake.length - 1];
  }
  gameOver() {
    this.soundMgr.stopBg();
    clearInterval(this.gameInterval);
  }
  draw() {
    this.clearBoard();
    this.drawFood();
    this.drawSnake();
  }
  drawFood() {
    this.foods.forEach((foodPos) => {
      let cell = this.getElementByPos(foodPos);
      cell.style.backgroundImage = `url('food/${foodPos.value}.jpg')`;
    });
  }
  clearBoard() {
    for (let row = 0; row < this.bordSize; row++) {
      for (let colm = 0; colm < this.bordSize; colm++) {
        let cell = this.getElementByPos({
          row,
          colm
        });
        cell.className = 'cell';
        cell.style.backgroundImage = null;
      }
    }
  }
  doMove() {
    let isGameOver = false;
    const newPos = this.getNextPos(this.snakHead, this.dir);
    if (!this.isInBoard(newPos)) {
      this.snakHead.value = 'boom';
      this.soundMgr.playBoom();
      isGameOver = true;
      return isGameOver;
    }
    let removedPos = this.snake.shift();
    this.snakHead.value = 'snakePart'
    this.snake.push(newPos);
    this.snakHead.value = 'snakeHead';
    if (this.isEeatingMyself()) {
      isGameOver = true;
      this.snakHead.value = 'bite';
      this.soundMgr.auchPlay();
    }
    const eatedFood = this.foods.findIndex((food) => {
      return this.isEqual(food, newPos);
    });

    if (eatedFood !== -1) {
      this.snake.unshift(removedPos);
      console.log('eatedFood', eatedFood);
      this.soundMgr.playKey(this.foods[eatedFood].value);
      this.foods.splice(eatedFood, 1);
      this.snakHead.value = 'eating';
      this.createFood();
    }
    return isGameOver;

  }

  isEqual(pos1, pos2) {
    return (pos1.row === pos2.row && pos1.colm === pos2.colm)
  }

  isEeatingMyself() {
    let head = this.snakHead;
    for (let index = 0; index < this.snake.length - 1; index++) {
      const part = this.snake[index];
      if (this.isEqual(head, part)) {
        return true;
      }
    }
    return false;
  }
  isInBoard(pos) {
    if (pos.row >= this.bordSize ||
      pos.row < 0 ||
      pos.colm >= this.bordSize ||
      pos.colm < 0) {
      return false;
    } else {
      return true;
    }
  }
  getPosOfDiv(div) {
    let divId = div.id;
    let poss = divId.split('-');
    return {
      row: poss[0],
      colm: poss[1]
    };

  }
  ceateBoard() {
    this.bord = document.getElementById('board');
    for (let row = 0; row < this.bordSize; row++) {
      let currentRow = this.createRow(row);
      this.bord.appendChild(currentRow);
      for (let colm = 0; colm < this.bordSize; colm++) {
        let currentCell = this.creatCell(row, colm);
        currentRow.appendChild(currentCell);
      }
    }
  }
  createRow(row) {
    let div = document.createElement('div');
    div.id = row;
    div.className = 'row'
    return div;
  }
  creatCell(row, colm) {
    let div = document.createElement('div');
    div.id = row + '-' + colm;
    div.className = 'cell'
    return div;
  }
}

window.game = new Game();
document.addEventListener('DOMContentLoaded', () => game.fistTimeOnly());

function startNewGame() {
  window.game.restart();
}
