// Get the canvas element and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define constants
const gridSize = 20;
const tileCount = canvas.width / gridSize;
const snake = [{ x: 10, y: 10 }];
let food = generateFood();
let dx = 0;
let dy = 0;
let score = 0;

// Function to generate random food position
function generateFood() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

// Function to draw a snake segment
function drawSnakePart(part) {
  ctx.fillStyle = "#008CBA";
  ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
  ctx.strokeStyle = "#fff";
  ctx.strokeRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
}

// Function to draw the snake
function drawSnake() {
  snake.forEach(drawSnakePart);
}

// Function to draw the food
function drawFood() {
  ctx.fillStyle = "#4CAF50";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  ctx.strokeStyle = "#fff";
  ctx.strokeRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Function to move the snake
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check if the snake ate the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood();
  } else {
    snake.pop();
  }
}

// Function to check for collisions
function checkCollisions() {
  const head = snake[0];
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    return true; // Collision with walls
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true; // Collision with itself
    }
  }
  return false;
}

// Function to draw the game
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake and food
  drawSnake();
  drawFood();

  // Move the snake
  moveSnake();

  // Check for collisions
  if (checkCollisions()) {
    clearInterval(gameInterval);
    alert(`Game over! Your score is ${score}.`);
    window.location.reload(); // Reload the page to start a new game
  }
}

// Function to handle keyboard input
function handleKeyDown(event) {
  const keyPressed = event.key;
  if (keyPressed === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -1;
  } else if (keyPressed === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = 1;
  } else if (keyPressed === "ArrowLeft" && dx === 0) {
    dx = -1;
    dy = 0;
  } else if (keyPressed === "ArrowRight" && dx === 0) {
    dx = 1;
    dy = 0;
  }
}

// Add event listener for keyboard input
document.addEventListener("keydown", handleKeyDown);

// Start the game loop
const gameInterval = setInterval(draw, 100);
