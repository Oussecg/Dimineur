class Jeu {
  constructor() {
    this.gameOver = false;
    this.containerClassName = 'jeu';
    this.dimension = 9;
    this.bombNbr = this.randint(7, 10);
    this.board = [];
    this.bombPos = [];
    this.flagPos = [];
    this.flagSet = false;
    this.displayButtons();
    this.generateGame();
  }

  randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  displayButtons() {
    for (let i = 0; i < this.dimension; i++) {
      this.board[i] = []
      for (let j = 0; j < this.dimension; j++) {
        this.board[i][j] = '';
        document.querySelector(`.${this.containerClassName}`).innerHTML += `<button class='game-button' data-i=${i} data-j=${j} data-state='on' data-hiddenSource='' onclick='jeu.buttonClicked(${i}, ${j})'></button>`;
        if (i === this.dimension - 1) {
          document.getElementsByClassName("game-button")[i * this.dimension + j].classList.add("abnormal-game-button");
        }
      }
    }
    this.buttonsList = document.getElementsByClassName('game-button');
  }

  placeBomb() {
    let b = 0;
    let i = this.randint(0, this.dimension-1);
    let j = this.randint(0, this.dimension-1);
    while (b < this.bombNbr) {
      if (this.board[i][j] !== "b") {
          b += 1;
          this.board[i][j] = 'b';
          this.bombPos.push(
            {
              x: i,
              y: j
            }
          )
          this.buttonsList[i * this.dimension + j].dataset.hiddenSource = "b";
          this.buttonsList[i * this.dimension + j].innerText = '💣';
        }
      i = this.randint(0, this.dimension-1);
      j = this.randint(0, this.dimension-1);
    }
  }

  nbrBomb(i, j) {
    let nbr = 0;
    for (let k = -1; k < 2; k++) {
      for (let l = -1; l < 2; l++) {
        try {
          if (this.board[i + k][j + l] === "b") {
            nbr += 1;
          }
        } catch (error) {

        }
      }
    }
    return nbr;
  }

  placeNumbers(){
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        const nbr = this.nbrBomb(i, j);
        if (this.board[i][j] !== "b" && nbr !== 0) {
          this.buttonsList[i * this.dimension + j].dataset.hiddenSource = `${nbr}`;
          this.buttonsList[i * this.dimension + j].innerText = nbr;
          this.buttonsList[i * this.dimension + j].classList.add(`x${nbr}`);
        }
      }
    }
  }

  coverButtons() {
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        this.buttonsList[i * this.dimension + j].innerText = '';
        this.buttonsList[i * this.dimension + j].style.backgroundColor = 'lightgrey';
      }
    }
  }

  generateGame() {
    this.placeBomb()
    this.placeNumbers()
    this.set_resetButton();
    this.set_Timer();
    this.set_nbrBomb();
    // this.coverButtons();
  }

  clearButtons() {
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        this.buttonsList[i * this.dimension + j].dataset.content = '';
        this.buttonsList[i * this.dimension + j].dataset.hiddenSource = '';
        this.buttonsList[i * this.dimension + j].innerText = '';
        this.buttonsList[i * this.dimension + j].style.backgroundColor = "white";
      }
    }
  }

  set_resetButton() {
    document.getElementById("resetButton").addEventListener("click", this.resetButton.bind(this));
  }

  resetButton() {
    this.clearButtons()
    this.board = [];
    clearInterval(this.gameTimer);
    this.set_Timer();
    document.getElementById("timeLabel").textContent = `TIME: ${this.timeElapsed}`;
    this.bombNbr = this.randint(7, 10);
    document.getElementById("nbrBombLabel").textContent = `BOMB: ${this.bombNbr}`;
    this.displayButtons();
    this.placeBomb();
    this.placeNumbers();
  }

  set_Timer() {
    this.timeElapsed = 0;
    this.gameTimer = setInterval(this.updateTimer.bind(this), 1000);
  }

  updateTimer() {
    this.timeElapsed++;
    document.getElementById("timeLabel").textContent = `TIME: ${this.timeElapsed}`;
  }

  set_nbrBomb() {
    document.getElementById("nbrBombLabel").textContent = `BOMB: ${this.bombNbr}`;
  }

  toggleFlag() {
    if (this.flagSet) {
      this.flagSet = false;
      document.querySelectorAll(".game-button").forEach((button) => {
        button.style.cursor = "grab";
      });
    } else {
      this.flagSet = true;
      document.querySelectorAll(".game-button").forEach(button => {
        button.style.cursor = "url('images/flag-cursor.png'), auto";
      });
    }
  }

  buttonClicked(i, j) {
    if (! this.gameOver) {
      const button = this.buttonsList[(i * this.dimension) + j];
      if (this.flagSet) {
        if (button.innerText === "🚩") {
          button.innerText = "";
          this.flagPos = this.flagPos.filter(
            (flag) => !(flag.x === i && flag.y === j),
          );
        } else {
          button.innerText = "🚩";
          this.flagPos.push({
            x: i,
            y: j
          })
        }
      } else {
        if (this.board[i][j] === 'b') {
          this.gameOver = true;
          this.bombPos.forEach(bomb => {
            this.buttonsList[bomb.x * this.dimension + bomb.y].innerText = "💣";
            this.buttonsList[bomb.x * this.dimension + bomb.y].style.backgroundColor = 'red';
          });
        } else {

        }
      }
    }
  }
}

let jeu = new Jeu();


