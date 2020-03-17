const ROWS = 20;
const COLS = 15;

let block;
let width;
let height;
let currentBarPoint;

let ballSize = 30;

let margin = 10;
let blockWidth;
let blockHeight;
let numBlocks;
let blocks = new Array();

function setup(){
  height = windowHeight;
  width = (windowWidth < height/2) ? windowWidth : height/2;
  currentBarPoint = width/2;
  createCanvas(width, height);
  bar = new Bar(width/5, height-100, 100, 20);
  ball = new Ball(100, height/2, ballSize, 5);

  blockHeight = ((height/4)-(margin*7)) / 6;
  blockWidth = (width-(margin*5)) / 4;
  let blockMarginX=margin;
  let blockMarginY=-blockHeight;
  for(let i=0; i<24; i++){
    if(i%4==0){
      blockMarginX = margin;
      blockMarginY += blockHeight + margin;
    }else{
      blockMarginX += blockWidth + margin;
    }
    b = new Block(blockMarginX, blockMarginY, blockWidth, blockHeight);
    blocks.push(b);
  }
}

function draw(){
  clear();
  background('#FFF');
  bar.update();
  ball.move()
  ball.update();
  for(let i=0; i<blocks.length; i++){
    if(ball.collision(blocks[i])){
      let lastx = ball.lastx;
      let lasty = ball.lasty;
      if(lastx > blocks[i].x && lastx < blocks[i].x + blocks[i].width){
        ball.changeDir(1, -1);
      }else if(lasty > blocks[i].y && lasty < blocks[i].y + blocks[i].height){
        ball.changeDir(-1, 1);
      }else{
        ball.changeDir(-1, -1);
      }
      blocks.splice(i, 1);
      i--;
    }
    if(i>=0){
      blocks[i].update();
    }
  }
  if(keyIsPressed){
    if(keyCode==RIGHT_ARROW){
      bar.move(5);
    }else if(keyCode==LEFT_ARROW){
      bar.move(-5);
    }
  }
  if(ball.collision(bar)){
    let lasty = ball.lasty;
    if(lasty <= bar.y){
      let dirx = ((ball.x - (bar.x + bar.width/2))*ball.xspeed < 0) ? -1 : 1;
      ball.changeDir(dirx, -1);
    }else{
      ball.changeDir(-1, 1);
    }
  }

  //壁の当たり判定
  if(ball.x-ball.size/2 <= 0
    || ball.x+ball.size/2 >= width){
    ball.changeDir(-1, 1);
  }else if(ball.y-ball.size/2 <= 0){
    ball.changeDir(1, -1);
  }

  if(ball.y-ball.size/2 > height){
    gamestop('GAMEOVER');
  }else if(blocks.length==0){
    gamestop('GAMECLEAR');
  }
}

function mouseMoved(){
  let moveLength = mouseX - currentBarPoint;
  if(bar.x+moveLength >= 0 && bar.x+bar.width+moveLength < width){
    bar.move(mouseX-currentBarPoint);
  }
  currentBarPoint = mouseX;
  return false;
}

function keyPressed(){
  if(key==' '){
    gamestop('PAUSE')
  }
}

function gamestop(string){
  fill('#0F0');
  textAlign(CENTER);
  text(string, width/2, height/2);
  noLoop();
}
