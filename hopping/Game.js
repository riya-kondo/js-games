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
