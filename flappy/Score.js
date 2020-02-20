class Score {
  constructor(){
    this.score = 0;
    this.lifeText = '❤︎';
    this.x = width/2;
    this.y = height/4;
    this.size = 32;
  }

  update(){
    textSize(this.size);
    textAlign(CENTER);
    fill('#0F0');
    text('score: '+this.score, this.x, this.y);
    text(this.lifeText.repeat(life), this.x, this.y+this.size);
  }

  over(){
    textSize(this.size);
    textAlign(CENTER);
    fill('#0F0');
    text('gameover', this.x, this.y);
    text('your final score: '+this.score, this.x, this.y+this.size);
  }
}
