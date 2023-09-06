"use strict";

// Constants for DOM elements
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const scoreElements = [
  document.getElementById("total-score-1"),
  document.getElementById("total-score-2"),
];
const currentScoreElements = [
  document.getElementById("current-score-1"),
  document.getElementById("current-score-2"),
];
const newgame = document.getElementById("newgame");
const rolldice = document.getElementById("rolldice");
const hold = document.getElementById("hold");
const dice = document.querySelector(".dice");

// Initialize game state

let current = 0;
let activePlayer = 1;
let Playing = true;
let totalScore = [0, 0];
document.getElementById("total-score-1").textContent = 0;
document.getElementById("total-score-2").textContent = 0;
// Function to switch players
function switchPlayer() {
  current = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1.classList.toggle("player-active");
  player2.classList.toggle("player-active");
}

// Function to update scores on the screen
function updateScores() {
  scoreElements[activePlayer - 1].textContent = totalScore[activePlayer - 1];
  currentScoreElements[activePlayer - 1].textContent = current;
}

// Event listener for the "Roll Dice" button
rolldice.addEventListener("click", function () {
  if (Playing) {
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `dice-${randomDice}.png`;

    if (randomDice !== 1) {
      current += randomDice;
      updateScores();
    } else {
      currentScoreElements[activePlayer - 1].textContent = 0;
      switchPlayer();
    }
  }
});

// Event listener for the "Hold" button
hold.addEventListener("click", function () {
  if (Playing) {
    totalScore[activePlayer - 1] += current;
    updateScores();

    if (totalScore[activePlayer - 1] >= 100) {
      dice.classList.add("hidden");
      Playing = false;
      let winner = (document.querySelector(
        `.player${activePlayer}`
      ).style.backgroundColor = "#2f2f2f");
    } else {
      switchPlayer();
    }
  }
});
newgame.addEventListener("click", function () {
  dice.classList.add("hidden");
  let winner;

  if (activePlayer === 1) {
    winner = document.querySelector(`.player1`).style.backgroundColor =
      " #d5a5b3";
  } else {
    winner = document.querySelector(`.player2`).style.backgroundColor =
      " #ab6e90";
  }

  current = 0;
  activePlayer = 1;
  Playing = true;
  totalScore = [0, 0]; // Resetting totalScore to [0, 0]

  scoreElements[0].textContent = 0; // Resetting displayed scores to 0
  scoreElements[1].textContent = 0;
  currentScoreElements[0].textContent = 0;
  currentScoreElements[1].textContent = 0;
});
