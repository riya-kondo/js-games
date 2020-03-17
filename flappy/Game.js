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
      // 配列から壁を削除
      walls.splice(i, 1);
      i--;
    }else if(walls.slice(-1)[0].x < width/2-walls.slice(-1)[0].width){
      // 配列に壁を追加
      let wall = new Wall(width, random(height/5, height-200), height);
      walls.push(wall);
    }
  }
  if(bird.hittable==false){
    // 壁にぶつかった時は一定の無敵時間を作る
    if(frameCount%40==0){
      bird.hittable=true;
    }
  }
  if(life==0){
    // ゲーム終了
    scoreBoard.over();
    noLoop()
  }else{
    // 得点表示盤の更新
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

