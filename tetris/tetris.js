const size = 25;
const shapes = [
  [[1, 1, 1, 1],
   [0, 0, 0, 0]], //I
  [[1, 1, 0, 0],
   [0, 1, 1, 0]], //Z
  [[0, 1, 1, 0],
   [1, 1, 0, 0]], //S
  [[1, 1, 1, 0],
   [0, 1, 0, 0]], //T
  [[1, 1, 1, 0],
   [0, 0, 1, 0]], //J
  [[1, 1, 1, 0],
   [1, 0, 0, 0]], //L
  [[0, 1, 1, 0], 
   [0, 1, 1, 0]], //O
]
const blockRot = [2, 2, 2, 4, 4, 4, 1]
const colors = ["cyan", "red", "green", "purple", "blue", "orange", "yellow"];
const rows = 20;
const cols = 12;
let loopFlag = true;

function setup() {
  frameRate(5);
  createCanvas(windowWidth, windowHeight);
  field = new Field;
}

function draw() {
  clear()
  background('#000');
  if (keyIsDown(DOWN_ARROW)) {
    if (field.canMove(0, 1)){
      field.block.y += 1;
    }
  } else if (keyIsDown(RIGHT_ARROW)) {
    if (field.canMove(1, 0)){
      field.block.x += 1;
    }
  } else if (keyIsDown(LEFT_ARROW)) {
    if (field.canMove(-1, 0)){
      field.block.x -= 1;
    }
  }
  field.update()
}

function keyPressed() {
  if (keyCode == SHIFT) {
    field.block.state++;
    let r = field.block.state % blockRot[field.block.blockId]
    rotated = field.block.rotate(r);
    if (field.canMove(0, 0, rotated)){
      field.block.shape = rotated;
    }
  }else if (keyCode==UP_ARROW) {
    field.goBottomed();
  }else if (key == ' '){
    if(loopFlag){
      noLoop();
      loopFlag = false;
    }else{
      loop();
      loopFlag = true;
    }
  }

  return false;
}

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
