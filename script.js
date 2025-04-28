const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const dropButton = document.getElementById('dropButton');
const massInput = document.getElementById('mass');

let ball = {
  x: canvas.width / 2,
  y: 50,
  radius: 20,
  vy: 0,
  mass: 1,
  gravity: 9.81,
  bounce: 0.7,
  isDropping: false
};

function drawBall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'dodgerblue';
  ctx.fill();
  ctx.closePath();
}

function updateBall() {
  if (ball.isDropping) {
    ball.vy += ball.gravity * ball.mass * 0.02;
    ball.y += ball.vy;

    if (ball.y + ball.radius > canvas.height) {
      ball.y = canvas.height - ball.radius;
      ball.vy *= -ball.bounce;

      if (Math.abs(ball.vy) < 0.5) {
        ball.vy = 0;
        ball.isDropping = false;
      }
    }
  }
}

function animate() {
  drawBall();
  updateBall();
  requestAnimationFrame(animate);
}

animate();

dropButton.addEventListener('click', () => {
  ball.mass = parseFloat(massInput.value);
  ball.vy = 0;
  ball.y = 50;
  ball.isDropping = true;
});
