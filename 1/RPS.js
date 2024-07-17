const readline = require('readline-sync');

function createComputer() {
  return {
    lastMove: null,
    possibleMoves: ['rock', 'paper', 'scissors'],

    choose() {
      let randomInt = Math.floor(Math.random() * 3);
      this.lastMove = this.possibleMoves[randomInt];
    }
  };
}

function createHuman() {
  return {
    lastMove: null,
    possibleMoves: ['rock', 'paper', 'scissors'],

    choose() {
      let choice = readline.question('Please choose a move: ');

      while (!this.possibleMoves.includes(choice)) {
        choice = readline.question('That was not a valid choice: please choose rock, paper, or scissors. ');
      }

      this.lastMove = choice;
    }
  };
}

const RPSGame = {
  gamesPerMatch: null,
  human: createHuman(),
  computer: createComputer(),

  displayWelcome() {
    console.log('Welcome to Rock, Paper, Scissors!');

    let matches = readline.question('How many matches would you like to play (1-20)')
    while (matches < 1 || matches > 20 || !Number.isInteger(matches)) {
      matches = readline.question('That is not valid. Please choose a number of matches to play between 1 & 20.')
    }
    this.gamesPerMatch = matches;
  },

  displayGoodbye() {
    console.log('Thank you for playing Rock, Paper, Scissors! GoodBye!');
  },

  displayWinner() {

    const WINMOVES = {
      rock: 'scissors',
      scissors: 'paper',
      paper: 'rock'
    };
    console.log(`You Chose: ${this.human.lastMove}.`);
    console.log(`The Computer Chose: ${this.computer.lastMove}`);

    if (WINMOVES[this.human.lastMove] === this.computer.lastMove) {
      console.log(`${this.human.lastMove} beats ${this.computer.lastMove}! You win!`);
    } else if (WINMOVES[this.computer.lastMove] === this.human.lastMove) {
      console.log(`${this.computer.lastMove} beats ${this.human.lastMove}! You Loose!!!! haha`);
    } else if (this.human.lastMove === this.computer.lastMove) {
      console.log('its a tie!');
    }

  },

  playAgain() {
    let response = readline.question('Would you like to play again? y/n: ');
    while (response !== 'y' && response !== 'n') {
      response = readline.question('That is not a valid responce please select "y" or "n".');
    }
    return response === 'y';
  },

  play() {
    this.displayWelcome();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) {
        break;
      }
    }
    this.displayGoodbye();
  },

};


RPSGame.play();