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
    this.xspeed = block/5;
    this.y = y;
    this.yspeed = block/5;
    this.size = block;
    this.lastx = x;
    this.lasty = y; 
  }

  update(){
    fill('#F00');
    circle(this.x, this.y, this.size);
  }
  move(){
    this.lastx = this.x
    this.lasty = this.y
    this.x += this.xspeed;
    this.y += this.yspeed;
    //壁の当たり判定
    if(this.x-this.size/2 <= 0
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
