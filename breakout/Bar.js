class Bar{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  update(){
    fill('#000');
    rect(this.x, this.y, this.width, this.height);
  }
  move(movex){
    if(this.x+movex >= 0 && this.x+movex+this.width < block*COLS){
      this.x += movex
    }
  }
}
