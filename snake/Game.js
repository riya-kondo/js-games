const width = 680;
const height = 680;
var foods = new Array();
var alive = true;
var score = 0;
var framerate = 4;

function setup(){
  createCanvas(width, height);
  frameRate(framerate);
  snake = new Snake(width, height, 20);
  food = new Food(width, height, 20);
  foods.push(food);
}

function draw(){
  clear();
  background('#FFF');
  for(let i=0; i<foods.length; i++){
    foods[i].update();
    if(foods[i].eaten(snake)){
      foods.splice(i, 1);
      snake.ate();
      score++;
      framerate = framerate+2;
      frameRate(framerate);
      i--;
    }
  }
  if(foods.length>0){
    if(foods[0].lifeCount==0){
      foods.splice(0, 1);
    }
  }
  if(frameCount%25==0){
    let f = new Food(width, height, 20);
    foods.push(f);
  }
  alive = snake.update();
  if(alive==false){
    gameover();
    noLoop();
  }
}

function mousePressed(){
  if(alive){
    let dir = snake.calcDir(mouseX, mouseY);
    snake.changeDir(dir);
  }else{
    resetGame();
  }
  return false;
}

function keyPressed(){
  let dir = new String();
  if(keyCode==UP_ARROW){
    dir = 'up';
  }else if(keyCode==DOWN_ARROW){
    dir = 'down';
  }else if(keyCode==RIGHT_ARROW){
    dir = 'right';
  }else if(keyCode==LEFT_ARROW){
    dir = 'left';
  }else if(keyCode==ENTER&&alive==false){
    resetGame();
  }
  snake.changeDir(dir);
  return false;
}

function resetGame(){
  foods = new Array();
  alive = true;
  score = 0;
  framerate = 4;
  setup();
  loop();
}

function gameover(){
  fill('#0F0');
  let textsize = 32;
  textAlign(CENTER);
  textSize(textsize);
  text('GAME OVER', width/2, height/2);
  text('SCORE: '+score, width/2, height/2+textsize);
  text('PRESS ENTER OR CLICK TO RESET GAME', width/2, height/2+textsize*2);
}
