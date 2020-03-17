class Wall {
  constructor(initx, random_y, height){
    this.x = initx;
    this.xspeed = -2;
    this.y = random_y;
    this.range = 200;
    this.width = 20;
    this.bottom = height
  }

  update(){
    this.x += this.xspeed;
    fill('#000');
    rect(this.x, 0, this.width, this.y, 0, 0, 5, 5);
    rect(this.x, this.y+this.range, this.width, this.bottom-(this.y+this.range), 5, 5, 0, 0);
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
