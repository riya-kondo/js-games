const width = 380;
const height = 680;
const size = 40;
const gravity = 1;
var bars = new Array();
var ground = height;

function setup(){
  createCanvas(width, height);
  hopper = new Hopper();
  let range = height/4;
  for(let i=0; i<4; i++){
    bar = new Bar(range*i);
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
  var groundCount = 0;
  for(let i=0; i<bars.length; i++){
    if(bars[i].hit(hopper)){
      if(bars[i].y < ground){
        ground = bars[i].y
        groundCount++;
      }
    }else{
      if(groundCount==0){
        ground = height;
      }
    }
    bars[i].update();
  }
  if(ground < height/2){
    moveFrame();
  }
  hopper.update();
}

function moveFrame(){
  for(let i=0; i<bars.length; i++){
    bars[i].y += 1;
    if(bars[i].y > height){
      bars.splice(i, 1);
      i--;
      let bar = new Bar(-20);
      bars.push(bar);
    }
  }
  hopper.y += 1;
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
    //次に移動したら下に地面がある場合は移動方向を反転
    if(this.y+this.size/2+this.yspeed >= ground){
      this.yspeed = -20;
    }
    circle(this.x, this.y, this.size);
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
    //rect(this.x, this.y, this.width, this.height, 10, 10, 10, 10)
    rect(this.x, this.y, this.width, this.height)
  }

  hit(hp){
    if(hp.x <= this.x + this.width
      && hp.x >= this.x
      && hp.y+hp.size/2 <= this.y){
      return true;
    }
    return false;
  }
}
