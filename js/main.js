var cards = [
{
  rank:"queen",
  suit:"hearts",
  cardImage: "images/queen-of-hearts.png"
},
{
  rank:"queen",
  suit:"diamonds",
  cardImage: "images/queen-of-diamonds.png"
},
{
  rank:"king",
  suit:"hearts",
  cardImage: "images/king-of-hearts.png"
},
{
  rank:"king",
  suit:"diamonds",
  cardImage: "images/king-of-diamonds.png"
}
];
var score = 0;
var scoreHolder = document.querySelector("span");
var cardsInPlay = [];
var cardsInPlayObjects = [];
var checkForMatch = function(){
  if (cardsInPlay[0] === cardsInPlay[1]) {
    score += 50;
    alert("You found a match!");
    cardsInPlay = [];
    scoreHolder.textContent = score;
  } else {
    score -= 25;
    alert("Sorry, try again.");

    cardsInPlay = [];
    scoreHolder.textContent = score;
  }
  var allCards = document.querySelectorAll("img");
  var cardObject1 = cardsInPlayObjects[0];
  var cardObject2 = cardsInPlayObjects[1];
    if (cardObject1.rank === cardObject2.rank) {
    //  score += 50;
      console.log("You found a match!");
      cardsInPlayObjects = [];
      //scoreHolder.textContent = score;
    } else {
    //  score -= 25;
      console.log("Sorry, try again.");
      allCards[cardObject1.id].setAttribute("src", "images/back.png");
      allCards[cardObject2.id].setAttribute("src", "images/back.png");
      cardsInPlayObjects = [];
      //scoreHolder.textContent = score;
    }
}
var flipCard = function(){
  var cardId = this.getAttribute("data-id");
  if(this.classList.contains("unflipped")){
    console.log("User flipped " + cards[cardId].rank);
    console.log(cards[cardId].suit);
    this.setAttribute("src", cards[cardId].cardImage);
    this.classList.remove("unflipped");
    cardsInPlay.push(cards[cardId].rank);
    cardsInPlayObjects.push({"rank":cards[cardId].rank, "id" : cardId});
    console.log(cardsInPlayObjects);
    if(cardsInPlay.length === 2){
      checkForMatch();
    }
  }
}
var createBoard = function(){
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement("img");
    cardElement.setAttribute("src", "images/back.png");
    cardElement.setAttribute("data-id", i);
    cardElement.classList.add("unflipped");
    document.getElementById("game-board").appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
};
var resetBoard = function(){
  var allCards = document.querySelectorAll("img");
  cardsInPlay = [];
  score = 0;
  for (var i = 0; i < cards.length; i++) {
    allCards[i].setAttribute("src", "images/back.png");
  }

  scoreHolder.textContent = score;
}
var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetBoard);
createBoard();
