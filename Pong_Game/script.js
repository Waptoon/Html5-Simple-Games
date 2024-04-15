// Get the canvas element and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define constants
const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 10;
const paddleSpeed = 5;
const ballSpeed = 5;

// Initialize variables
let player1Score = 0;
let player2Score = 0;
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = ballSpeed;
let ballDY = ballSpeed;

// Function to draw the paddles
function drawPaddles() {
  // Draw player 1 paddle
  ctx.fillStyle = "#000";
  ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);

  // Draw player 2 paddle
  ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
}

// Function to draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.closePath();
}

// Function to draw the scores
function drawScores() {
  ctx.font = "24px Arial";
  ctx.fillText("Player 1: " + player1Score, 20, 30);
  ctx.fillText("Player 2: " + player2Score, canvas.width - 160, 30);
}

// Function to move the paddles
function movePaddles() {
  // Move player 1 paddle
  if (keysDown["w"] && paddle1Y > 0) {
    paddle1Y -= paddleSpeed;
  }
  if (keysDown["s"] && paddle1Y < canvas.height - paddleHeight) {
    paddle1Y += paddleSpeed;
  }

  // Move player 2 paddle
  if (keysDown["ArrowUp"] && paddle2Y > 0) {
    paddle2Y -= paddleSpeed;
  }
  if (keysDown["ArrowDown"] && paddle2Y < canvas.height - paddleHeight) {
    paddle2Y += paddleSpeed;
  }
}

// Function to move the ball
function moveBall() {
  // Update ball position
  ballX += ballDX;
  ballY += ballDY;

  // Check for collisions with top and bottom walls
  if (ballY - ballSize / 2 < 0 || ballY + ballSize / 2 > canvas.height) {
    ballDY = -ballDY;
  }

  // Check for collisions with paddles
  if (
    ballX - ballSize / 2 < paddleWidth &&
    ballY > paddle1Y &&
    ballY < paddle1Y + paddleHeight
  ) {
    ballDX = -ballDX;
  }
  if (
    ballX + ballSize / 2 > canvas.width - paddleWidth &&
    ballY > paddle2Y &&
    ballY < paddle2Y + paddleHeight
  ) {
    ballDX = -ballDX;
  }

  // Check for scoring
  if (ballX - ballSize / 2 < 0) {
    player2Score++;
    resetBall();
  }
  if (ballX + ballSize / 2 > canvas.width) {
    player1Score++;
    resetBall();
  }
}

// Function to reset the ball position
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballDX = ballSpeed;
  ballDY = ballSpeed;
}

// Function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to update game state
function update() {
  movePaddles();
  moveBall();
}

// Function to render game objects
function render() {
  clearCanvas();
  drawPaddles();
  drawBall();
  drawScores();
}

// Handle keyboard input
const keysDown = {};
window.addEventListener("keydown", function (event) {
  keysDown[event.key] = true;
});
window.addEventListener("keyup", function (event) {
  delete keysDown[event.key];
});

// Main game loop
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
