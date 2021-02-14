"use strict";

//selecting score elements of 2 players
const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");
//selecting dice elements
const diceEl = document.querySelector(".dice");
//selecting button elements
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//selecting player Elemenets
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//selecting currentscore Elements
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");

let playing, scores, currentScore, activePlayer;

//starting copnditions

//reset game function
const resetGame = function () {
  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  diceEl.classList.add("hidden");
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
};

// initial rset
resetGame();

//player switching funcrion
const switchToNextPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//rolling dice function

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${dice}.png`;
    if (dice !== 1) {
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore += dice;
    } else {
      switchToNextPlayer();
    }
  }
});

//Holding  scores function
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchToNextPlayer();
    }
  }
});

//new game button reset
btnNew.addEventListener("click", resetGame);
