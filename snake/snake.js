const width = 680;
const height = 680;
const size = 20;
var foods = new Array();

function setup(){
  createCanvas(width, height);
  frameRate(4);
  snake = new Snake();
  food = new Food();
  foods.push(food);
}

function draw(){
  clear();
  background('#FFF');
  for(let i=0; i<foods.length; i++){
    foods[i].update();
    if(foods[i].eaten(snake)){
      foods.splice(i, 1);
      snake.ate();
      i--;
    }
  }
  if(foods[0].lifeCount==0){
    foods.splice(0, 1);
  }
  if(frameCount%25==0){
    let f = new Food();
    foods.push(f);
  }
  snake.update();
}

function mousePressed(){
  snake.changeDir(mouseX, mouseY);
  return false;
}

class Snake{
  constructor(){
    this.x = width/2;
    this.xspeed = 0;
    this.y = height/2;
    this.yspeed = 0;
    this.length = 1;
    this.size = size;
    this.places = [[width/2, height/2]];
    this.last_x = width/2;
    this.last_y = height/2;
  }

  update(){
    fill('#000');
    let pre_posx = this.places[0][0];
    let pre_posy = this.places[0][1];
    this.places[0][0] += this.xspeed;
    this.places[0][1] += this.yspeed;
    rect(this.places[0][0], this.places[0][1], this.size, this.size);
    for(let i=1; i<this.length; i++){
      rect(pre_posx, pre_posy, this.size, this.size);
      pre_posx += this.xspeed;
      pre_posy += this.yspeed;
      //this.places[i][0] = pre_posx+this.xspeed;
      //this.places[i][1] = pre_posy+this.yspeed;
    }
    this.last_x = pre_posx;
    this.last_y = pre_posy;
    this.x = this.places[0][0];
    this.y = this.places[0][1];
  }

  ate(){
    this.length++;
  }

  changeDir(posx, posy){
    let diffx = posx - this.x;
    let diffy = posy - this.y;
    if(Math.abs(diffx) > Math.abs(diffy)){
      this.xspeed = diffx < 0 ? -this.size : this.size;
      this.yspeed = 0;
    }else{
      this.xspeed = 0;
      this.yspeed = diffy < 0 ? -this.size : this.size;
    }
  }
}

class Food{
  constructor(){
    this.x = random(0, width-size);
    this.y = random(0, height-size);
    this.size = size;
    this.lifeCount = 100;
  }

  update(){
    if(this.lifeCount<=20){
      fill('#FFF');
    }else{
      fill('#F00');
    }
    this.lifeCount--;
    rect(this.x, this.y, this.size, this.size);
  }

  eaten(s){
    //s is Snake object
    if((s.x < this.x+this.size
        && s.x > this.x)
      &&(s.y < this.y+this.size
        && s.y > this.y)){
          return true;
    }
    if((this.x < s.x+s.size
        && this.x > s.x)
      &&(this.y < s.y+s.size
        && this.y > s.y)){
          return true;
    }
    return false;
  }
}
