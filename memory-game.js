"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const SYMBOLS = [
  'bulb', 'camera', 'clouds', 'house', 'link', 'music', 'robot', 'rocket', 'tack', 'trash',
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
    const card = document.createElement('div');
    const faceDown = document.createElement('img');
    faceDown.src = './images/faceDown.png';
    faceDown.classList.add(symbol);
    card.classList.add(symbol);
    card.appendChild(faceDown);
    gameBoard.appendChild(card);
    card.addEventListener('click', handleCardClick);
  }
}

let firstFlippedDiv;
let secondFlippedDiv;
let card1 = '';
let card2 = '';

function flipCard(card) {
  let flipped = card.classList.value;
  card.children[0].src = `./images/${flipped}.png`
}

function unFlipCard() {
  firstFlippedDiv.children[0].src = './images/facedown.png';
  secondFlippedDiv.children[0].src = './images/facedown.png';
  keepFlipping = true;
}

let flipCount = 0;
let keepFlipping = true;


function handleCardClick(evt) {
  if (keepFlipping === true) {

if (flipCount === 0) {
flipCard(evt.currentTarget);
card1 = evt.currentTarget.classList.value;
firstFlippedDiv = evt.currentTarget;
flipCount += 1;
return;
}
if (flipCount === 1) {
  flipCard(evt.currentTarget)
  card2 = evt.currentTarget.classList.value;
  secondFlippedDiv = evt.currentTarget;
  flipCount += 1;
  keepFlipping = false;

  if (card1 !== card2) {
  setTimeout(unFlipCard, 1000);
  flipCount = 0;
} else {
  flipCount = 0;
  keepFlipping = true;
  return;
}
}
}
}


