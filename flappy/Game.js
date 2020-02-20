const gravity = 1;
let height;
let width;
var life = 5;
var score = 0;
var walls = new Array();

function setup(){
  height = windowHeight;
  width = (windowWidth < height/2) ? windowWidth : height/2;
  createCanvas(width, height);
  bird = new Bird();
  scoreBoard = new Score();
  wall = new Wall();
  walls.push(wall);
}

function draw(){
  clear();
  background('#FFF');
  bird.update();
  for(let i=0; i<walls.length; i++){
    walls[i].update();
    if(walls[i].x < 0-walls[i].width){
      walls.splice(i, 1);
      i--;
    }else if(walls.slice(-1)[0].x < width/2-walls.slice(-1)[0].width){
      let wall = new Wall();
      walls.push(wall);
    }else if(walls[i].hit(bird)&&bird.hittable){
      bird.hittable = false;
      life--;
    }else if(walls[i].x+walls[i].width==bird.x&&bird.hittable){
      scoreBoard.score++;
    }
  }
  if(bird.hittable==false){
    if(frameCount%20==0){
      bird.hittable=true;
    }
  }
  if(life==0){
    scoreBoard.over();
    noLoop()
  }else{
    scoreBoard.update();
  }
}

function keyPressed(){
  if(key==' '){
    bird.fly(); 
  }
  return false;
}

function touchStarted(){
  bird.fly();
  return false;
}

