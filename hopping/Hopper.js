class Hopper{
  constructor(){
    this.x = width/2;
    this.y = height-size/2;
    this.size = size;
    this.yspeed = 0;
  }

  update(){
    fill('#000');
    this.y += this.yspeed;
    this.yspeed += gravity;
    //次に移動したら下に地面がある場合は移動方向を反転
    if(this.y+this.size/2+this.yspeed >= ground){
      this.yspeed = -20;
    }
    circle(this.x, this.y, this.size);
  }

  move(xmove){
    this.x += xmove;
    if(this.x-this.size/2 > width){
      this.x = 0;
    }else if(this.x+this.size/2 < 0){
      this.x = width;
    }
  }
}

