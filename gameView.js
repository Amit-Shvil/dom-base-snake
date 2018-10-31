class GameRender {
    constructor(boardSize) {
      this.boardSize = boardSize;
      this.board = null;
    }
    render(foods, snake) {
      this.clearBoard();
      this.drawFood(foods);
      this.drawSnake(snake);
    }
    clearBoard() {
      for (let row = 0; row < this.boardSize; row++) {
        for (let colm = 0; colm < this.boardSize; colm++) {
          let cell = this.getElementByPos({
            row,
            colm
          });
          cell.className = 'cell';
          cell.style.backgroundImage = null;
        }
      }
    }
    drawFood(foods) {
      foods.forEach((foodPos) => {
        let cell = this.getElementByPos(foodPos);
        cell.style.backgroundImage = `url('food/${foodPos.value}.jpg')`;
        //cell.style.backgroundImage = `url('food/7.jpg')`;
        //cell.className = 'food';
      });
    }
  
    drawSnake(snake) {
      snake.forEach((pos) => {
        let element = this.getElementByPos(pos);
        element.classList.add(pos.value);
      })
    }
  
    ceateBoard() {
        this.board = document.getElementById('board')
        for (let row = 0; row < this.boardSize; row++) {
          let currentRow = this.createRow(row);
          this.board.appendChild(currentRow);
          for (let colm = 0; colm < this.boardSize; colm++) {
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
    getElementByPos(pos) {
      return document.getElementById(pos.row + '-' + pos.colm);
    }
  }