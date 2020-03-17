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
    this.x += movex
  }
}
