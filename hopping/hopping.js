const width = 380;
const height = 680;
const size = 40;
const gravity = 1;
var bars = new Array();

function setup(){
  createCanvas(width, height);
  hopper = new Hopper();
  let range = height/4;
  for(let i=0; i<4; i++){
    bar = new Bar(height-(range+range*i));
    bars.push(bar);
  }
}

function draw(){
  clear();
  background('#FFF');
  if (keyIsDown(RIGHT_ARROW)) {
    hopper.move(3); 
  } else if (keyIsDown(LEFT_ARROW)) {
    hopper.move(-3);
  }
  for(let i=0; i<bars.length; i++){
    bars[i].update();
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

class Bar{
  constructor(y=0){
    this.width = random(size*2, size*4);
    this.x = random(0, width-this.width);
    this.y = y;
    this.yspeed = 0;
    this.height = 20;
  }

  update(){
    fill('#000');
    this.y += this.yspeed;
    rect(this.x, this.y, this.width, this.height, 10, 10, 10, 10)
  }
}
