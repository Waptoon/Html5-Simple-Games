// Get the necessary elements
const cells = document.querySelectorAll(".cell");
const grid = document.getElementById("grid");
const resetButton = document.querySelector(".button");

// Initialize variables
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

// Function to handle cell clicks
function cellClicked(index) {
  if (!gameOver && board[index] === "") {
    // Update the board
    board[index] = currentPlayer;
    // Update the UI
    cells[index].textContent = currentPlayer;
    // Check for a winner
    if (checkForWinner(currentPlayer)) {
      gameOver = true;
      showMessage(`Player ${currentPlayer} wins!`);
    } else if (board.every((cell) => cell !== "")) {
      gameOver = true;
      showMessage("It's a draw!");
    } else {
      // Switch players
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      showMessage(`Player ${currentPlayer}'s turn`);
    }
  }
}

// Function to check for a winner
function checkForWinner(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Vertical
    [0, 4, 8],
    [2, 4, 6], // Diagonal
  ];
  return winningCombinations.some((combination) =>
    combination.every((index) => board[index] === player)
  );
}

// Function to reset the game
function resetGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  cells.forEach((cell) => (cell.textContent = ""));
  showMessage(`Player ${currentPlayer}'s turn`);
}

// Function to display messages
function showMessage(message) {
  if (gameOver) {
    resetButton.style.display = "inline-block";
  } else {
    resetButton.style.display = "none";
  }
  grid.insertAdjacentHTML("afterend", `<p>${message}</p>`);
}
