document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const hangmanParts = document.querySelectorAll(".body-part");
  const guessForm = document.getElementById("guessForm");
  const letterInput = document.getElementById("letterInput");
  const wordToGuessElement = document.getElementById("wordToGuess");

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
  const maxIncorrectGuesses = hangmanParts.length;
  let incorrectGuesses = 0;

  // Function to choose a random word
  function chooseWord() {
    wordToGuess = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    incorrectGuesses = 0;
    resetHangman();
    renderWordToGuess();
  }

  // Function to render the word to guess with underscores for unknown letters
  function renderWordToGuess() {
    wordToGuessElement.textContent = wordToGuess.replace(/\w/g, (letter) =>
      guessedLetters.includes(letter) ? letter : "_"
    );
  }

  // Function to reset the hangman figure
  function resetHangman() {
    hangmanParts.forEach((part) => {
      part.style.opacity = 0;
      part.style.animation = "none";
    });
  }

  // Function to reveal hangman part with animation
  function revealHangmanPart() {
    hangmanParts[incorrectGuesses].style.opacity = 1;
    hangmanParts[incorrectGuesses].style.animation = "reveal 0.5s ease-in-out";
    incorrectGuesses++;
  }

  // Function to handle guess submission
  function handleGuess(event) {
    event.preventDefault();
    const guessedLetter = letterInput.value.toLowerCase();
    if (!guessedLetters.includes(guessedLetter)) {
      guessedLetters.push(guessedLetter);
      if (!wordToGuess.includes(guessedLetter)) {
        revealHangmanPart();
        if (incorrectGuesses === maxIncorrectGuesses) {
          setTimeout(() => {
            alert("Game over! The word was: " + wordToGuess);
            chooseWord();
          }, 500);
        }
      }
      renderWordToGuess();
      if (
        !wordToGuess
          .split("")
          .some((letter) => !guessedLetters.includes(letter))
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
});
