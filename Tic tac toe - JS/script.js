"use strict";
/********** GLOBAL VARIABLE *********/
const winCondition = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
const [player_x_class, player_o_class] = ["x", "o"];
let isPlayer_x_turn = true;
let currentPlayerClass = player_x_class;
let running = false;
/********** REUSE Elements *********/
const cellEls = document.querySelectorAll(".cell");
const boardEl = document.querySelector(".board");
const msgEl = document.querySelector(".msg");
const btnRestart = document.querySelectorAll(".btn-restart");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
// THEME ELEMENT
const btnTheme = document.querySelectorAll(".btn-theme");
const lightThemeIconEl = document.querySelector(".light-theme-icon");
const darkThemeIconEl = document.querySelector(".dark-theme-icon");
let currentTheme = lightThemeIconEl;
/********** REUSE FUNCTION *********/
// show modal
const openModal = function () {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
};
// close modal
const closeModal = function () {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
};
// Add Hover effect function
function setBoardHoverClass(currentPlayerClass) {
  removeBoardHoverClass();
  boardEl.classList.add(currentPlayerClass);
}
// Remove Hover Effect function
function removeBoardHoverClass() {
  boardEl.classList.remove(player_x_class);
  boardEl.classList.remove(player_o_class);
}
// Swap player's
function swapTurn() {
  currentPlayerClass = isPlayer_x_turn ? player_o_class : player_x_class;
  isPlayer_x_turn = !isPlayer_x_turn;
}
// Check winning condition
function isWinning(currentPlayerClass) {
  for (let i = 0; i < winCondition.length; i++) {
    const currWinCondi = winCondition[i];
    let win = true;
    for (let j = 0; j < currWinCondi.length; j++) {
      const cell = document.querySelector(`.cell-${currWinCondi[j]}`);
      if (!cell.classList.contains(currentPlayerClass)) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }
  return false;
}
// Check Drawing condition
function isDraw() {
  for (let i = 0; i < cellEls.length; i++) {
    const cell = cellEls[i];
    if (
      !cell.classList.contains(player_o_class) &&
      !cell.classList.contains(player_x_class)
    ) {
      return false;
    }
  }
  return true;
}
// Callback CLICK function
function handleClick() {
  // here this = event.target
  if (running) {
    this.classList.add(currentPlayerClass);
    if (isWinning(currentPlayerClass)) {
      msgEl.textContent = `${currentPlayerClass === "x" ? "X" : "O"}'s WIN`;
      endTheGame();
      openModal();
      return;
    }
    if (isDraw()) {
      msgEl.textContent = `DRAW!`;
      openModal();
      endTheGame();
      return;
    }
    swapTurn();
    setBoardHoverClass(currentPlayerClass);
  }
}
// Start the game function
function startTheGame() {
  closeModal();
  isPlayer_x_turn = running = true;
  setBoardHoverClass(currentPlayerClass);
  cellEls.forEach((cell) => {
    cell.classList.remove(player_x_class);
    cell.classList.remove(player_o_class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
}
// End the game function
function endTheGame() {
  running = false;
  removeBoardHoverClass();
}
/********** START THE GAME *********/
startTheGame();

/********** RESTART THE GAME *********/
btnRestart.forEach((btn) => {
  btn.addEventListener("click", startTheGame);
});
// CHANGE THEME
const changeThemeColor = function () {
  const elsStyle = document.documentElement.style;
  if (currentTheme === lightThemeIconEl) {
    elsStyle.setProperty("--color-main-text", "#fff");
    elsStyle.setProperty("--color-light-main-bg", "#000");
    elsStyle.setProperty(`--color-light-bg`, "#000");
    elsStyle.setProperty(`--color-light-set`, "#fff");
    elsStyle.setProperty(
      `--color-light-bg-overlay`,
      "rgba(123, 123, 123, 0.8)"
    );

    elsStyle.setProperty(`--color-light-bg-btn-hover`, "#b3b3b3");
  } else {
    elsStyle.setProperty("--color-main-text", "#000");
    elsStyle.setProperty("--color-light-main-bg", "#fff");
    elsStyle.setProperty("--color-light-bg", "#fff");
    elsStyle.setProperty("--color-light-hover", "lightgrey");
    elsStyle.setProperty("--color-light-set", "#000");
    elsStyle.setProperty("--color-light-bg-overlay", "rgba(0, 0, 0, 0.9)");
    elsStyle.setProperty("--color-light-bg-btn-hover", "#424242");
  }
};
const swapTheme = function () {
  currentTheme.classList.remove("hidden");
  changeThemeColor();
  currentTheme =
    currentTheme === lightThemeIconEl ? darkThemeIconEl : lightThemeIconEl;
  currentTheme.classList.add("hidden");
};
btnTheme.forEach((btn) => {
  btn.addEventListener("click", function () {
    swapTheme();
  });
});
