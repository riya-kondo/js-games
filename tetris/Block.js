class Block {
  constructor() {
    this.x = 5;
    this.y = -2;
    this.yspeed = 1;
    this.blockId = int(random(0,shapes.length));
    this.shapeLength = this.blockId==0 ? 4 : 3;
    this.shape = this.initShape();
    this.state = 0;
  }
  initShape(){
    var shape = [];
    let length = this.shapeLength;
    shape[0] = new Array(length).fill(false);
    for (let i = 1; i<length; i++) {
      shape[i] = new Array(length).fill(false);
      for (let j=0; j<length; j++){
        if(shapes[this.blockId][i-1]){
          if(shapes[this.blockId][i-1][j]){
            shape[i][j] = true
          }
        }
      }
    }
    return shape;
  }
  updateShape(){
    let xpos = this.x;
    let ypos = this.y;
    for (let i = 0; i < this.shapeLength; i++){
      let row = this.shape[i];
      for (let j=0; j<row.length; j++){
        if (row[j]){
          fill(colors[this.blockId]);
          rect(size*(xpos+j), size*(ypos+i), size, size)
        }
      }
    }
  }
  rotate(r){
    var rotated = this.initShape();
    //回転行列の公式に従う
    //(x_r, y_r) = ((cos90, -sin90), (sin90, cos90))(x,y)
    for (let t=0; t<r; t++){
      for (let i = 0; i < this.shapeLength; i++) {
        rotated[i] = [];
        for (let j = 0; j < this.shapeLength ; j++) {
          rotated[i][j] = this.shape[j][-i+this.shapeLength-1];
        }
      }
    }
    return rotated;
  }
}
