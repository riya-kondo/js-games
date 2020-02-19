class Block{
  constructor(x, y, w, h, color='#000'){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = color;
  }

  update(){
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}
