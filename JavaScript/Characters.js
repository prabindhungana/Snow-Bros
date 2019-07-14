function Player(x, y,leftKey, rightKey, jumpKey,shootKey) {
  this.x = x;
  this.y = y;
  this.xs = 0;
  this.ys = 5;
  this.moveDiagonal = 1;
  this.health = 3;
  this.leftKey = leftKey;
  this.rightkey = rightKey;
  this.jumpKey = jumpKey;
  this.shootKey = shootKey;
  this.width = 50;
  this.height = 50;
  this.gravity = 2;
  this.yGravity = 0.2;
  this.posX = 0;
  this.posY = 0;
  this.rightCount = 14;
  this.leftCount = 0;
  this.falling = false;
  this.isRight = false;
  this.jumping = false;
  this.jumpCount = 0;
  this.isPlayerDead = false;

  this.moveRight = function() {
    this.isRight = true;
    this.rightCount++;
    if (this.rightCount === 17) {
      this.rightCount = 14;
    }
  };

  this.moveLeft = function() {
    this.isRight = false;
    this.leftCount++;
    if (this.leftCount === 3) {
      this.leftCount = 1;
    }
  };

  this.moveUp = function() {
    if(this.jumping)
    {
      this.jumpCount++
      this.y -= this.ys;
    if (this.isRight == true) {
      ctx.drawImage(
        imageLoader.images['character'],
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
      ctx.drawImage(imageLoader.images['character'], 0, 0, 24, 30, this.x, this.y, 50, 50);
    }
    if(this.jumpCount==game.tileW/5*2)
    {
      this.jumping = false;
      this.jumpCount = 0;
      this.gravity = 2;
    }
  }

  };

  this.generateCharacter = function()
  {
    if (this.isRight === true) {
      ctx.drawImage(
        imageLoader.images['character'],
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
        imageLoader.images['character'],
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
  if(this.x/game.tileW-Math.floor(this.x/game.tileW)<0.5)
  {
  this.posX=Math.floor(this.x/game.tileW);
  }
  else
  {
    this.posX = Math.ceil(this.x/game.tileW);
  }
  this.posY=Math.floor(this.y/game.tileH);

  if(game.allgameLevels[game.currentLevel][((game.mapW*(this.posY+1)+(this.posX+1))-1)]===0)
  {
    this.falling = true;
    this.y+=this.gravity;
    this.gravity += this.yGravity;
    if (this.isRight == true) {
      ctx.drawImage(
        imageLoader.images['character'],
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
      ctx.drawImage(imageLoader.images['character'], 0, 0, 24, 30, this.x, this.y, 50, 50);
    }
  }
  else{
    this.falling = false;
  }
  
}

}

function Bullet(obj){
  this.obj = obj;
  this.x = this.obj.x;
  this.y = this.obj.y;
  this.xs = 10
  this.ys = -3
  this.gravity = 0.5 
  this.spriteWidth = 82
  this.spriteheight = 42
  this.sprCols = 2
  this.sprRows = 1
  this.isRight = false;
  this.width = this.spriteWidth / this.sprCols
  this.height = this.spriteheight / this.sprRows



  this.draw = function()
  {  
    switch(this.isRight){
      case true:
        ctx.drawImage(imageLoader.images['rightbullet'],0,0,42,42,this.x,this.y,this.width,this.height);
      break;
      case false:
        ctx.drawImage(imageLoader.images['leftbullet'],0,0,42,42,this.x,this.y,this.width,this.height);
      break;
    }            
  }
}


function Enemy(x,y,enemyName)
{
  this.enemyName = enemyName;
  this.xVelocity = 2;
  this.x = x;
  this.y = y;
  this.ys = 4;
  this.xs = 1;
  this.tempxs = 1;
  this.jumping =false;
  this.jumpcount = 0;
  this.chaseCounter = 0;
  this.snowChange = 0;
  this.ismovingRight = false;
  this.isRight = false;
  this.isgeneratedRight = false;
  this.isCollided = false;
  this.isCreated = false;
  this.isAlive = false;
  this.falling = true;
  this.isMoving = true;
  this.bulletCounter = 0;
  this.bulletFlag = false;
  this.gravity = 2;
  this.width = 50;
  this.height = 50;
  this.health = this.enemyName.health;
  this.meltCounter = 0;
  this.enemyChar = new Image();


  this.createEnemies= function()
  {
    this.enemyChar.src = "./Images/sb2.gif";
    switch(this.health)
    {
    case 0:
      if(this.isCollided)
      {
        ctx.drawImage(this.enemyChar,108, 2096,25,22, this.x, this.y, this.width, this.height);
      }
      else
        ctx.drawImage(this.enemyChar,108, 2096,24,22, this.x, this.y, this.width, this.height);
        break;
    case 1:
        if(this.ismovingRight)
        {
          ctx.drawImage(this.enemyChar,270, this.enemyName.spritePosY,this.enemyName.spriteWidth,this.enemyName.spriteHeight, this.x, this.y, this.width, this.height);
        }
        else
        {
          ctx.drawImage(this.enemyChar,this.enemyName.spritePosX, this.enemyName.spritePosY,this.enemyName.spriteWidth,this.enemyName.spriteHeight, this.x, this.y, this.width, this.height);
        }
        ctx.drawImage(this.enemyChar,242, 2165,25,32, this.x, this.y, this.width, this.height);
        break;
    case 2:
      if(this.ismovingRight)
        {
          ctx.drawImage(this.enemyChar,270, this.enemyName.spritePosY,this.enemyName.spriteWidth,this.enemyName.spriteHeight, this.x, this.y, this.width, this.height);
        }
        else
        {
          ctx.drawImage(this.enemyChar,this.enemyName.spritePosX, this.enemyName.spritePosY,this.enemyName.spriteWidth,this.enemyName.spriteHeight, this.x, this.y, this.width, this.height);
        }
        ctx.drawImage(this.enemyChar,217, 2165,25,32, this.x, this.y, this.width, this.height);
        break
    case 3:
      if(this.ismovingRight)
      {
        ctx.drawImage(this.enemyChar,270, this.enemyName.spritePosY,this.enemyName.spriteWidth,this.enemyName.spriteHeight, this.x, this.y, this.width, this.height);
      }
      else
      {
        ctx.drawImage(this.enemyChar,this.enemyName.spritePosX, this.enemyName.spritePosY,this.enemyName.spriteWidth,this.enemyName.spriteHeight, this.x, this.y, this.width, this.height);
      }
  }
    
  }  

  this.setGravity = function()
  {
    if(!this.isCollided && (this.jumping || this.falling))
      {
        if(this.ismovingRight)
        {
          ctx.drawImage(this.enemyChar,270, 32,this.enemyName.spriteWidth,this.enemyName.spriteHeight, this.x, this.y, this.width, this.height);
        }
        else
        {
          ctx.drawImage(this.enemyChar,this.enemyName.fallPosX, this.enemyName.fallPosY,this.enemyName.spriteWidth,this.enemyName.spriteHeight, this.x, this.y, this.width, this.height);
        }
      }
      
      else if(this.isCollided)
      ctx.drawImage(this.enemyChar,108, 2096,24,22, this.x, this.y, this.width, this.height);
    }
  }



