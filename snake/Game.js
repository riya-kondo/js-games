const width = 680;
const height = 680;
const size = 20;
var foods = new Array();
var alive = true;
var score = 0;

function setup(){
  createCanvas(width, height);
  frameRate(4);
  snake = new Snake();
  food = new Food();
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
      i--;
    }
  }
  if(foods.length>0){
    if(foods[0].lifeCount==0){
      foods.splice(0, 1);
    }
  }
  if(frameCount%25==0){
    let f = new Food();
    foods.push(f);
  }
  alive = snake.update();
  if(alive==false){
    gameover();
    noLoop();
  }
}

function mousePressed(){
  //snake.changeDir(mouseX, mouseY);
  let dir = snake.calcDir(mouseX, mouseY);
  snake.changeDir(dir);
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
  }
  snake.changeDir(dir);
  return false;
}

function gameover(){
  fill('#0F0');
  let textsize = 32;
  textAlign(CENTER);
  textSize(textsize);
  text('GAME OVER', width/2, height/2);
  text('SCORE: '+score, width/2, height/2+textsize);
}
