let height;
let width;
let life = 5;
let walls = new Array();

function setup(){
  height = windowHeight;
  width = (windowWidth < height/2) ? windowWidth : height/2;
  width = (width%2 == 0) ? width : width + 1;
  createCanvas(width, height);
  bird = new Bird();
  scoreBoard = new Score(width/2, height/4);
  wall = new Wall(width, random(height/5, height-200), height);
  walls.push(wall);
}

function draw(){
  clear();
  background('#FFF');
  bird.update(height);
  for(let i=0; i<walls.length; i++){
    walls[i].update();
    if(walls[i].hit(bird)&&bird.hittable){
      // ヒット処理
      bird.hittable = false;
      life--;
    }else if(walls[i].x==bird.x&&bird.hittable){
      // スコア加算
      scoreBoard.addScore();
      console.log('Beyond');
    }
    if(walls[i].x < 0-walls[i].width){
      walls.splice(i, 1);
      i--;
    }else if(walls.slice(-1)[0].x < width/2-walls.slice(-1)[0].width){
      let wall = new Wall(width, random(height/5, height-200), height);
      walls.push(wall);
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
    scoreBoard.update(life);
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

