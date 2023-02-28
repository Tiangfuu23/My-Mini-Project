'use strict';
/**************** Global variable **************/
let currentScore = 0;
let player = 0;
const score = [0, 0];
/**************** SELECTING ELEMENT **************/
const players = document.querySelectorAll('.player');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScoreEls = document.querySelectorAll('.current-score');
const diceEl = document.querySelector('.dice');
const bntNew = document.querySelector('.btn--new');
const bntRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// Modal window element
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const btnClose = document.querySelector('.btn-close');
const btnModalYes = document.querySelector('.btn-yes');
const btnModalNo = document.querySelector('.btn-no');
/**************** REUSE FUNCTION **************/
// End the game
const endTheGame = function () {
  players[player].classList.add('player--winner');
  diceEl.classList.add('hidden');
  bntRoll.removeEventListener('click', rollTheDice);
  btnHold.removeEventListener('click', holdTheDice);
};
const switchPlayer = function () {
  setCurrentScore(0);
  currentScore = 0;
  players[player].classList.remove('player--active');
  player = 1 - player; // switch player0 -> player1 and vice verse
  players[player].classList.add('player--active');
};
const rollTheDice = function () {
  // 1. Generating a random dice roll from 1 to 6
  const dice = Math.ceil(Math.random() * 6);
  // 2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.setAttribute('src', `dice-${dice}.png`);
  // 3. Check for rolled 1
  if (dice != 1) {
    currentScore += dice;
    setCurrentScore(currentScore);
  } else {
    // switch to next player
    switchPlayer();
  }
};
const holdTheDice = function () {
  // update score
  score[player] += currentScore;
  score0El.textContent = score[0];
  score1El.textContent = score[1];
  // check current player win the game or not
  if (score[player] >= 100) {
    endTheGame();
  } else {
    // swithch player
    switchPlayer();
  }
};
const setCurrentScore = function (score) {
  currentScoreEls[player].textContent = score;
};
// Start new game
const startNewGame = function () {
  // Reset the game part
  score[0] = score[1] = 0;
  players[player].classList.remove('player--winner');
  player = 0;
  currentScore = 0;
  players[0].classList.add('player--active');
  players[1].classList.remove('player--active');
  // Start new game part
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScoreEls[0].textContent = 0;
  currentScoreEls[0].textContent = 0;
  diceEl.classList.add('hidden');
  // Rolling dice functionality
  bntRoll.addEventListener('click', rollTheDice);
  btnHold.addEventListener('click', holdTheDice);
};
// Modal window
const openModal = function () {
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden', 'go-to-right');
};
const closeModal = function () {
  overlay.classList.add('hidden');
  modal.classList.add('go-to-right');
};
// RESET THE GAME
bntNew.addEventListener('click', function () {
  openModal();
  btnClose.addEventListener('click', closeModal);
  btnModalNo.addEventListener('click', closeModal);
  btnModalYes.addEventListener('click', function () {
    closeModal();
    startNewGame();
  });
});
/**************** START THE GAME **************/
startNewGame();
