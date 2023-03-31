"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const SYMBOLS = [
  'bulb', 'camera', 'clouds', 'house', 'link', 'music', 'robot', 'rocket', 'tack', 'trash,
  'bulb', 'camera', 'clouds', 'house', 'link', 'music', 'robot', 'rocket', 'tack', 'trash'
];

const symbols = shuffle(SYMBOLS);

createCards(symbols);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every symbol in symbols (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the symbol
 * - a click event listener for each card to handleCardClick
 */

function createCards(symbols) {
  const gameBoard = document.getElementById("game");

  for (let symbol of symbols) {
    const cardDiv = document.createElement('div');

    const faceDown = document.createElement('img');
    faceDown.src = './images/facedown.png';
    faceDown.classList.add('faceDown');

    const faceUp = document.createElement('img');
    faceUp.src = `./images/${symbol}.png`;
    faceUp.classList.add('faceUp');

    cardDiv.classList.add(symbol);
    cardDiv.appendChild(faceUp);
    cardDiv.appendChild(faceDown);

    gameBoard.appendChild(cardDiv);
    cardDiv.addEventListener('click', flipCard);
  }
}

let hasBeenFlipped = false;
let stopClicks = false;
let card1, card2;

let currentScore = 0;
let trackScore = [];
let matchCount = 0;
let bestScore = '--';

displayBestScore();

function flipCard() {
 if (stopClicks) {
return;
}
if (this === card1) {
return;
}

this.classList.add('flip')

if (!hasBeenFlipped) {
hasBeenFlipped = true;
card1 = this;
return;
}

card2 = this;
currentScore += 1;
updateScore();

checkForMatch();

}

function updateScore () {
  let currScore = document.getElementById('currentScore');
  currScore.innerHTML = currentScore;
}


function checkForMatch () {
  if (card1.classList[0] === card2.classList[0]) {
  disableCards();
  matchCount += 1;

  if (matchCount === 10) {
    trackScore.push(currentScore);
    displayBestScore();

    let cards = document.querySelectorAll('#game > div')


    let tryAgainBtn = document.getElementById('retry');
    tryAgainBtn.addEventListener('click', function () {
      currentScore = 0;
      updateScore();
      matchCount = 0;
      for (let card of cards) {
      card.classList.remove('flip');
      card.addEventListener('click', flipCard);
      stopClicks = false;
      hasBeenFlipped = false;
      }
    })
}


  } else {
    unFlipCards();
  }
}

function disableCards() {
  card1.removeEventListener('click', flipCard);
  card2.removeEventListener('click', flipCard);
  hasBeenFlipped = false;
  stopClicks = false;

  // resetBoard();
}

function unFlipCards () {
  stopClicks = true;

  setTimeout(() => {

    card1.classList.remove('flip');
    card2.classList.remove('flip');

  resetBoard();
  }, 1000);
}

function resetBoard() {
  hasBeenFlipped = false;
  stopClicks = false;
  card1 = null;
  card2 = null;
  }

  function displayBestScore () {
    if (trackScore.length === 0) {
    bestScore = '--'
  } else if (trackScore.length === 1) {
      bestScore = trackScore[0];
    } else {
      bestScore = Math.min(...trackScore)
    }
    let best = document.getElementById('bestScore');
    best.innerHTML = bestScore;
  }



let tryAgainBtn = document.getElementById('reset');
tryAgainBtn.addEventListener('click', function () {
 location.reload();
});