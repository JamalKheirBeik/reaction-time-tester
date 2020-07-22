// Select Elements
const game = document.getElementById("game");
const menu = document.getElementById("menu");
const score = document.getElementById("score");
const timer = document.getElementById("time");
const totalBallsSpawned = document.getElementById("totalBallsSpawned");
const ballContainer = document.getElementById("ball-container");
// game start
let generateBalls;
let countDown;
let totalBalls;
let reactionTime;
function startGame() {
  menu.style.display = "none";
  game.style.display = "block";
  // Init The Score
  let scoreValue = 0;
  score.innerHTML = scoreValue;
  // Init Number Of Generated Balls
  totalBalls = 0;
  // Init Reaction Time Result
  reactionTime = 0;
  // Init The Timer
  let timerSeconds = 30;
  let m = Math.floor(timerSeconds / 60);
  m < 10 ? (m = "0" + m) : m;
  let s = timerSeconds % 60;
  s < 10 ? (s = "0" + s) : s;
  timer.innerHTML = m + ":" + s;
  countDown = setInterval(function() {
    let minutesLeft = Math.floor(timerSeconds / 60);
    minutesLeft < 10 ? (minutesLeft = "0" + minutesLeft) : minutesLeft;
    let secondsLeft = timerSeconds % 60;
    secondsLeft < 10 ? (secondsLeft = "0" + secondsLeft) : secondsLeft;
    timer.innerHTML = minutesLeft + ":" + secondsLeft;
    timerSeconds--;
    if (timerSeconds < 0) {
      endGame();
    }
  }, 1000);
  generateBalls = setInterval(function() {
    // Generate Balls At Random Spots
    let x = Math.floor(
      Math.random() * ballContainer.clientWidth +
        Math.floor((window.innerWidth - ballContainer.clientWidth) / 2)
    );
    let y = Math.floor(
      Math.random() * ballContainer.clientHeight +
        Math.floor((window.innerHeight - ballContainer.clientHeight) / 2)
    );
    let ball = document.createElement("div");
    ball.innerHTML = `<div class="ball" style="left: ${x}px;top: ${y}px;"></div>`;
    ballContainer.appendChild(ball);
    totalBalls++;
    let spawnTime = new Date();
    let spawnTimeMilliSeconds = spawnTime.getTime();
    console.log("spawned at: " + spawnTimeMilliSeconds);
    totalBallsSpawned.innerHTML = totalBalls;
    console.log("number of balls spawned: " + totalBalls);
    // Add Event Listener For The Balls To Detect Clicking
    ball.addEventListener("click", () => {
      let clickTime = new Date();
      let clickTimeMilliSeconds = clickTime.getTime();
      console.log("clicked at: " + clickTimeMilliSeconds);
      reactionTime += (clickTimeMilliSeconds - spawnTimeMilliSeconds) / 1000;
      ball.remove();
      scoreValue++;
      score.innerHTML = scoreValue;
    });
    // Add Event Listener To The Balls To Delete Them When The Animation Is Over
    ball.addEventListener("animationend", () => {
      let notClickedTime = new Date();
      let notClickedTimeMilliSeconds = notClickedTime.getTime();
      reactionTime +=
        (notClickedTimeMilliSeconds - spawnTimeMilliSeconds) / 1000;
      ball.remove();
      scoreValue--;
      score.innerHTML = scoreValue;
    });
    if (scoreValue < 0) {
      endGame();
    }
  }, 500);
}
// Game End
function endGame() {
  clearInterval(generateBalls);
  clearInterval(countDown);
  // Calculate The Result
  let reactionTimeResult = reactionTime / totalBalls;
  let fixedReactionTime = reactionTimeResult.toFixed(2);
  let result = document.createElement("div");
  result.innerHTML = `<div class="result">Your Average Reaction Time Is: <span style="color: #fc5185;">${fixedReactionTime}sec</span></div>`;
  ballContainer.innerHTML = result.innerHTML;
}
// Back To Menu Function
function backToMenu() {
  clearInterval(generateBalls);
  clearInterval(countDown);
  ballContainer.innerHTML = "";
  score.innerHTML = "";
  timer.innerHTML = "";
  menu.style.display = "flex";
  game.style.display = "none";
}
