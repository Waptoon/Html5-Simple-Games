// Define an array of symbols for the cards
const symbols = ["♠", "♣", "♥", "♦", "♠", "♣", "♥", "♦"];

// Shuffle the symbols array
symbols.sort(() => Math.random() - 0.5);

// Get the game board element
const gameBoard = document.getElementById("gameBoard");

// Initialize variables
let flippedCards = [];
let matchedPairs = 0;

// Function to create a card element
function createCard(symbol, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = symbol;
  card.setAttribute("data-index", index);
  card.addEventListener("click", handleCardClick);
  gameBoard.appendChild(card);
}

// Function to handle card clicks
function handleCardClick() {
  const cardIndex = parseInt(this.getAttribute("data-index"));

  // Ignore clicks on matched or already flipped cards
  if (this.classList.contains("matched") || flippedCards.includes(cardIndex)) {
    return;
  }

  // Flip the clicked card
  this.classList.add("flipped");
  flippedCards.push(cardIndex);

  // Check if two cards are flipped
  if (flippedCards.length === 2) {
    const card1Index = flippedCards[0];
    const card2Index = flippedCards[1];
    const card1 = document.querySelector(`.card[data-index='${card1Index}']`);
    const card2 = document.querySelector(`.card[data-index='${card2Index}']`);

    // Check if the flipped cards match
    if (card1.textContent === card2.textContent) {
      // If the cards match, mark them as matched
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedPairs++;

      // Check if all pairs are matched
      if (matchedPairs === symbols.length / 2) {
        setTimeout(() => {
          alert("Congratulations! You matched all pairs!");
          resetGame();
        }, 500);
      }
    } else {
      // If the cards don't match, flip them back after a short delay
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
      }, 1000);
    }

    // Clear the flipped cards array
    flippedCards = [];
  }
}

// Function to reset the game
function resetGame() {
  // Remove all cards from the game board
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild);
  }

  // Reset variables
  flippedCards = [];
  matchedPairs = 0;

  // Re-shuffle the symbols array
  symbols.sort(() => Math.random() - 0.5);

  // Create new cards
  symbols.forEach((symbol, index) => {
    createCard(symbol, index);
  });
}

// Create cards for each symbol
symbols.forEach((symbol, index) => {
  createCard(symbol, index);
});
