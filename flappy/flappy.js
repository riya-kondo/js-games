const gravity = 1;
const height = 780;
const width = 480;
var walls = new Array();

function setup(){
  createCanvas(width, height);
  bird = new Bird();
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
    }else if(walls[i].hit(bird)){
      console.log('hit');
    }
  }
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

class Wall {
  constructor(){
    this.x = width;
    this.xspeed = -2;
    this.y = random(height/4, (height/4)*3)
    this.range = 200;
    this.width = 20;
  }

  update(){
    this.x += this.xspeed;
    fill('#000');
    rect(this.x, 0, this.width, this.y, 0, 0, 5, 5);
    rect(this.x, this.y+this.range, this.width, height-(this.y+this.range), 5, 5, 0, 0);
  }

  hit(b){
    return false;
  }

}
