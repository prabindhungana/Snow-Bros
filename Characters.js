function Player(x, y) {
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 50;
  this.gravity = 2;
  this.posX = 0;
  this.posY = 0;
  this.charracterImage = new Image();
  this.charracterImage.src = "./Images/sbd1.png";
  this.rightCount = 14;
  this.leftCount = 0;
  this.falling = false;
  this.isRight = false;
  this.isbulletRight = false;
  this.jumping = false;
  this.jumpCount = 0;
  this.isPlayerDead = false;
  this.charracterImage.onload = function() {
    char.init();
  };

  this.init = function() {

    ctx.drawImage(this.charracterImage, 0, 0, 24, 30, this.x, this.y, this.width, this.height);
  };

  this.moveRight = function() {
    this.isRight = true;
    // ctx.drawImage(
    //   this.charracterImage,
    //   this.rightCount * 22,
    //   0,
    //   24,
    //   30,
    //   this.x,
    //   this.y,
    //   50,
    //   50
    // );
    this.rightCount++;
    if (this.rightCount === 17) {
      this.rightCount = 14;
    }
  };

  this.moveLeft = function() {
    this.isRight = false;
    // ctx.drawImage(
    //   this.charracterImage,
    //   this.leftCount * 22,
    //   0,
    //   24,
    //   30,
    //   this.x,
    //   this.y,
    //   50,
    //   50
    // );
    this.leftCount++;
    if (this.leftCount === 3) {
      this.leftCount = 1;
    }
  };

  this.moveUp = function() {
    if(this.jumping)
    {
      this.jumpCount++
      this.y-=5;
    if (this.isRight == true) {
      ctx.drawImage(
        this.charracterImage,
        380,
        0,
        24,
        30,
        this.x,
        this.y,
        50,
        50
      );
    } else {
      ctx.drawImage(this.charracterImage, 0, 0, 24, 30, this.x, this.y, 50, 50);
    }
    if(this.jumpCount==game.tileW/5*2)
    {
      char.jumping = false;
      this.jumpCount = 0;
    }
  }

  };

  this.generateCharacter = function()
  {
    if (this.isRight === true) {
      ctx.drawImage(
        this.charracterImage,
        this.rightCount * 22,
        0,
        24,
        30,
        this.x,
        this.y,
        50,
        50
      );
    } else {
      ctx.drawImage(
        this.charracterImage,
        this.leftCount * 22,
        0,
        24,
        30,
        this.x,
        this.y,
        50,
        50
      );
    }
  }

  this.createGravity = function()
{
  this.falling = false;
  this.posX=Math.floor(char.x/game.tileW);
  this.posY=Math.floor(char.y/game.tileH);

  if(game.gameMap[(game.mapW*(this.posY+1)+(this.posX+1)-1)]===0)
  {
    this.falling = true;
    this.y+=this.gravity;
    if (this.isRight == true) {
      ctx.drawImage(
        this.charracterImage,
        380,
        0,
        24,
        30,
        this.x,
        this.y,
        50,
        50
      );
    } else {
      ctx.drawImage(this.charracterImage, 0, 0, 24, 30, this.x, this.y, 50, 50);
    }
  }
}

}

function Bullet(){
  this.x = char.x;
  this.y = char.y;
  this.xs = 10
  this.ys = -3
  this.gravity = 0.5 
  this.spriteWidth = 82
  this.spriteheight = 42
  this.sprCols = 2
  this.sprRows = 1
  this.width = this.spriteWidth / this.sprCols
  this.height = this.spriteheight / this.sprRows


  this.bullet = new Image();

  this.draw = function()
  {  
    switch(char.isbulletRight){
      case true:
        this.bullet.src = "./Images/bulletone_right2.png";
      break;
      case false:
       this.bullet.src = "./Images/bulletone_left2.png";
      break;
    }    
   ctx.drawImage(this.bullet,0, 0, 42, 42, this.x, this.y, this.width, this.height);       
  }  
}


function Enemy(x,y)
{
  this.xVelocity = 2;
  this.x = x;
  this.y = y;
  this.xs = 1;
  this.isCollided = false;
  this.isCreated = false;
  this.isAlive = false;
  this.falling = true;
  this.isMoving = true;
  this.gravity = 2;
  this.width = 50;
  this.height = 50;
  this.health = 5;
  this.meltCounter = 0;
  this.enemyChar = new Image();


  this.createEnemies= function()
  {
    this.isCreated = true;
    this.enemyChar.src = "./Images/sb2.gif";  
   ctx.drawImage(this.enemyChar,120, 0,32,32, this.x, this.y, this.width, this.height);
   this.isAlive = true;      
  }  

    this.createGravity = function()
  {
    this.falling = false;
    this.posX=Math.floor(this.x/game.tileW);
    this.posY=Math.floor(this.y/game.tileH);
  
    if(game.gameMap[(game.mapW*(this.posY+1)+(this.posX+1)-1)]===0)
    {
      this.falling = true;
      this.y+=this.gravity;
      ctx.drawImage(this.enemyChar,120, 32,32,32, this.x, this.y, this.width, this.height);
      }
    }
  }


