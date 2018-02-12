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
// Set Beginning score to 0
var score = 0;

// Create object for Score Holder span
var scoreHolder = document.querySelector("span");

// DEPRECATED VARIABLE FOR ESTABLISHING A MATCH
//var cardsInPlay = [];

//Create array to store card ranks and ids to enable resetting cards by id
var cardsInPlayObjects = [];
var checkForMatch = function(){

  // DEPRECATED CODE FOR ESTABLISHING A MATCH

  // if (cardsInPlay[0] === cardsInPlay[1]) {
  //   score += 50;
  //   alert("You found a match!");
  //   cardsInPlay = [];
  //   scoreHolder.textContent = score;
  // } else {
  //   score -= 25;
  //   alert("Sorry, try again.");
  //
  //   cardsInPlay = [];
  //   scoreHolder.textContent = score;
  // }

  // Create array of all images
  var allCards = document.querySelectorAll("img");

  //Get two cards to compare as objects
  var cardObject1 = cardsInPlayObjects[0];
  var cardObject2 = cardsInPlayObjects[1];
    if (cardObject1.rank === cardObject2.rank) {
      alert("You found a match!");

      //Reset array
      cardsInPlayObjects = [];

      //Adjust and Update Score
      score += 50;
      scoreHolder.textContent = score;
    } else {
      alert("Sorry, try again.");

      //Reset non-matching cards and their classes to allow them to be selected again
      allCards[cardObject1.id].setAttribute("src", "images/back.png");
      allCards[cardObject2.id].setAttribute("src", "images/back.png");
      allCards[cardObject1.id].classList.add("unflipped");
      allCards[cardObject2.id].classList.add("unflipped");

      //Reset array
      cardsInPlayObjects = [];

      //Adjust and Update Score
      score -= 25;
      scoreHolder.textContent = score;
    }
}
var flipCard = function(){
  var cardId = this.getAttribute("data-id");

  //Check to make sure card hasn't been flipped already
  if(this.classList.contains("unflipped")){
    console.log("User flipped " + cards[cardId].rank);
    console.log(cards[cardId].suit);
    this.setAttribute("src", cards[cardId].cardImage);
    this.classList.remove("unflipped");
    //cardsInPlay.push(cards[cardId].rank);

    //Push card rank and ID for checkForMatch function.
    cardsInPlayObjects.push({"rank":cards[cardId].rank, "id" : cardId});
    if(cardsInPlayObjects.length === 2){
      checkForMatch();
    }
  }
}
var createBoard = function(){
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement("img");
    cardElement.setAttribute("src", "images/back.png");
    cardElement.setAttribute("data-id", i);

    //Add unflipped class to prevent double selecting a card
    cardElement.classList.add("unflipped");
    document.getElementById("game-board").appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
};
var resetBoard = function(){

  //create object for all images
  var allCards = document.querySelectorAll("img");

  //flip all cards face down
  for (var i = 0; i < cards.length; i++) {
    allCards[i].setAttribute("src", "images/back.png");
  }

  //Reset array of selected cards just in case
  cardsInPlayObjects = [];

  //reset score variable
  score = 0;

  // Set score element to 0
  scoreHolder.textContent = score;
}
//set reset button as object
var resetButton = document.getElementById("reset");

//Call Reset Function
resetButton.addEventListener("click", resetBoard);

//call createboard on load
createBoard();
