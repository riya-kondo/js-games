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
  bar = new Bar(block*COLS/2, block*(ROWS-3));
  ball = new Ball(100, block*(ROWS/2));
  let blockX;
  let blockY=0;
  for(let i=0; i<24; i++){
    if(i%6==0){
      blockX = block;
      blockY += block+10;
    }else{
      blockX += block+50;
    }
    b = new Block(blockX, blockY);
    blocks.push(b);
  }
}

function draw(){
  clear();
  background('#FFF');
  bar.update();
  ball.update();
  ball.move()
  for(let i=0; i<blocks.length; i++){
    if(ball.collision(blocks[i])){
      let centerx = ball.x;
      let centery = ball.y;
      if(centery > blocks[i].y && centery+ball.size < blocks[i].y + blocks[i].height){
        ball.changeDir(-1, 1);
      }else{
        ball.changeDir(1, -1);
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
    ball.changeDir(1, -1);
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

class Bar{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.width = block*4;
    this.height = block;
  }

  update(){
    fill('#000');
    rect(this.x, this.y, this.width, this.height);
  }
  move(movex){
    if(this.x+movex >= 0 && this.x+movex+this.width < block*COLS){
      this.x += movex
    }
  }
}

class Ball{
  constructor(x, y){
    this.x = x;
    this.xspeed = block/4;
    this.y = y;
    this.yspeed = block/4;
    this.size = block;
    this.startPosition = [this.x, this.y];
  }

  update(){
    this.startPosition = [this.x, this.y];
    fill('#F00');
    circle(this.x, this.y, this.size);
    line(0, this.y, width, this.y);
  }
  move(){
    this.x += this.xspeed;
    this.y += this.yspeed;
    if(this.x-this.size <= 0
      || this.x+this.size/2 >= width){
      this.changeDir(-1, 1);
    }else if(this.y-this.size/2 <= 0){
      this.changeDir(1, -1);
    }
  }

  collision(obj){
    let nextx = this.x+this.xspeed;
    let nexty = this.y+this.yspeed;
    if(nextx <= obj.x + obj.width
      && obj.x <= nextx
      && obj.y <= nexty
      && obj.y + obj.height >= nexty){
      let xpos = this.startPosition[0];
      let ypos = this.startPosition[1];
      return true;
    }else{
      return false;
    }
  }

  changeDir(x, y){
    this.xspeed *= x;
    this.yspeed *= y;
  }
}

class Block{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.width = block*2;
    this.height = block;
    this.color = '#000';
  }

  update(){
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}
