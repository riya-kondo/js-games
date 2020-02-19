class Bar{
  constructor(y){
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
