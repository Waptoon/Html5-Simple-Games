// Get the canvas element and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define constants
const blockSize = 30;
const boardWidth = 10;
const boardHeight = 20;
const boardBorderWidth = 4;
const boardBorderHeight = 4;
const boardColor = "#000";
const emptyBlockColor = "#fff";
const tetrominoColors = [
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#FFA500", // Orange
];

// Tetromino shapes
const tetrominoes = [
  // I
  [[1, 1, 1, 1]],
  // J
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  // L
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  // O
  [
    [1, 1],
    [1, 1],
  ],
  // S
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  // T
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  // Z
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
];

// Initialize variables
let board = [];
let currentTetromino;
let currentTetrominoColor;
let currentX = 0;
let currentY = 0;
let isGameOver = false;

// Function to create the game board
function createBoard() {
  for (let row = 0; row < boardHeight; row++) {
    board[row] = [];
    for (let col = 0; col < boardWidth; col++) {
      board[row][col] = emptyBlockColor;
    }
  }
}

// Function to generate a random tetromino
function generateRandomTetromino() {
  const randomIndex = Math.floor(Math.random() * tetrominoes.length);
  currentTetromino = tetrominoes[randomIndex];
  currentTetrominoColor = tetrominoColors[randomIndex];
  currentX = Math.floor((boardWidth - currentTetromino[0].length) / 2);
  currentY = 0;
}

// Function to draw a block on the canvas
function drawBlock(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
  ctx.strokeStyle = "#000";
  ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

// Function to draw the game board
function drawBoard() {
  for (let row = 0; row < boardHeight; row++) {
    for (let col = 0; col < boardWidth; col++) {
      drawBlock(col, row, board[row][col]);
    }
  }
}

// Function to draw the current tetromino
function drawTetromino() {
  currentTetromino.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block) {
        drawBlock(currentX + x, currentY + y, currentTetrominoColor);
      }
    });
  });
}

// Function to move the current tetromino down
function moveDown() {
  if (!isGameOver && isValidMove(0, 1)) {
    currentY++;
  } else {
    mergeTetromino();
    clearLines();
    generateRandomTetromino();
    if (!isValidMove(0, 0)) {
      isGameOver = true;
    }
  }
}

// Function to move the current tetromino left
function moveLeft() {
  if (!isGameOver && isValidMove(-1, 0)) {
    currentX--;
  }
}

// Function to move the current tetromino right
function moveRight() {
  if (!isGameOver && isValidMove(1, 0)) {
    currentX++;
  }
}

// Function to rotate the current tetromino
function rotate() {
  if (!isGameOver) {
    const rotatedTetromino = [];
    for (let y = 0; y < currentTetromino[0].length; y++) {
      let row = [];
      for (let x = currentTetromino.length - 1; x >= 0; x--) {
        row.push(currentTetromino[x][y]);
      }
      rotatedTetromino.push(row);
    }
    if (isValidMove(0, 0, rotatedTetromino)) {
      currentTetromino = rotatedTetromino;
    }
  }
}

// Function to merge the current tetromino with the game board
function mergeTetromino() {
  currentTetromino.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block) {
        board[currentY + y][currentX + x] = currentTetrominoColor;
      }
    });
  });
}

// Function to check if a move is valid
function isValidMove(dx, dy, tetromino = currentTetromino) {
  for (let y = 0; y < tetromino.length; y++) {
    for (let x = 0; x < tetromino[y].length; x++) {
      if (tetromino[y][x]) {
        const newX = currentX + x + dx;
        const newY = currentY + y + dy;
        if (
          newX < 0 ||
          newX >= boardWidth ||
          newY >= boardHeight ||
          (newY >= 0 && board[newY][newX] !== emptyBlockColor)
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

// Function to clear completed lines
function clearLines() {
  for (let y = boardHeight - 1; y >= 0; y--) {
    let isLineComplete = true;
    for (let x = 0; x < boardWidth; x++) {
      if (board[y][x] === emptyBlockColor) {
        isLineComplete = false;
        break;
      }
    }
    if (isLineComplete) {
      for (let newY = y - 1; newY >= 0; newY--) {
        board[newY + 1] = [...board[newY]];
      }
      y++;
    }
  }
}

// Function to handle keyboard input
function handleKeyPress(event) {
  if (event.key === "ArrowDown") {
    moveDown();
  } else if (event.key === "ArrowLeft") {
    moveLeft();
  } else if (event.key === "ArrowRight") {
    moveRight();
  } else if (event.key === "ArrowUp") {
    rotate();
  }
}

// Add event listener for keyboard input
document.addEventListener("keydown", handleKeyPress);

// Function to update game state
function update() {
  if (!isGameOver) {
    moveDown();
  }
}

// Function to render game objects
function render() {
  drawBoard();
  drawTetromino();
  if (isGameOver) {
    ctx.fillStyle = "#000";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over", 50, canvas.height / 2);
  }
}

// Main game loop
function gameLoop() {
  update();
  render();
  setTimeout(() => requestAnimationFrame(gameLoop), 500);
}

// Start the game
createBoard();
generateRandomTetromino();
gameLoop();
