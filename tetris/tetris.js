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
    let rotated = field.block.rotate();
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
        this.checkBotomed();
      }
    }
    this.block.createShape();
    this.isLined(rows-1);
  }
  canMove(xmove, ymove, movedShape){
    let ypos = this.block.y + ymove;
    let xpos = this.block.x + xmove;
    let moved = movedShape || this.block.shape
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 4; j++){
        if (moved[i][j]){
          if (ypos+i>=this.btm
              || xpos+j < this.left
              || xpos+j >= this.right
              || this.field[ypos+i][xpos+j]){
            return false;
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
  checkBotomed(){
    this.field = this.bottomed();
    this.block = new Block();
  }
  bottomed(){
    let xpos = this.block.x;
    let ypos = this.block.y;
    let f = this.field;
    for (let row=0; row<4; row++){
      for (let col=0; col<4; col++){
        if (this.block.shape[row][col]){
          f[ypos+row][xpos+col] = true;
        }
      }
    }
    return f;
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
    this.y = 0;
    this.yspeed = 1;
    this.blockId = int(random(0,shapes.length));
    //this.blockType = shapes[0];
    this.shape = this.initShape();
  }
  initShape(){
    var shape = [];
    for (let i = 0; i<4; i++) {
      shape[i] = new Array(4).fill(false);
      for (let j=0; j<4; j++){
        if(shapes[this.blockId][i]){
          if(shapes[this.blockId][i][j]){
            shape[i][j] = true
          }
        }
      }
    }
    return shape;
  }
  createShape(){
    let xpos = this.x;
    let ypos = this.y;
    for (let i = 0; i < this.shape.length; i++){
      let row = this.shape[i];
      for (let j=0; j<row.length; j++){
        if (row[j]){
          fill(colors[this.blockId]);
          rect(size*(xpos+j), size*(ypos+i), size, size)
        }
      }
    }
  }
  rotate(){
    var rotated = [];
    for (let i = 0; i < 4; i++) {
      rotated[i] = [];
      for (let j = 0; j < 4; j++) {
        rotated[i][j] = this.shape[j][-i+3];
      }
    }
    return rotated;
  }
}
