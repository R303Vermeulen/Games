size = 25;
backHexys = [];
snake = [];
snakeLength = 0;
direction = 0;
timer = 0;
startItUp = 0;
alive = 0;
foodX = -1;
foodY = -1;
foodProvidesLength = 5;
gameSpeed = 5;
coverUpHexX = -1;
coverUpHexY = -1;

function setup() {
  createCanvas(1400, 800);
  background(150, 150, 150);

  for (let i = 0; i < 2000; i++) {
    backrandX = random(-100, 1500);
    backrandY = random(-100, 900);
    while (backrandX > 250 && backrandX < 1150 && backrandY > 100 && backrandY < 700) {
      backrandX = random(-100, 1500);
      backrandY = random(-100, 900);
    }
    backrandS = random(3, 10);
    backranddy = random(0, 2 * PI);
    backrandR = random(0, 255);
    backrandG = random(0, 255);
    backrandB = random(0, 255);
    backrandT = random(100, 255);

    backHexys[i] = [backrandR, backrandG, backrandB, backrandT,
                    backrandX, backrandY, backrandS, backranddy];
  }
  backGroundHex();
  backdrop();


  snakerandX = 31;
  snakerandY = 31;
  snake[0] = [8, 20];
  snakeLength = 1;
  newFood();
  //noLoop();
}

function draw() {
   timer ++;
   if(timer == gameSpeed) {
      if(startItUp == 0) {
         noLoop();
      }
      else if(startItUp == 1) {
         moveSnake();
         checkCollisions();
      }
      else if(startItUp == 2) {
         noLoop();
      }
      drawThings(alive);
      timer = 0;
   }
}

function backdrop() {
  for (let i = 0; i < 3 * size; i++) {
    for (let j = 0; j < 2 * size + 1; j++) {
      if (i + j > size - 1 && i + j < 4 * size) {
        hexX = -165 + j * ((13 * 2) / 3) + i * ((13 * 4) / 3);
        hexY = 25 + j * 15;
        fill(255, 255, 255);
        push();
        hexy(hexX, hexY, 2, PI / 6);
        pop();
      }
    }
  }
}

function backGroundHex() {
   for (let i = 0; i < 2000; i++) {
      fill(backHexys[i][0], backHexys[i][1], backHexys[i][2], backHexys[i][3]);
      push();
      hexy(backHexys[i][4], backHexys[i][5], backHexys[i][6], backHexys[i][7]);
      pop();
   }
}

function moveSnake() {
   coverUpHexX = snake[snakeLength-1][0];
   coverUpHexY = snake[snakeLength-1][1];
   if(snakeLength > 1) {
      for(let i = snakeLength-1; i > 0; i --) {
         snake[i][0] = snake[i-1][0];
         snake[i][1] = snake[i-1][1];
      }
   }
   
   if(direction == 0) {
      snake[0][0] += 1;
   }
   if(direction == 1) {
      snake[0][1] += 1;
   }
   if(direction == 2) {
      snake[0][0] -= 1;
      snake[0][1] += 1;
   }
   if(direction == 3) {
      snake[0][0] -= 1;
   }
   if(direction == 4) {
      snake[0][1] -= 1;
   }
   if(direction == 5) {
      snake[0][0] += 1;
      snake[0][1] -= 1;
   }
}

function drawThings(alive) {
   if(alive == 1) {
      background(0,0,0);
      backdrop();
   }
   drawCoverUp();
   drawFood();
   drawSnake(alive);
   drawScore();
   if( alive == 1 ) {
      fill(200,0,0);
      textSize(100);
      text("YOU DIED", 450, 430 );
   }
}

function drawSnake(alive) {
   for(let i = 0; i < snakeLength; i++) {
      snakeX = -165 + snake[i][1] * ((13 * 2) / 3) + snake[i][0] * ((13 * 4) / 3);
      snakeY = 25 + snake[i][1] * 15;
      if(alive == 0) {
         fill(0, 255, 0);
         if(i == 0) {
            fill(0,0,255);
         }
      }
      if(alive == 1) {
         if(i == 0 || (snake[i][0] == snake[0][0] && snake[i][1] == snake[0][1]) ) {
            fill(255,0,0);
         }
         else {
            fill(0,0,0);
         }
      }
      push();
         noBorderHexy(snakeX, snakeY, 2, PI / 6);
      pop();
   }
}

