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
  this.moveSpeed = 4;
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
  this.score = 0;
  this.highscore = 0;
  this.movingLeft = false;
  this.movingRight = false;

  that = this;

  this.scoreRef = firebase.database().ref('scores').child('highscore');

  this.scoreRef.on('value', function(data)
  {
    if(data.val()===null)
    {
      that.highscore = 0
    }
    else{
    that.highscore= data.val();
    }
  });

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

  this.applyHorizontalMovement = function() {
    if (this.movingLeft && !this.movingRight && !this.falling) {
      if (this.x > 0) {
        this.x -= this.moveSpeed;
        this.moveLeft();
      }
    } else if (this.movingRight && !this.movingLeft && !this.falling) {
      if (this.x <= canvas.width - game.tileW) {
        this.x += this.moveSpeed;
        this.moveRight();
      }
    }
  };

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
  this.rollAngle = 0;
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
  this.walkFrameIndex = 0;
  this.walkFrameTick = 0;
  this.walkFrameDelay = 8;

  this.getWalkFrameX = function() {
    var leftFrames = this.enemyName.walkFramesLeft || [this.enemyName.spritePosX];
    var rightFrames = this.enemyName.walkFramesRight || [this.enemyName.spritePosX];
    var frames = this.ismovingRight ? rightFrames : leftFrames;
    var isWalking =
      !this.falling && !this.jumping && !game.paused && Math.abs(this.xs) > 0;

    if (!this.isMoving || !isWalking) {
      this.walkFrameIndex = 0;
      this.walkFrameTick = 0;
      return frames[0];
    }

    this.walkFrameTick++;
    if (this.walkFrameTick >= this.walkFrameDelay) {
      this.walkFrameTick = 0;
      this.walkFrameIndex = (this.walkFrameIndex + 1) % frames.length;
    }

    return frames[this.walkFrameIndex];
  };


  this.createEnemies= function()
  {
    var walkFrameX = this.getWalkFrameX();
    switch(this.health)
    {
    case 0:
      if (this.isCollided && Math.abs(this.xs) > 0) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rollAngle);
        ctx.drawImage(
          imageLoader.images['enemychar'],
          108,
          2096,
          24,
          22,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
        ctx.restore();
      } else {
        ctx.drawImage(imageLoader.images['enemychar'], 108, 2096, 24, 22, this.x, this.y, this.width, this.height);
      }
      break;
    case 1:
        ctx.drawImage(
          imageLoader.images['enemychar'],
          walkFrameX,
          this.enemyName.spritePosY,
          this.enemyName.spriteWidth,
          this.enemyName.spriteHeight,
          this.x,
          this.y,
          this.width,
          this.height
        );
        ctx.drawImage(imageLoader.images['enemychar'],242, 2165,25,32, this.x, this.y, this.width, this.height);
        break;
    case 2:
      ctx.drawImage(
        imageLoader.images['enemychar'],
        walkFrameX,
        this.enemyName.spritePosY,
        this.enemyName.spriteWidth,
        this.enemyName.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
        ctx.drawImage(imageLoader.images['enemychar'],217, 2165,25,32, this.x, this.y, this.width, this.height);
        break
    case 3:
      ctx.drawImage(
        imageLoader.images['enemychar'],
        walkFrameX,
        this.enemyName.spritePosY,
        this.enemyName.spriteWidth,
        this.enemyName.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
  }
    
  }  

  this.setGravity = function()
  {
    if(!this.isCollided && (this.jumping || this.falling))
      {
        if(this.ismovingRight)
        {
          ctx.drawImage(imageLoader.images['enemychar'],270, 32,this.enemyName.spriteWidth,this.enemyName.spriteHeight, this.x, this.y, this.width, this.height);
        }
        else
        {
          ctx.drawImage(imageLoader.images['enemychar'],this.enemyName.fallPosX, this.enemyName.fallPosY,this.enemyName.spriteWidth,this.enemyName.spriteHeight, this.x, this.y, this.width, this.height);
        }
      }
      
      else if(this.isCollided)
      ctx.drawImage(imageLoader.images['enemychar'],108, 2096,24,22, this.x, this.y, this.width, this.height);
    }
  }
