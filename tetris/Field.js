class Field {
  constructor() {
    this.width = size*cols;
    this.height = size*rows;
    this.block = new Block();
    this.left = 0;
    this.right = cols;
    this.tp = 0;
    this.btm = rows;
    this.field = this.initField();
  }
  initField() {
    let f = [];
    for (let row=0; row<rows; row++){
      f[row] = [];
      for (let col=0; col<cols; col++){
        f[row][col] = false;
      }
    }
    return f;
  }
  update() {
    for (let row=0; row<rows; row++){
      for (let col=0; col<cols; col++){
        if (this.field[row][col]){
          fill("gray");
        }else{
          fill('#fff');
        }
        rect(size*col, size*row, size, size);
      }
    }
    if(frameCount%5==0){
      if(this.canMove(0, 1)){
        this.block.y += this.block.yspeed;
      }else{
        this.bottomed();
      }
    }
    this.block.updateShape();
    this.isLined(rows-1);
  }
  canMove(xmove, ymove, movedShape){
    let ypos = this.block.y + ymove;
    let xpos = this.block.x + xmove;
    let moved = movedShape || this.block.shape
    for (let i = 0; i < this.block.shapeLength; i++){
      for (let j = 0; j < this.block.shapeLength; j++){
        if (moved[i][j]){
          if (ypos+i>=this.btm
              || xpos+j < this.left
              || xpos+j >= this.right){
            return false;
          }else if(ypos>=0){
            if(this.field[ypos+i][xpos+j]){
              return false;
            }
          }
        }
      }
    }
    return true;
  }
  goBottomed(){
    let down = 0;
    for(let row=1; row<rows-1; row++){
      if(this.canMove(0, row)){
        down = row;
      }else{
        break;
      }
    }
    this.block.y += down;
  }
  bottomed(){
    let xpos = this.block.x;
    let ypos = this.block.y;
    let f = this.field;
    for (let row=0; row<this.block.shapeLength; row++){
      for (let col=0; col<this.block.shapeLength; col++){
        if (this.block.shape[row][col]){
          f[ypos+row][xpos+col] = true;
        }
      }
    }
    this.field = f;
    this.block = new Block();
  }
  isLined(){
    //下からラインが揃っているか走査
    for (let row=rows-1; row>=0; row--){
      if (this.field[row].every(val => val==true)){
        for (let r = row-1; r>=0; r--){
          this.field[r+1] = Array.from(this.field[r]);
        }
        this.field[0] = new Array(cols).fill(false);
        row++;
      }
    }
  }
}
