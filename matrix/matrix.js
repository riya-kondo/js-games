var s = window.screen;

function setup(){
  frameRate(33);
  createCanvas(displayWidth,displayHeight);
  letterSet = new letter();
}

function draw() {
  background('rgba(0%,0%,0%,0.05)');
  letterSet.upd()
};

class letter {
  constructor() {
    this.color = '#0f0';
    this.textsize = 10;
    this.letters = Array(256).join(1).split(''); //文字列の初期化(最初は全部同じ高さ)
  }
  upd(){
    for (let i=0;i<this.letters.length;i++){
      var y_pos = this.letters[i]
      var x_pos = i * 10;
      //var c = String.fromCharCode(3e4+Math.random()*33); //漢字の生成
      var c = String.fromCharCode(81*Math.random()+1.245e4) //カタカナランダム生成
      textSize(this.textsize);
      text(c, x_pos, y_pos);
      fill(this.color);
      //y_pos(lettersの要素)がthreshold(画面外)より高い場合, 0に書き換え。低いときは10足す。
      this.letters[i] = (y_pos > displayHeight + Math.random() * 1e4) ? 0 : y_pos + 10; // (cond) ?True :False
    }
  }
}
