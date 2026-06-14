class Jeu {
  constructor() {
    this.containerClassName = 'jeu';
    this.dimension = 9;
    this.displayButtons();
  }

  displayButtons() {
    let htmlJeu = '';
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        if (i === this.dimension - 1) {
          htmlJeu += `<button class='game-button abnormal-game-button' data-i=${i} data-j=${j} data-content='' onclick='jeu.buttonClicked(${i}, ${j})'></button>`;
        } else {
          htmlJeu += `<button class='game-button' data-i=${i} data-j=${j} data-content='' onclick='jeu.buttonClicked(${i}, ${j})'></button>`;
        }
      }
    }
    document.querySelector(`.${this.containerClassName}`).innerHTML = htmlJeu;
  }

  buttonClicked(i, j) {
    console.log(`A button with coordination of i = ${i} and j = ${j}`)
  }
}

let jeu = new Jeu();
