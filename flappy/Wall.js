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
