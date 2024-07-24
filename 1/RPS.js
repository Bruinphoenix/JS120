const readline = require('readline-sync');
const MESSAGES = require('./rps_messages.json');

function createPlayer() {
  return {
    move: null,
    possibleMoves: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
    madeMoves: [],
    score: 0,
    WINMOVES: {
      rock: ['scissors', 'lizard'],
      scissors: ['lizard', 'paper'],
      paper: ['rock', 'spock'],
      spock: ['rock', 'scissors'],
      lizard: ['spock', 'paper'],
    },
  };

}

function createComputer() {
  let playerObj = createPlayer();
  let computerObj = {
    choose() {
      const humanMoves = RPSGame.human.madeMoves;

      //find the humans most commonly made move
      const mostCommon = Array.from(new Set(humanMoves)).reduce((prev, curr) => {
        let currMoreCommon = humanMoves.filter(el => el === curr).length >
          humanMoves.filter(el => el === prev);
        return currMoreCommon ? curr : prev;
      }
      );

      //calculate a random move
      do {
        let randomInt = Math.floor(Math.random() * this.possibleMoves.length);
        this.move = this.possibleMoves[randomInt];
        //keep trying moves until one beats the humans most common move
      } while (!this.WINMOVES[this.move].includes(mostCommon) &&
        humanMoves.length >= 2);

      this.madeMoves.push(this.move);
    }
  };
  return Object.assign(playerObj, computerObj);
}

function createHuman() {
  let playerObj = createPlayer();

  let humanObj = {
    choose() {
      console.clear();
      let choice = readline.question(MESSAGES.chooseMove);

      while (!this.possibleMoves.includes(choice)) {
        choice = readline.question(MESSAGES.chooseMoveError);
      }

      this.move = choice;
      this.madeMoves.push(choice);
    }
  };

  return Object.assign(playerObj, humanObj);
}

const RPSGame = {
  pointsPerMatch: null,
  human: createHuman(),
  computer: createComputer(),
  WINMOVES: {
    rock: ['scissors', 'lizard'],
    scissors: ['lizard', 'paper'],
    paper: ['rock', 'spock'],
    spock: ['rock', 'scissors'],
    lizard: ['spock', 'paper'],
  },

  displayWelcome() {
    console.clear();
    console.log(MESSAGES.welcome);

    let points = readline.question(MESSAGES.promptPoints);
    while (points < 1 || points > 20 || !Number.isInteger(Number(points))) {
      points = readline.question(MESSAGES.promptPointsError);
    }
    this.pointsPerMatch = points;
  },

  displayGoodbye() {
    console.log(MESSAGES.goodbye);
  },

  displayWinner() {
    console.log(`You Chose: ${this.human.move}.`);
    console.log(`The Computer Chose: ${this.computer.move}`);

    if (this.WINMOVES[this.human.move].includes(this.computer.move)) {
      console.log(`${this.human.move} beats ${this.computer.move}! You win!`);
      this.human.score += 1;

    } else if (this.WINMOVES[this.computer.move].includes(this.human.move)) {
      console.log(`${this.computer.move} beats ${this.human.move}! You Loose!!!! haha`);
      this.computer.score += 1;

    } else if (this.human.move === this.computer.move) {
      console.log(MESSAGES.tie);

    }
    this.displayScore();
  },

  matchOver() {
    return (this.human.score >= this.pointsPerMatch
      || this.computer.score >= this.pointsPerMatch);
  },

  displayScore() {
    console.log(`\nThe ${this.matchOver() ? 'final' : ''} score is:`);
    console.log(`Human: ${this.human.score}`);
    console.log(`Computer: ${this.computer.score}`);
    console.log(`Playing to: ${this.pointsPerMatch}\n`);
  },

  displayFinalWinner() {
    console.clear();
    if (this.human.score >= this.pointsPerMatch) {
      console.log(MESSAGES.playerWin);
    } else if (this.computer.score >= this.pointsPerMatch) {
      console.log(MESSAGES.computerWin);
    } else {
      console.log(MESSAGES.incompleteMatch);
    }

    this.displayScore();
  },

  playAgain() {
    if (this.matchOver()) return false;

    let response = readline.question(MESSAGES.promptPlayAgain);
    while (response !== 'y' && response !== 'n' && response !== '') {
      response = readline.question(MESSAGES.promptPlayAgainError);
    }

    return (response === 'y' || response === '');
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
    this.displayFinalWinner();
    this.displayGoodbye();
  },

};


//RPSGame.play();
console.log(global)
