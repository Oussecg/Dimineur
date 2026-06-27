class Jeu {
  constructor() {
    this.containerClassName = 'jeu';
    this.dimension = 9;
    this.bombNbr = this.randint(7, 10);
    this.board = [];
    this.images = {
      empty: 'images/empty.png',
      one: 'images/1.png',
      two: 'images/2.png',
      three: 'images/3.png',
      four: 'images/4.png',
      bomb: 'images/bomb.png',
      red_bomb: 'images/red_bomb.png'
    }
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
        document.querySelector(`.${this.containerClassName}`).innerHTML += `<button class='game-button' data-i=${i} data-j=${j} data-content='' data-state='on' data-hiddenSource='' onclick='jeu.buttonClicked(${i}, ${j})'></button>`;
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
          this.buttonsList[i * this.dimension + j].dataset.content = "b";
          this.buttonsList[i * this.dimension + j].innerHTML = `<img src='${this.images.bomb}' class='buttonImage'>`;
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
        if (this.board[i][j] !== "b") {
          if (nbr === 1) {
            this.buttonsList[i * this.dimension + j].innerHTML = `<img src='${this.images.one}' class='buttonImage'>`
            this.buttonsList[i * this.dimension + j].dataset.hiddenSource = this.images.one;
            this.board[i][j] = "1";
          } else if (nbr === 2) {
            this.buttonsList[i * this.dimension + j].innerHTML = `<img src='${this.images.two}' class='buttonImage'>`;
            this.buttonsList[i * this.dimension + j].dataset.hiddenSource = this.images.two;
            this.board[i][j] = "2";
          } else if (nbr === 3) {
            this.buttonsList[i * this.dimension + j].innerHTML = `<img src='${this.images.three}' class='buttonImage'>`;
            this.buttonsList[i * this.dimension + j].dataset.hiddenSource = this.images.three;
            this.board[i][j] = "3";
          } else if (nbr === 4){
            this.buttonsList[i * this.dimension + j].innerHTML = `<img src='${this.images.four}' class='buttonImage'>`;
            this.buttonsList[i * this.dimension + j].dataset.hiddenSource = this.images.four;
            this.board[i][j] = "4";
          }
        }
      }
    }
  }

  coverButtons() {
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        if (!this.buttonsList[i * this.dimension + j].querySelector("img")) {
          this.buttonsList[i * this.dimension + j].innerHTML = `<img src='${this.images.empty}' class='buttonImage'>`;
        } else {
          this.buttonsList[i * this.dimension + j].querySelector("img").src = this.images.empty;
        }
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
        this.buttonsList[i * this.dimension + j].innerHTML = '';
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

  buttonClicked(i, j) {
    const button = this.buttonsList[(i * this.dimension) + j];


    if (button.dataset.state === 'on') {
      button.dataset.state = 'off';
      alert(`Button(${i},${j}) has been clicked !`)
      button.innerHTML = "";
      button.style.backgroundColor = "cyan";

      console.log(this.board);
      let i1 = i + 1;
      while (i1 > 0) {
        i1--;
        let j1 = j - 1;
        let test = true;
        while (j1 < this.dimension && test) {
          j1++;
          console.log(i1, j1)
          if (i !== i1 || j !== j1) {
            if (this.board[i1][j1] === "") {
              this.buttonsList[i1 * this.dimension + j1].innerHTML = "";
              this.buttonsList[i1 * this.dimension + j1].style.backgroundColor = "red";
            } else {
              test = false;
            }
          }

        }
      }
    }
  }
}

let jeu = new Jeu();


