class Ball {
  constructor(x, y, size, speed){
    this.x = x;
    this.xspeed = speed;
    this.y = y;
    this.yspeed = speed;
    this.size = size;
    this.lastx = x;
    this.lasty = y; 
  }

  update(){
    fill('#F00');
    circle(this.x, this.y, this.size);
  }

  move(){
    this.lastx = this.x
    this.lasty = this.y
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  collision(obj){
    let nextx = this.x+this.xspeed;
    let nexty = this.y+this.yspeed;
    if(nextx <= obj.x + obj.width
      && obj.x <= nextx
      && obj.y <= nexty
      && obj.y + obj.height >= nexty){
      return true;
    }else{
      return false;
    }
  }

  changeDir(x, y){
    this.xspeed *= x;
    this.yspeed *= y;
  }
}
