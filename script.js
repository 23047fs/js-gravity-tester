const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const graphCanvas = document.getElementById('graph');
const graphCtx = graphCanvas.getContext('2d');

let ball = {
  x: 200,
  y: 50,
  radius: 20,
  color: '#1e90ff',
  vy: 0
};

let gravity = 9.81;
let bounce = 0.7;
let animation;
let heights = [];

function setGravity(g) {
  gravity = g;
}

function dropBall() {
  ball.y = 50;
  ball.vy = 0;
  ball.color = document.getElementById('color').value;
  bounce = parseFloat(document.getElementById('bounce').value);
  heights = [];
  cancelAnimationFrame(animation);
  animate();
}

function resetSim() {
  cancelAnimationFrame(animation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  showGraph();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball.vy += gravity * 0.1;
  ball.y += ball.vy;

  if (ball.y + ball.radius > canvas.height) {
    ball.y = canvas.height - ball.radius;
    ball.vy *= -bounce;
    heights.push(canvas.height - ball.y);
  }

  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();

  animation = requestAnimationFrame(animate);
}

function showGraph() {
  graphCanvas.style.display = 'block';
  graphCtx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);

  graphCtx.beginPath();
  graphCtx.moveTo(0, graphCanvas.height);

  for (let i = 0; i < heights.length; i++) {
    let x = (i / heights.length) * graphCanvas.width;
    let y = graphCanvas.height - heights[i] * 2;
    graphCtx.lineTo(x, y);
  }

  graphCtx.strokeStyle = 'blue';
  graphCtx.stroke();
  graphCtx.closePath();

  graphCtx.fillText("Bounce Heights Over Time", 10, 20);
}
