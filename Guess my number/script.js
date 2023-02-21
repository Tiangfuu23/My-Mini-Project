"use strict";
/* *** Global Var *** */
let level = 1;
let score = 20;
let secretedNumber = Math.ceil(Math.random() * 20 * Math.pow(2, level - 1));
let highScore = 0;
let isCorrect = false;
/* REUSE ELEMENT */
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn-modal");
/* ********* GENERAL FUNCTION ********* */
// Get screted number from 1 to n
let getSecretedNumber = function (n) {
  return Math.ceil(Math.random() * n);
};
//display message
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};
// open modal window
const openModal = function () {
  modal.classList.remove("hidden", "go-to-right");
  overlay.classList.remove("hidden");
};
// close modal window
const closeModal = function () {
  modal.classList.add("go-to-right");
  overlay.classList.add("hidden");
  // Animation
  scaleUpDown(".between");
  scaleUpDown(".label-level");
  // RESETING
  score = 20;
  document.querySelector(".score").textContent = 20;
  displayMessage(`Start guessing...`);
  document.querySelector("body").style.backgroundColor = "";
  document.querySelector(".number").style.width = "";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
};
// Scale up and down animation
const scaleUpDown = function (target) {
  document.querySelector(target).classList.add("scale-up");
  setTimeout(function () {
    document.querySelector(target).classList.remove("scale-up");
  }, 300);
};
// decrease score
const decreaseScore = function () {
  score--;
  document.querySelector(".score").textContent = score;
};
// define game over status
const gameOver = function () {
  displayMessage("Game over! Try next time :)");
  isCorrect = false;
};
// define start the game status
const startTheGame = function () {
  // Update level
  if (isCorrect) {
    level++;
    isCorrect = false;
  } else {
    level = 1;
  }
  secretedNumber = Math.ceil(Math.random() * 20 * Math.pow(2, level - 1));
  document.querySelectorAll(".level").forEach((element) => {
    element.textContent = level;
  });
  document.querySelector(".range").textContent = 20 * Math.pow(2, level - 1);
  // Modal window
  openModal();
  btnCloseModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !overlay.classList.contains("hidden"))
      closeModal();
  });
};
/* ********* START THE GAME ********* */
startTheGame();
/* Define game logic */
document.querySelector(".check").addEventListener("click", function () {
  // Get player's score
  const scoreEl = document.querySelector(".guess");
  const userGuess = Number(scoreEl.value);
  // if player does not type any number (score = 0)
  if (!userGuess) {
    displayMessage("No Number! Please guessing");
  }
  // if player get correct number
  else if (userGuess === secretedNumber) {
    displayMessage("Correct Number!");
    // Change background
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").textContent = secretedNumber;
    // For dynamic purpose
    const numberClWiddth = parseInt(
      window.getComputedStyle(document.querySelector(".number")).width
    );
    // console.log(numberClWiddth, typeof numberClWiddth);
    document.querySelector(".number").style.width = `${numberClWiddth * 2}px`;
    // update Status
    isCorrect = true;
    // update highscore
    highScore = Math.max(highScore, score);
    document.querySelector(".highscore").textContent = highScore;
  }
  // if player get wrong number
  else {
    displayMessage(userGuess > secretedNumber ? "Too hight" : "Too low");
    scaleUpDown(".message");
    if (score > 0) decreaseScore();
    if (score === 0) gameOver();
  }
});
/* ********* RESET THE GAME ********* */
document.querySelector(".again").addEventListener("click", startTheGame);
