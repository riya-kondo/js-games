const gravity = 1;
const height = 780;
const width = 480;
var life = 5;
var score = 0;
var walls = new Array();

function setup(){
  createCanvas(width, height);
  bird = new Bird();
  scoreBoard = new Score();
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
    }else if(walls[i].hit(bird)&&bird.hittable){
      bird.hittable = false;
      life--;
    }else if(walls[i].x+walls[i].width==bird.x&&bird.hittable){
      scoreBoard.score++;
    }
  }
  if(bird.hittable==false){
    if(frameCount%20==0){
      bird.hittable=true;
    }
  }
  if(life==0){
    scoreBoard.over();
    noLoop()
  }else{
    scoreBoard.update();
  }
}

function keyPressed(){
  if(key==' '){
    bird.fly(); 
  }
  return false;
}

function touchStarted(){
  bird.fly();
  return false;
}

class Bird {
  constructor(){
    this.x = 100;
    this.y = height/2;
    this.yspeed = 1;
    this.size = 50;
    this.hittable = true;
    this.life = life;
  }

  update(){
    if(this.y+this.yspeed < height-this.size/2){
      this.y += this.yspeed;
      this.yspeed += gravity;
    }else{
      this.y = height-this.size/2;
      this.yspeed = 1;
    }
    if(this.hittable){
      fill('#FFF');
    }else{
      fill('#F00');
    }
    circle(this.x, this.y, this.size);
  }

  fly(){
    this.yspeed = -10;
    this.y += this.yspeed;
  }
}

class Wall {
  constructor(){
    this.x = width;
    this.xspeed = -2;
    this.y = random(height/5, height-200)
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
    if(b.x > this.x && b.x < this.x+this.width){
      if(b.y < this.y || b.y > this.y+this.range){
        return true;
      }
    }
    return false;
  }
}

class Score {
  constructor(){
    this.score = score;
    this.lifeText = '❤︎';
    this.x = width/2;
    this.y = height/4;
    this.size = 32;
  }

  update(){
    textSize(this.size);
    textAlign(CENTER);
    fill('#0F0');
    text('score: '+this.score, this.x, this.y);
    text(this.lifeText.repeat(life), this.x, this.y+this.size);
  }

  over(){
    textSize(this.size);
    textAlign(CENTER);
    fill('#0F0');
    text('gameover', this.x, this.y);
    text('your final score: '+this.score, this.x, this.y+this.size);
  }
}
