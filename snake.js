// Snake Game Code

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{x: 200, y: 200}];
let snakeDirection = "RIGHT";
let food = {};

const snakeSize = 20;
const canvasSize = 400;
const directions = {
  "UP": {x: 0, y: -snakeSize},
  "DOWN": {x: 0, y: snakeSize},
  "LEFT": {x: -snakeSize, y: 0},
  "RIGHT": {x: snakeSize, y: 0}
};

// Function to start/reset the game immediately
function resetGame() {
  snake = [{x: 200, y: 200}];  // Reset snake position
  snakeDirection = "RIGHT";  // Reset snake direction
  generateFood();  // Generate new food

  // Ensure password reset and re-entry after game over
  if (typeof resetGameOnLoss === "function") {
    resetGameOnLoss();
  }
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  moveSnake();
  checkCollisions();
  drawSnake();
  drawFood();
  
  setTimeout(gameLoop, 50);
}

// Function to move snake
function moveSnake() {
  const head = { ...snake[0] };
  head.x += directions[snakeDirection].x;
  head.y += directions[snakeDirection].y;
  snake.unshift(head);
  
  if (head.x === food.x && head.y === food.y) {
    generateFood(); // Generate new food
  } else {
    snake.pop();
  }
}

// Function to check for collisions and restart immediately
function checkCollisions() {
  const head = snake[0];
  if (
    head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize ||
    snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
  ) {
    resetGame(); // Instantly restart game on collision
  }
}

// Draw snake on canvas
function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
  });
}

// Generate food at random position
function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvasSize / snakeSize)) * snakeSize,
    y: Math.floor(Math.random() * (canvasSize / snakeSize)) * snakeSize
  };
}

// Draw food on canvas
function drawFood() {
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && snakeDirection !== "DOWN") snakeDirection = "UP";
  if (e.key === "ArrowDown" && snakeDirection !== "UP") snakeDirection = "DOWN";
  if (e.key === "ArrowLeft" && snakeDirection !== "RIGHT") snakeDirection = "LEFT";
  if (e.key === "ArrowRight" && snakeDirection !== "LEFT") snakeDirection = "RIGHT";
});

resetGame(); // Ensure game starts properly
gameLoop();
