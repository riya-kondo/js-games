const width = 380;
const height = 680;
const size = 40;
const gravity = 1;

function setup(){
  createCanvas(width, height);
  hopper = new Hopper();
}

function draw(){
  clear();
  background('#FFF');
  if (keyIsDown(RIGHT_ARROW)) {
    hopper.move(3); 
  } else if (keyIsDown(LEFT_ARROW)) {
    hopper.move(-3);
  }
  hopper.switchSpeed();
  hopper.update();
}

class Hopper{
  constructor(){
    this.x = width/2;
    this.y = height-size/2;
    this.size = size;
    this.yspeed = 0;
  }

  update(){
    fill('#000');
    this.y += this.yspeed;
    this.yspeed += gravity;
    circle(this.x, this.y, this.size);
  }

  switchSpeed(){
    if(this.y >= height-size/2){
      this.yspeed = -20;
    }
  }

  move(xmove){
    this.x += xmove;
    if(this.x-this.size/2 > width){
      this.x = 0;
    }else if(this.x+this.size/2 < 0){
      this.x = width;
    }
  }
}
