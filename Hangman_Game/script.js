// Get elements
const wordToGuessElement = document.getElementById("wordToGuess");
const hangmanParts = document.querySelectorAll(".body-part");
const guessForm = document.getElementById("guessForm");
const letterInput = document.getElementById("letterInput");

// Define words for the game
const words = [
  "hangman",
  "javascript",
  "programming",
  "computer",
  "internet",
  "keyboard",
  "monitor",
  "mouse",
  "developer",
];

// Initialize variables
let wordToGuess = "";
let guessedLetters = [];
let incorrectGuesses = 0;

// Function to choose a random word
function chooseWord() {
  wordToGuess = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  incorrectGuesses = 0;
  renderWordToGuess();
  resetHangman();
}

// Function to render the word to guess with underscores for unknown letters
function renderWordToGuess() {
  wordToGuessElement.textContent = wordToGuess.replace(/\w/g, (letter) =>
    guessedLetters.includes(letter) ? letter : "_"
  );
}

// Function to reset the hangman figure
function resetHangman() {
  hangmanParts.forEach((part) => (part.style.display = "none"));
}

// Function to reveal hangman parts based on incorrect guesses
function revealHangmanPart() {
  hangmanParts[incorrectGuesses].style.display = "block";
}

// Function to handle guess submission
function handleGuess(event) {
  event.preventDefault();
  const guessedLetter = letterInput.value.toLowerCase();
  if (!guessedLetters.includes(guessedLetter)) {
    guessedLetters.push(guessedLetter);
    if (!wordToGuess.includes(guessedLetter)) {
      incorrectGuesses++;
      revealHangmanPart();
      if (incorrectGuesses === hangmanParts.length) {
        setTimeout(() => {
          alert("Game over! The word was: " + wordToGuess);
          chooseWord();
        }, 500);
      }
    }
    renderWordToGuess();
    if (
      !wordToGuess.split("").some((letter) => !guessedLetters.includes(letter))
    ) {
      setTimeout(() => {
        alert("Congratulations! You guessed the word: " + wordToGuess);
        chooseWord();
      }, 500);
    }
  }
  letterInput.value = "";
}

// Add event listener for form submission
guessForm.addEventListener("submit", handleGuess);

// Choose a word
chooseWord();
