// Define HTMl elements
const boadr = document.getElementById("game-board");

//Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameInterval;

//Draw game map, snake, food
function draw() {
  boadr.innerHTML = "";
  drawSnake();
  drawFood();
}

//Draw snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    boadr.appendChild(snakeElement);
  });
}
//Create a snake or food cube/div
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}
// Set the position of snake or food
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}
// Testing draw function
draw();

// Draw food function
function drawFood() {
  const foodElement = createGameElement("div", "food");
  setPosition(foodElement, food);
  boadr.appendChild(foodElement);
}

// Generate food
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}
// Moving the snake
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
  snake.unshift(head);
  //   snake.pop();

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    clearInterval(); //Clear past interval
    gameInterval = setInterval(() => {
      move();
      draw();
    }, gameSpeedDelay);
  }
}

// // Test moving
// setInterval(() => {
//   move(); //Move first
//   draw(); //Then draw again new position
// }, 200);
