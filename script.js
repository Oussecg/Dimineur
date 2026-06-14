class Jeu {
  constructor() {
    this.containerClassName = 'jeu';
    this.dimension = 9;
    this.bombNbr = this.randint(7, 10);
    this.oneSource = 'images/1.png';
    this.twoSource = 'images/2.png';
    this.threeSource = 'images/3.png';
    this.fourSource = 'images/4.png';
    this.bombSource = 'images/bomb.png';
    this.redBombSource = 'images/red_bomb.png';
    this.displayButtons();
    this.generateGame();
  }

  randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  displayButtons() {
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        document.querySelector(`.${this.containerClassName}`).innerHTML += `<button class='game-button' data-i=${i} data-j=${j} data-content='' data-state='off' onclick='jeu.buttonClicked(${i}, ${j})'></button>`;
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
    while (b < this.bombNbr && this.buttonsList[i * this.dimension + j].dataset.content !== 'bomb') {
      b += 1;
      this.buttonsList[i * this.dimension + j].dataset.content = "bomb";
      this.buttonsList[i * this.dimension + j].style.backgroundColor = 'red';
      i = this.randint(0, this.dimension-1);
      j = this.randint(0, this.dimension-1);
    }
  }

  generateGame() {
    this.placeBomb()
  }

  buttonClicked(i, j) {
    const button = document.getElementsByClassName("game-button")[(i * this.dimension) + j];
    if (button.dataset.state === "off") {
      button.style.backgroundColor = "#3498db";
      button.dataset.state = "on";
    } else {
      button.style.backgroundColor = "white";
      button.dataset.state = "off";
    }
  }
}

let jeu = new Jeu();
