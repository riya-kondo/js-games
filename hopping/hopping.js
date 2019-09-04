const width = 380;
const height = 680;
const size = 40;
const gravity = 1;
var bars = new Array();
var ground = height;
var score = 0;

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
        if (score>hopper.size){
          ground = height+1000;
        }else{
          ground = height;
        }
      }
    }
    bars[i].update();
  }
  if(score>height/2){
    //画面が登る速度は以下の式により決定する。
    // y = (1/2) * root(target-x); [y: speed, x:current ground]
    if(ground < (height/4)*3+hopper.size){
      let lift =1/2 * Math.sqrt(((height/4)*3+hopper.size - ground));
      moveFrame(lift);
    }
  }else{
    if(ground < (height/2)+hopper.size){
      let lift =1/3 * Math.sqrt(((height/2)+hopper.size - ground));
      moveFrame(lift);
    }
  }
  hopper.update();

  //score表示
  fill('#0F0');
  let textsize = 32;
  textSize(textsize);
  if(hopper.y>height){
    textAlign(CENTER)
    text('GAMEOVER', width/2, height/3);
    text('SCORE: '+score, width/2, height/3+textsize);
  }else{
    textAlign(RIGHT)
    text('SCORE: '+score, width, textsize);
  }
}

function moveFrame(lift){
  for(let i=0; i<bars.length; i++){
    bars[i].y += lift;
    score += 1;
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
    if(hp.x-hp.size/2 <= this.x + this.width
      && hp.x+hp.size/2 >= this.x
      && hp.y+hp.size/2 <= this.y){
      return true;
    }
    return false;
  }
}
