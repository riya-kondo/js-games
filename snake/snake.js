class Snake{
  constructor(width, height, size){
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
      let tmpx = this.places[i][0];
      let tmpy = this.places[i][1];
      this.places[i] = [pre_posx, pre_posy];
      //自分に衝突しているか確認
      if(this.places[0][0]==pre_posx
        &&this.places[0][1]==pre_posy){
        return false;
      }
      pre_posx = tmpx;
      pre_posy = tmpy;
    }
    this.last_x = pre_posx;
    this.last_y = pre_posy;
    //壁に衝突しているか確認
    if(this.places[0][0]<0
      || this.places[0][0]+this.size>width
      || this.places[0][1]<0
      || this.places[0][1]+this.size>height){
      return false;
    }
    this.x = this.places[0][0];
    this.y = this.places[0][1];
    return true;
  }

  ate(){
    this.length++;
    this.places.push([this.last_x, this.last_y]);
  }

  calcDir(posx, posy){
    let direction = new String();
    let diffx = posx - this.x;
    let diffy = posy - this.y;
    if(Math.abs(diffx) > Math.abs(diffy)){
      direction = diffx < 0 ? 'left' : 'right';
    }else{
      direction = diffy < 0 ? 'up' : 'down';
    }
    return direction;
  }

  changeDir(dir){
    if(dir=='up'&&this.yspeed!=this.size){
      this.xspeed = 0;
      this.yspeed = -this.size;
    }else if(dir=='down'&&this.yspeed!=-this.size){
      this.xspeed = 0;
      this.yspeed = this.size;
    }else if(dir=='right'&&this.xspeed!=-this.size){
      this.xspeed = this.size;
      this.yspeed = 0;
    }else if(dir=='left'&&this.xspeed!=this.size){
      this.xspeed = -this.size;
      this.yspeed = 0;
    }
  }
}