function drawCoverUp() {
   coverUpHexRealX = -165 + coverUpHexY * ((13 * 2) / 3) + coverUpHexX * ((13 * 4) / 3);
   coverUpHexRealY = 25 + coverUpHexY * 15;
   fill(255, 255, 255);
   push();
      hexy(coverUpHexRealX, coverUpHexRealY, 2, PI / 6);
   pop();
}

function newFood() {
   validFood = 0;
   while (validFood != 1) {
      foodX = random(0,75);
      foodY = random(0,75);

      foodX = foodX - (foodX % 1);
      foodY = foodY - (foodY % 1);

      addedFoodVal = foodX + foodY;
      validFood = 1;
      if(foodX < 0) {
         validFood = 0;
      }
      else if(foodX > 74) {
         validFood = 0;
      }
      else if(foodY < 0) {
         validFood = 0;
      }
      else if(foodY > 50) {
         validFood = 0;
      }
      else if(addedFoodVal < 25) {
         validFood = 0;
      }
      else if(addedFoodVal > 99) {
         validFood = 0;
      }
      /*for(let i = 0; i < snakeLength; i++) {
         if(snake[i][0] == foodX && snake[i][1] == foodY) {
            validFood = 0;
         }
      }*/
   }
}


function drawFood() {
   foodCX = -165 + foodY * ((13 * 2) / 3) + foodX * ((13 * 4) / 3);
   foodCY = 25 + foodY * 15;

   fill(255,0,255);
   push();
      noBorderHexy(foodCX, foodCY, 2, PI / 6);
   pop();
}

function drawScore() {
   fill(255,255,255);
   rect(0,0, 100, 100);
   fill(0,0,0);
   textSize(20);
   text("SCORE", 12, 30);
   text(snakeLength, 25, 70);
}

function checkCollisions() {
   snakeX = snake[0][0];
   snakeY = snake[0][1];
   addedVal = snakeX + snakeY;
   if(snakeX < 0) {
      kill();
   }
   else if(snakeX > 74) {
      kill();
   }
   else if(snakeY < 0) {
      kill();
   }
   else if(snakeY > 50) {
      kill();
   }
   else if(addedVal < 25) {
      kill();
   }
   else if(addedVal > 99) {
      kill();
   }
   for(let i = 1; i < snakeLength; i++) {
      if(snake[i][0] == snakeX && snake[i][1] == snakeY) {
         kill();
      }
   }

   if(snakeX == foodX && snakeY == foodY) {
      eatFood();
   }
}

function kill() {
   startItUp = 2;
   alive = 1;
}

function eatFood () {
   for(let i = 0; i < foodProvidesLength; i ++) {
      snakeLength += 1;
      snake[snakeLength - 1] = [-1, -1];
   }
   newFood();
}

function hexy(a, b, c, d) {
  translate(a, b);
  scale(c);
  rotate(d);
  strokeWeight(0.05);

  fourPointThree = 4 + 1 / 3;

  beginShape(); //draws hexagon
  vertex(-2.5, -fourPointThree);
  vertex(2.5, -fourPointThree);
  vertex(5, 0);
  vertex(2.5, fourPointThree);
  vertex(-2.5, fourPointThree);
  vertex(-5, 0);
  endShape(CLOSE);
}

function noBorderHexy(a, b, c, d) {
   translate(a, b);
   scale(c);
   rotate(d);
   strokeWeight(0);
 
   fourPointThree = 4 + 1 / 3;
 
   beginShape(); //draws hexagon
   vertex(-2.5, -fourPointThree);
   vertex(2.5, -fourPointThree);
   vertex(5, 0);
   vertex(2.5, fourPointThree);
   vertex(-2.5, fourPointThree);
   vertex(-5, 0);
   endShape(CLOSE);
 }

function keyTyped() {
   if(key=='a') {
      direction -= 1;
      if(direction < 0) {
         direction += 6
      }
   }
   if(key == 'd') {
      direction += 1;
      if(direction > 5) {
         direction -= 6
      }
   }
   if(key == 's') {
      startItUp = 1;
      loop();
   }
   if(key == 'p') {
      snakeLength += 1;
      snake[snakeLength - 1] = [0, 25];
   }
}
