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
