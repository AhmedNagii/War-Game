let deckId;
let comScore = 0;
let playerScore = 0;
const cards = document.getElementById("cards").children;
const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-cards");
const remainingCards = document.getElementById("remaining-cards");
const winerText = document.getElementById("the-Winer");
const computerScoreText = document.getElementById("computer-socre-text");
const palyerScoreText = document.getElementById("player-socre-text");

async function handelClick() {
  const response = await fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
  );
  const data = await response.json();
  remainingCards.textContent = `Remaining cards: ${data.remaining}`;
  deckId = data.deck_id;
}

async function getImages() {
  const res = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
  );
  const data = await res.json();

  

  remainingCards.textContent = `Remaining cards: ${data.remaining}`;
  cards[0].innerHTML = `
            <img src=${data.cards[0].image} class="card" />`;
  cards[1].innerHTML = `<img src=${data.cards[1].image} class="card" />
        `;
  winerText.textContent = determineCardWinner(data.cards[0], data.cards[1]);
  if (data.remaining === 0) {
    drawCardBtn.disabled = true;
    winerText.textContent = theFinalWinner();
  }
}
newDeckBtn.addEventListener("click", handelClick);

drawCardBtn.addEventListener("click", getImages);

const availCards = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
];

function theFinalWinner() {
  if (playerScore > comScore) {
    return "🎉 You are the winner 🎉";
  } else if (playerScore < comScore) {
    return "Computer is the winner 😔";
  } else {
    return "no one has won! 🤔 ";
  }
}

function determineCardWinner(card1, card2) {
  if (availCards.indexOf(card1.value, 0) > availCards.indexOf(card2.value, 0)) {
    comScore++;
    computerScoreText.textContent = `Computer Score: ${comScore}`;
    return "Computer wins!";
  } else if (
    availCards.indexOf(card2.value, 0) > availCards.indexOf(card1.value, 0)
  ) {
    playerScore++;
    palyerScoreText.textContent = `My Score: ${playerScore}`;
    return "You win!";
  } else {
    return "War!";
  }
}
