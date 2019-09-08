var width;
var height;
var currentPoint;
var blocks = new Array();

function setup(){
  width = windowWidth;
  height = windowHeight;
  currentPoint = width/2;
  createCanvas(width, height);
  bar = new Bar();
  ball = new Ball();
  let initX = width/3;
  let blockX = initX;
  let blockY = height/4;
  for(let i=0; i<24; i++){
    b = new Block(blockX, blockY);
    blocks.push(b);
    if(i%6==0){
      blockX = initX;
      blockY += 50;
    }else{
      blockX += 110;
    }
  }
}

function draw(){
  clear();
  background('#FFF');
  bar.update();
  ball.update();
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
}

function mouseMoved(){
  bar.move(mouseX-currentPoint);
  currentPoint = mouseX;
  return false;
}

class Bar{
  constructor(){
    this.x = width/2;
    this.y = height/5*4
    this.width = 300;
    this.height = 20;
  }

  update(){
    fill('#000');
    rect(this.x, this.y, this.width, 20);
  }
  move(movex){
    if(this.x+movex >= 0 && this.x+movex+this.width < windowWidth){
      this.x += movex
    }
  }
}

class Ball{
  constructor(){
    this.x = width/2;
    this.xspeed = -3;
    this.y = height/2;
    this.yspeed = 3;
    this.size = 20;
  }

  update(){
    fill('#F00');
    this.x += this.xspeed;
    this.y += this.yspeed;
    circle(this.x, this.y, this.size);
    if(this.x-this.size <= 0
      || this.x+this.size >= width){
      this.changeDir(-1, 1);
    }else if(this.y-this.size <= 0){
      this.changeDir(1, -1);
    }
  }

  collision(obj){
    if(obj.x + obj.width > this.x
      && obj.x < this.x
      && obj.y < this.y
      && obj.y + obj.height > this.y){
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
    this.width = 100;
    this.height = 30; 
    this.color = '#000';
  }

  update(){
    fill(this.color);
    
  }
}
