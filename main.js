class Position{
  constructor(centerPointX,centerPointY,size){
    this.centerPointX =centerPointX
    this.centerPointY = centerPointY
    this.size = size
  }

}

class Face extends Position {
  constructor(centerPointX, centerPointY, size){
    super(centerPointX, centerPointY, size);
  }
 
  draw = function () {
    const centerPoint = {
      x: this.centerPointX,
      y: this.centerPointY,
    };
    drawCircle(centerPoint, this.size);
  };
}

class Eye extends Position{
  constructor(centerPointX, centerPointY, size){
    super(centerPointX, centerPointY, size);
  }
  
  draw = function () {
    const centerPoint = {
      x: this.centerPointX,
      y: this.centerPointY,
    };

    drawCircle(centerPoint, this.size);
    drawCircle(centerPoint, this.size / 3);
  };
}

class Nose extends Position {
  
  constructor(centerPointX, centerPointY, size){
    
    super(centerPointX, centerPointY, size);
    this.fat = 5;
  }

  draw = function () {
    const startPoint = {
      x: this.centerPointX,
      y: this.centerPointY - this.size / 2,
    };
    const endPoint = {
      x: this.centerPointX,
      y: this.centerPointY + this.size / 2,
    };
    const rightCornerPoint = {
      x: this.centerPointX + this.fat,
      y: this.centerPointY + (this.size / 2 - this.fat),
    };
    const leftCornerPoint = {
      x: this.centerPointX - this.fat,
      y: this.centerPointY + (this.size / 2 - this.fat),
    };
    drawLine(startPoint, endPoint);
    drawLine(endPoint, rightCornerPoint);
    drawLine(endPoint, leftCornerPoint);
  };
}

class Lip extends Position {
 
  constructor(centerPointX, centerPointY, size){
    
    super(centerPointX, centerPointY, size);
    this.status = "scary";
  }
  drawPokerFace = function (centerPointX, centerPointY, size) {
    const startPoint = {
      x: centerPointX - size / 2,
      y: centerPointY,
    };
    const endPoint = {
      x: centerPointX + size / 2,
      y: centerPointY,
    };
    drawLine(startPoint, endPoint);
  };

  drawScaryFace = function (centerPointX, centerPointY, size) {
    drawCircle(
      {
        x: centerPointX,
        y: centerPointY,
      },
      size / 5
    );
  };


  
  draw = function () {
    if (this.status === "poker") {
      this.drawPokerFace(this.centerPointX, this.centerPointY, this.size);
    } else if (this.status === "scary") {
      this.drawScaryFace(this.centerPointX, this.centerPointY, this.size);
    }
  };
}

class Emoji {

  constructor(){


  this.centerPointX = 400;
  this.centerPointY = 250;

   this.leftEyePosition = Emoji.calcEyePosition(this.centerPointX, this.centerPointY, "left");
   this.rightEyePosition = Emoji.calcEyePosition(this.centerPointX, this.centerPointY, "right");

  this.items = {
    face: new Face(this.centerPointX, this.centerPointY, 100),
    leftEye: new Eye(this.leftEyePosition.x, this.leftEyePosition.y, 10),
    rightEye: new Eye(this.rightEyePosition.x, this.rightEyePosition.y, 10),
    nose: new Nose(this.centerPointX, this.centerPointY - 10, 30),
    lips: new Lip(this.centerPointX, this.centerPointY + 40, 80),
  };

  }
  static calcEyePosition  (centerFaceX, centerFaceY, side) {
    return {
      x: side === "left" ? centerFaceX - 40 : centerFaceX + 40,
      y: centerFaceY - 50,
    };
  };

    render = function () {
    clearPage();
    for (let item of Object.values(this.items)) {
      item.draw();
    }
  };
  makeFaceScary = function () {
    items.lips.status = "scary";
    render();
  };
  makeFacePoker = function () {
    items.lips.status = "poker";
    render();
  };
  sayLie = function () {
    ++items.nose.fat;
    ++items.nose.size;
    render();
  };
}

const myEmoji = new Emoji();
//Emoji.calcEyePosition()


myEmoji.render();
