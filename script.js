const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleHeight = 100;
const paddleWidth = 10;
const paddleSpeed = 5;
const ballSize = 10;

let playerY = (canvas.height - paddleHeight) / 2;
let computerY = (canvas.height - paddleHeight) / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 2;

let playerScore = 0;
let computerScore = 0;

function draw() {
  // Clear canvas
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  ctx.fillStyle = "#fff";
  ctx.fillRect(20, playerY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - 20 - paddleWidth, computerY, paddleWidth, paddleHeight);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();

  // Draw scores
  ctx.font = "20px Arial";
  ctx.fillText(playerScore, canvas.width / 4, 50);
  ctx.fillText(computerScore, (canvas.width * 3) / 4, 50);
}

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY < 0 || ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX < 0) {
    computerScore++;
    resetBall();
  }

  if (ballX > canvas.width) {
    playerScore++;
    resetBall();
  }

  if (playerScore === 10 || computerScore === 10) {
    alert(playerScore === 10 ? "Player wins!" : "Computer wins!");
    playerScore = 0;
    computerScore = 0;
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function movePlayer(e) {
  const mouseY = e.clientY - canvas.getBoundingClientRect().top;
  if (mouseY > paddleHeight / 2 && mouseY < canvas.height - paddleHeight / 2) {
    playerY = mouseY - paddleHeight / 2;
  }
}

function moveComputer() {
  const targetY = ballY - (paddleHeight - ballSize) / 2;
  if (targetY > computerY + paddleSpeed) {
    computerY += paddleSpeed;
  } else if (targetY < computerY - paddleSpeed) {
    computerY -= paddleSpeed;
  }
}

function checkCollision() {
  if (
    (ballX - ballSize / 2 <= 20 + paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) ||
    (ballX + ballSize / 2 >= canvas.width - 20 - paddleWidth && ballY > computerY && ballY < computerY + paddleHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  }
}

function gameLoop() {
  draw();
  moveBall();
  moveComputer();
  checkCollision();
}

canvas.addEventListener("mousemove", movePlayer);
setInterval(gameLoop, 1000 / 60);
