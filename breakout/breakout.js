const ROWS = 20;
const COLS = 15;

var block;
var width;
var height;
var size;
var currentPoint;
var blocks = new Array();

function setup(){
  block = int(windowHeight/ROWS);
  width = block*COLS;
  height = block*ROWS;
  currentPoint = width/2;
  createCanvas(width, height);
  bar = new Bar(block*COLS/2, block*(ROWS-3), 100, 20);
  ball = new Ball(100, block*(ROWS/2), 5);
  let blockX;
  let blockY=0;
  for(let i=0; i<24; i++){
    if(i%6==0){
      blockX = block;
      blockY += block+10;
    }else{
      blockX += block+50;
    }
    b = new Block(blockX, blockY, 30, 20);
    blocks.push(b);
  }
}

function draw(){
  clear();
  background('#FFF');
  bar.update();
  ball.move()
  ball.update();
  for(let i=0; i<blocks.length; i++){
    if(ball.collision(blocks[i])){
      let lastx = ball.lastx;
      let lasty = ball.lasty;
      if(lastx > blocks[i].x && lastx < blocks[i].x + blocks[i].width){
        ball.changeDir(1, -1);
      }else if(lasty > blocks[i].y && lasty < blocks[i].y + blocks[i].height){
        ball.changeDir(-1, 1);
      }else{
        ball.changeDir(-1, -1);
      }
      blocks.splice(i, 1);
      i--;
    }
    if(i>=0){
      blocks[i].update();
    }
  }
  if(keyIsPressed){
    if(keyCode==RIGHT_ARROW){
      bar.move(5);
    }else if(keyCode==LEFT_ARROW){
      bar.move(-5);
    }
  }
  if(ball.collision(bar)){
    let lasty = ball.lasty;
    if(lasty <= bar.y){
      let dirx = ((ball.x - (bar.x + bar.width/2))*ball.xspeed < 0) ? -1 : 1;
      ball.changeDir(dirx, -1);
    }else{
      ball.changeDir(-1, 1);
    }
  }

  if(ball.y-ball.size/2 > height){
    gamestop('GAMEOVER');
  }else if(blocks.length==0){
    gamestop('GAMECLEAR');
  }
}

function mouseMoved(){
  bar.move(mouseX-currentPoint);
  currentPoint = mouseX;
  return false;
}

function gamestop(string){
  fill('#0F0');
  textAlign(CENTER);
  text(string, width/2, height/2);
  noLoop();
}
