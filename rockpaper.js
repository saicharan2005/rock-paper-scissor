// const score ={
//   win : 0 ,
//   lose : 0 ,
//   ties : 0
// };

let score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  lose: 0,
  ties: 0,
};

// if(!score)
// if(score === null){
//  score ={
//   win : 0 ,
//   lose : 0 ,
//   ties : 0
// };
// }
scoreupdate();

let isautoplay = false;
let autoplayId;
function autoplay() {
  if (!isautoplay) {
    autoplayId = setInterval(function () {
      const playerMove = computerMoves();
      playGame(playerMove);
    }, 1000);
    isautoplay = true;
  } else {
    clearInterval(autoplayId);
    isautoplay = false;
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissor-button").addEventListener("click", () => {
  playGame("scissors");
});

//playing with keyboard

const eventListner = () => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
};

document.body.addEventListener("keydown", eventListner);

function playGame(playerMove) {
  const computerMove = computerMoves();
  let result = "";

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "you lose";
    } else if (computerMove === "scissors") {
      result = "you won";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "you won";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "you lose";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "you lose";
    } else if (computerMove === "paper") {
      result = "you won";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  }

  if (result === "you won") {
    score.win += 1;
  } else if (result === "you lose") {
    score.lose += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  const resultElement = document.querySelector(".result");

  resultElement.innerText = `${result}`;

  const moveElement = document.querySelector(".move");

  moveElement.innerHTML = `you <img src="/images/${playerMove}-emoji.png" alt="rock" class="move-icon">  - <img src="/images/${computerMove}-emoji.png" alt="rock" class="move-icon"> computer`;

  scoreupdate();
  // alert(`You picked ${playerMove} . computer picked ${computerMove} .${result}  \n  win :${score.win} lose :${score.lose} ties : ${score.ties}`);
}

function scoreupdate() {
  document.querySelector(
    ".score"
  ).innerText = `wins: ${score.win} , Losses: ${score.lose} , Ties : ${score.ties} `;
}

function computerMoves() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

function reset() {
  score.win = 0;
  score.lose = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  scoreupdate();
}
