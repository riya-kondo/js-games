class Food{
  constructor(width, height, size){
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
