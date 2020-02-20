class Score {
  constructor(init_x, init_y){
    this.score = 0;
    this.lifeText = '❤︎';
    this.x = init_x;
    this.y = init_y;
    this.size = 32;
  }

  update(life){
    textSize(this.size);
    textAlign(CENTER);
    fill('#0F0');
    text('score: '+this.score, this.x, this.y);
    text(this.lifeText.repeat(life), this.x, this.y+this.size);
  }

  addScore(){
    this.score++;
  }

  over(){
    textSize(this.size);
    textAlign(CENTER);
    fill('#0F0');
    text('gameover', this.x, this.y);
    text('your final score: '+this.score, this.x, this.y+this.size);
  }
}
