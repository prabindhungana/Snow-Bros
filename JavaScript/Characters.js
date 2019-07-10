function Player(x, y,leftKey, rightKey, jumpKey,shootKey) {
  this.x = x;
  this.y = y;
  this.health = 3;
  this.leftKey = leftKey;
  this.rightkey = rightKey;
  this.jumpKey = jumpKey;
  this.shootKey = shootKey;
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
  this.jumping = false;
  this.jumpCount = 0;
  this.isPlayerDead = false;

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
      this.jumping = false;
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
  if(this.x/game.tileW-Math.floor(this.x/game.tileW)<0.5)
  {
  this.posX=Math.floor(this.x/game.tileW);
  }
  else
  {
    this.posX = Math.ceil(this.x/game.tileW);
  }
  this.posY=Math.floor(this.y/game.tileH);

  if(game.gameMap[((game.mapW*(this.posY+1)+(this.posX+1))-1)]===0)
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
  else{
    this.falling = false;
  }
}

}

function Bullet(char){
  this.char = char;
  this.x = this.char.x;
  this.y = this.char.y;
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


  this.bullet = new Image();

  this.draw = function()
  {  
    switch(this.isRight){
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


function Enemy(x,y,enemyName)
{
  this.enemyName = enemyName;
  this.xVelocity = 2;
  this.x = x;
  this.y = y;
  this.xs = 1;
  this.tempxs = 1;
  this.jumping =false;
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
  this.gravity = 2;
  this.width = 50;
  this.height = 50;
  this.health = this.enemyName.health;
  this.meltCounter = 0;
  this.enemyChar = new Image();


this.generateEnemies = function(i)
{
  this.i = i;
  this.isCreated = true;
  this.isAlive = true;
  if(enemies[this.i].x>500)
  {
    enemies[this.i].isRight = true;
  }
 
}

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
        
        break;
    case 4:
        ctx.drawImage(this.enemyChar,this.enemyName.spritePosX, this.enemyName.spritePosY,this.enemyName.spriteWidth,this.enemyName.spriteHeight, this.x, this.y, this.width, this.height);
        break;
    case 5:
        ctx.drawImage(this.enemyChar,this.enemyName.spritePosX, this.enemyName.spritePosY,this.enemyName.spriteWidth,this.enemyName.spriteHeight, this.x, this.y, this.width, this.height);
        break;

    }
  }  

  this.createGravity = function(char)
  {
    this.char = char;
  if(this.x/game.tileW-Math.floor(this.x/game.tileW)<0.5)
  {
  this.posX=Math.floor(this.x/game.tileW);
  }
  else
  {
    this.posX = Math.ceil(this.x/game.tileW);
  }
  this.posY=Math.floor(this.y/game.tileH);
    if(game.gameMap[(game.mapW*(this.posY+1)+(this.posX+1)-1)]===0)
    {
      this.isMoving = false;
      this.falling = true;
      this.y+=this.gravity;
      if(!this.isCollided)
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
      
      else
      ctx.drawImage(this.enemyChar,108, 2096,24,22, this.x, this.y, this.width, this.height);
    }
    else{
      this.falling = false;
    }
      if(this.y>this.char.y && !this.isCollided)
        {
          if(this.ismovingRight)
          {
            if(((game.gameMap[(game.mapW*(this.posY-1)+(this.posX))]===1) || (game.gameMap[(game.mapW*(this.posY-1)+(this.posX))]===2)) && (game.gameMap[(game.mapW*(this.posY-1)+(this.posX-1))]===0))
            {
              this.y-=100;
            }
          }
          else{
            if(((game.gameMap[(game.mapW*(this.posY-1)+(this.posX))]===1) || (game.gameMap[(game.mapW*(this.posY-1)+(this.posX))]===2)) && (game.gameMap[(game.mapW*(this.posY-1)+(this.posX+1))]===0))
            {
              this.y-=100;
            }

          }
        }
    }
  }


