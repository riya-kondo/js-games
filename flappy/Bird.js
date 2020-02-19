class Bird {
  constructor(){
    this.x = 100;
    this.y = height/2;
    this.yspeed = 1;
    this.size = 50;
    this.hittable = true;
    this.life = life;
  }

  update(){
    if(this.y+this.yspeed < height-this.size/2){
      this.y += this.yspeed;
      this.yspeed += gravity;
    }else{
      this.y = height-this.size/2;
      this.yspeed = 1;
    }
    if(this.hittable){
      fill('#FFF');
    }else{
      fill('#F00');
    }
    circle(this.x, this.y, this.size);
  }

  fly(){
    this.yspeed = -10;
    this.y += this.yspeed;
  }
}
