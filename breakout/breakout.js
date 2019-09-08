var width;
var height;
var currentPoint;

function setup(){
  width = windowWidth;
  height = windowHeight;
  currentPoint = width/2;
  createCanvas(width, height);
  bar = new Bar();
  ball = new Ball();
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
    this.size = 50;
  }

  update(){
    fill('#000');
    rect(this.x, this.y, this.size, 20);
  }
  move(movex){
    if(this.x+movex >= 0 && this.x+movex+this.size < windowWidth){
      this.x += movex
    }
  }
}

class Ball{
  constructor(){
    this.x = width/2;
    this.y = height/2;
    this.size = 20;
  }

  update(){
    fill('#F00');
    circle(this.x, this.y, this.size);
  }
}
