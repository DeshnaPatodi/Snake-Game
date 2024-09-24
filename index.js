// game constants and variables

// 1. directions
let inputDir = { x: 0, y: 0 };
// 2.audio
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let hiscoreval = 0;

//game functions

function main(ctime) {
  window.requestAnimationFrame(main);
  console.log(ctime);
  //to control fps
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide(sarr) {
  //if bump in itself
  for(let i=1;i<snakeArr.length;i++){
    //head body ke koi part se takara gaya
    if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
        return true;
    }
}
//if bump into wall
    if(sarr[0].x>=18 ||sarr[0].x<=0 ||sarr[0].y>=18 ||sarr[0].y<=0){
        return true;
    }
  
return false;
  
}
function gameEngine() {
  //part1: updating the snakle variable/snake array and food

  //apn snake ko ek array banayenge
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("GAME OVER! Press any key to play again.");
    snakeArr = [{ x: 13, y: 15 }];
      score = 0;
   musicSound.play();
   
  }
  //if fodd eaten then increment the score and regenrate the food
  //food and head collide ho jaye tab food kha liya
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score; // Update hiscoreval
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval)); // Store the new high score
      hiscoreBox.innerHTML = "High Score: " + hiscoreval; // Update high score display
    }
    scoreBox.innerHTML = "Score: " + score; // Update current score display
    
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    //generate new
    let a = 2;
    let b = 16; //for safer side taki khana hamesha bich me rahe
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    //round to round off the number
    // random gives any random number between 0-1
    // so we are gnerating food at random between a and b
  }

  //moving the snake
  for (let i = snakeArr.length - 2; i>=0; i--) {
    //i ko length-2 kyoki last second pos se start kiya hai
    snakeArr[i + 1] = { ...snakeArr[i] };
    //new obj bana padega as refrencing problem ayegi
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //part2 : display the snake and food
  //board ko khali karlo
  board.innerHTML = "";

  //display the snake
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    //row y me hoga and col x se
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  //row y me hoga and col x se
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic starts here
//  let hiscore= localStorage.getItem("hiscore");
//  if(hiscore===null){
//     hiscoreval=0;
//      localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
//  }
//  else{
//     hiscoreval= JSON.parse(hiscore);
//     hiscoreBox.innerHTML = "hiscore:"+hiscoreval;
//  }
// Selecting the hiscoreBox element
let hiscoreBox = document.getElementById('hiscoreBox');

// Update the hiscoreBox with the high score value
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscoreval;
}

//game loop banana padega so that baar baar paint hote rahe
//we dont use set-interval becox yaha pe animation bhi hai
//to we use requestAnimationFrame()
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;

      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
