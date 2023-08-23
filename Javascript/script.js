// ///////////////// DOM Elements /////////////////

const allSquares = document.querySelectorAll(".grid__square");
const squareOne = document.getElementById("grid__square-1");
const squareTwo = document.getElementById("grid__square-2");
const squareThree = document.getElementById("grid__square-3");
const squareFour = document.getElementById("grid__square-4");
const squareFive = document.getElementById("grid__square-5");
const squareSix = document.getElementById("grid__square-6");
const squareSeven = document.getElementById("grid__square-7");
const squareEight = document.getElementById("grid__square-8");
const squareNine = document.getElementById("grid__square-9");

//////////////////////////////////

const playerOneNameBanner = document.getElementById("info-player-1");
const playerTwoNameBanner = document.getElementById("info-player-2");
const playerOneName = document.querySelector(".info-player1-name");
const playerTwoName = document.querySelector(".info-player2-name");
const playerOneScore = document.querySelector(".info-player1-score");
const playerTwoScore = document.querySelector(".info-player2-score");

//////////////////////////////////

const infoText = document.querySelector(".instructions-text");
const gameBtn = document.querySelector(".instructions-btn");
const modal = document.querySelector(".modal");

///////////////// Game Variables /////////////////

const players = {
  playerOne: { name: "Player 1", wins: 0 },
  playerTwo: { name: "Player 2", wins: 0 },
};

let move = 1;
let currentPlayer = players.playerOne.name;
let nextPlayer;
let currentImg = "cross";
let NewGame = false;

/////////////////  Game Functions  /////////////////

////// Active Player Logic //////

////// Square Event Listener //////

function addSquareClick() {
  allSquares.forEach((square) => {
    square.addEventListener("click", squareClick);
  });
}

////// Remove Square Event Listener //////

function removeSquareClick() {
  allSquares.forEach((square) => {
    square.removeEventListener("click", squareClick);
  });
}

////// Square Class Check //////

function squareClick() {
  if (!this.classList.contains("cross") && !this.classList.contains("circle")) {
    this.classList.add(`${currentImg}`);
    this.classList.add("grid__square-used");
    incrementMove();
  }
}

////// Player Logic //////
const incrementMove = () => {
  move++;

  if (move % 2 !== 0) {
    currentPlayer = players.playerOne.name;
    nextPlayer = players.playerTwo.name;
    currentImg = "cross";
    infoText.innerHTML = `${currentPlayer}'s Turn`;
  } else {
    currentPlayer = players.playerTwo.name;
    nextPlayer = players.playerOne.name;
    currentImg = "circle";
    infoText.innerHTML = `${currentPlayer}'s Turn`;
  }

  checkPlayerWin();
  checkForTie();
};

////// Check For Win //////

const checkPlayerWin = () => {
  const lines = [
    [squareOne, squareTwo, squareThree],
    [squareFour, squareFive, squareSix],
    [squareSeven, squareEight, squareNine],
    [squareOne, squareFour, squareSeven],
    [squareTwo, squareFive, squareEight],
    [squareThree, squareSix, squareNine],
    [squareOne, squareFive, squareNine],
    [squareThree, squareFive, squareSeven],
  ];

  const winningList = lines.find((line) => {
    const hasCross = line.every((square) => square.classList.contains("cross"));
    const hasCircle = line.every((square) =>
      square.classList.contains("circle")
    );
    return hasCross || hasCircle;
  });

  if (winningList) {
    winningList.forEach((square) => {
      square.classList.add("win");
    });

    const winner = winningList.some((square) =>
      square.classList.contains("cross")
    )
      ? players.playerOne
      : players.playerTwo;
    winner.wins++;
    updateScores();
    playerWon();
  }
};

////// Check For Tie //////

const checkForTie = () => {
  const squares = [
    squareOne,
    squareTwo,
    squareThree,
    squareFour,
    squareFive,
    squareSix,
    squareSeven,
    squareEight,
    squareNine,
  ];

  const allSquaresFilled = squares.every((square) => {
    return (
      square.classList.contains("cross") || square.classList.contains("circle")
    );
  });

  if (allSquaresFilled && !NewGame) {
    infoText.innerHTML = "It's a tie!";

    allSquares.forEach((square) => {
      square.classList.add("tie");
    });

    continueGame();
  }
};

////// Update Scoreboard //////

const updateScores = () => {
  playerOneScore.innerHTML = players.playerOne.wins;
  playerTwoScore.innerHTML = players.playerTwo.wins;
};

const playerWon = () => {
  infoText.innerHTML = `${nextPlayer} has won!`;
  NewGame = true;
  continueGame();
};

////// Game Logic //////

const continueGame = () => {
  removeSquareClick();
  setTimeout(() => {
    reset();
  }, 2000);
};

const restartGame = () => {
  removeSquareClick();
  reset();
};

const reset = () => {
  allSquares.forEach((square) => {
    square.classList = "grid__square";
  });

  addSquareClick();
  NewGame = false;
  infoText.innerHTML = `${currentPlayer}'s turn to start`;
};

const startGame = () => {
  gameBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const player1 = document
      .querySelector(".player1-name")
      .value.trim()
      .toLowerCase();
    const player2 = document
      .querySelector(".player2-name")
      .value.trim()
      .toLowerCase();

    const player1InputCap = player1.charAt(0).toUpperCase() + player1.slice(1);
    const player2InputCap = player2.charAt(0).toUpperCase() + player2.slice(1);

    players.playerOne.name = player1InputCap;
    players.playerTwo.name = player2InputCap;

    currentPlayer = player1;

    playerOneName.innerHTML = players.playerOne.name;
    playerTwoName.innerHTML = players.playerTwo.name;

    players.playerOne.wins = 0;
    players.playerTwo.wins = 0;
    updateScores();

    infoText.innerHTML = `${currentPlayer}'s Turn`;

    modal.style.display = "none";
    gameBtn.innerHTML = "Restart Game";
    addSquareClick();
    reset();
  });
};

startGame();
