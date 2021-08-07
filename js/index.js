let inputdir = { x: 0, y: 0 };
const foodsound = new Audio("eat.wav");
const movesound = new Audio("Move sound.wav");
let speed = 16;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 3, y: 5 };
function main(ctime) {
  window.requestAnimationFrame(main);
  //console.log(ctime);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide(snake) {
  // for snake bumping in itself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  //for snake bumping in wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  )
    return true;

  return false;
}
function gameEngine() {
  //updating snake arr
  if (isCollide(snakeArr)) {
    //gamesound.pause();
    inputdir = { x: 0, y: 0 };
    alert("Game Over!! Press any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    //gamesound.play();
    score = 0;
  }
  //matching the food and appending the snake
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    score += 1;
    foodsound.play();
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "High Score: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;

    snakeArr.unshift({
      x: snakeArr[0].x + inputdir.x,
      y: snakeArr[0].y + inputdir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  //moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    //const element = snakeArr[i];
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputdir.x;
  snakeArr[0].y += inputdir.y;
  //display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //display food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Main Logic
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputdir = { x: 0, y: 1 };
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputdir.x = 0;
      inputdir.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputdir.x = 0;
      inputdir.y = 1;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputdir.x = 1;
      inputdir.y = 0;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputdir.x = -1;
      inputdir.y = 0;
      break;
  }
});
