/*
 * Create a list that holds all of your cards
 */
var cardList = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];

var deck = document.querySelector(".deck");

var openCards = [];

var matchedCards = [];

var moves = document.querySelector(".moves");
var moveCount = 0;
moves.append(moveCount);

var timer = document.querySelector(".timer-seconds");
var timeCount = 0;
timer.append(timeCount);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function gameSetup() {

   var cards = shuffle(cardList);

   for (var i = 0; i < cards.length; i++) {
    var card = document.createElement("li");
    card.classList.add("card");

    var cardIcon = document.createElement("i");
    cardIcon.classList.add("fa", cards[i]);

    card.append(cardIcon);
    deck.append(card);
   }
   startGame();
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function startGame() {
  var clickedCard = document.querySelectorAll("li.card");

  for (var i = 0; i < clickedCard.length; i++) {
    clickedCard[i].addEventListener("click", function( event ) {
        this.classList.add("open", "show");

        openCards.push(this.firstChild.getAttribute('class'));

        matchCards();
        starRating();
    }, false);
  }

  // start Timer
  deck.addEventListener("click", function( event ) {
    setInterval(startTimer, 1000);
  }, {once: true});
}

function matchCards() {
    if (openCards.length === 2) {
      moveCount++;
      moves.innerHTML = moveCount;
        if (openCards[0] === openCards[1]) {
          matchedCards.push(openCards[0]);
          matchedCards.push(openCards[1]);
          var matchedCard = document.querySelectorAll(".open");
          for (var i = 0; i < matchedCards.length; i++) {
            matchedCard[i].classList.add("match");
            matchedCard[i].classList.remove("open", "show");
            openCards.pop();

            endGame();
          }
      } else {
          var unMatchedCard = document.querySelectorAll(".open");
          setTimeout(function () {
            for (var i = 0; i < 2; i++) {
              unMatchedCard[i].classList.remove("open", "show");
              openCards.pop();
            }
          }, 500);
      }
    }
}

function startTimer() {
  var timerSeconds = document.querySelector('.timer-seconds');
  var now = new Date();

  var seconds = now.getSeconds();
  var secondsCount = ((seconds / 60) * 360) + 90;
  timerSeconds.innerHTML = timeCount++;
}

function starRating() {
  if (moveCount === 20) {
    document.querySelector(".third-star").style.display ="none";
    document.querySelector(".third-star2").style.display ="none";
  } else if (moveCount === 30) {
    document.querySelector(".second-star").style.display ="none";
    document.querySelector(".second-star2").style.display ="none";
  } else if (moveCount === 40) {
    document.querySelector(".first-star").style.display ="none";
    document.querySelector(".first-star2").style.display ="none";
  }

  // display none/initial
}

function repeat() {
  var faRepeat = document.querySelector(".fa-repeat");
  faRepeat.addEventListener("click", function( event ) {
    moveCount = 0;
    moves.innerHTML = moveCount;
    timeCount = 0;
    document.querySelector(".overlay").style.display ="none";
    document.querySelector(".first-star").style.display ="initial";
    document.querySelector(".first-star2").style.display ="initial";
    document.querySelector(".second-star").style.display ="initial";
    document.querySelector(".second-star2").style.display ="initial";
    document.querySelector(".third-star").style.display ="initial";
    document.querySelector(".third-star2").style.display ="initial";
    for (var i = 0; i < cardList.length; i++) {
      var oldCards = document.querySelector(".card");
      deck.removeChild(oldCards);
    }
    gameSetup();
  }, false);
}

function endGame() {
  if (matchedCards.length === 16) {
      deck.addEventListener("click", function( event ) {
        document.querySelector(".overlay").style.display ="initial";
        moveScore = document.querySelector(".moves-overlay");
        moveScore.innerHTML = moveCount;
        var timerOverlay = document.querySelector(".timer-seconds-overlay");
        timerOverlay.innerHTML = timeCount;
      }, false);
  }
}

repeat();
gameSetup();
