
let deckId
let imagesContainer =''
function handelClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) =>{
         deckId =  data.deck_id
        console.log(deckId)
        });
}


function getImages (){
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
         document.getElementById('cards').innerHTML =
          `<img src="${data.cards[0].image}" class = "card"/>
           <img src="${data.cards[1].image}" class = "card"/>`
    })
}
document.getElementById("new-deck").addEventListener("click", handelClick);



document.getElementById("draw-cards").addEventListener("click", getImages)