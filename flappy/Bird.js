class Bird {
  constructor(init_y){
    this.x = 100;
    this.y = init_y;
    this.yspeed = 1;
    this.size = 50;
    this.hittable = true;
  }

  update(h, gravity=1){
    if(this.y+this.yspeed < h-this.size/2){
      this.y += this.yspeed;
      this.yspeed += gravity;
    }else{
      this.y = h-this.size/2;
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
