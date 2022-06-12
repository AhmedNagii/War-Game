let deckId;
const cards = document.getElementById("cards").children;
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const remainingCards =  document.getElementById('remaining-cards')
const  winerText = document.getElementById('the-Winer')

function handelClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      remainingCards.textContent = `Remaining cards: ${data.remaining}`
    
    });
}

function getImages() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      if(data.remaining === 0){
        drawCardBtn.disabled = true
      }
      winerText.textContent = checkWinner( data.cards[0],  data.cards[1])
  remainingCards.textContent = `Remaining cards: ${data.remaining}`
      cards[0].innerHTML = `
            <img src=${data.cards[0].image} class="card" />`;
      cards[1].innerHTML = `<img src=${data.cards[1].image} class="card" />
        `;
    });
}
newDeckBtn.addEventListener("click", handelClick);

drawCardBtn.addEventListener("click", getImages);



const availCards = ["2", "3", "4", "5", "6", "7", "8", "9", 
 "10", "JACK", "QUEEN", "KING", "ACE"]







function checkWinner (card1, card2){

  if(availCards.indexOf(card1.value, 0) > availCards.indexOf(card2.value, 0)){
   return 'Computer wins!'
  }else if (availCards.indexOf(card2.value, 0) > availCards.indexOf(card1.value, 0)){
    return'You win!'
  }else{
    return 'War!'
  }
}





