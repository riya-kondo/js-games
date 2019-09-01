const gravity = 1;
const height = 780;
const width = 480;

function setup(){
  createCanvas(width, height);
  bird = new Bird();
}

function draw(){
  clear();
  background('#FFF');
  bird.update();
}

function keyPressed(){
  if(key==' '){
    bird.fly(); 
  }
  return false;
}

class Bird {
  constructor(){
    this.x = 100;
    this.y = height/2;
    this.yspeed = 1;
    this.size = 50;
  }

  update(){
    if(this.y+this.yspeed < height-this.size/2){
      this.y += this.yspeed;
      this.yspeed += gravity;
    }else{
      this.y = height-this.size/2;
      this.yspeed = 1;
    }
    fill('#FFF');
    circle(this.x, this.y, this.size);
  }

  fly(){
    this.yspeed = -10;
    this.y += this.yspeed;
    console.log(this.y);
  }
}
