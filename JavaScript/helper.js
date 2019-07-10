function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createBullet(char) {
  this.char = char;
  this.bullet = new Bullet(this.char);
  if (this.char.isRight) {
    this.bullet.isRight = true;
  } else {
    this.bullet.isbulletRight = false;
  }
  bullets.push(this.bullet);
}

function updateBullet() {
    bullets.forEach(function(bullet, bulletIndex) {

      if(bullet.x>canvas.width || bullet.y>canvas.height)
      {
        bullets.splice(bulletIndex,1);
      }
      if(bullet.isRight)
        {
        bullet.x += bullet.xs;
        bullet.y += bullet.ys;
        bullet.ys += bullet.gravity;
        bullet.draw();
        } 
      else {
        bullet.x -= bullet.xs;
        bullet.y += bullet.ys;
        bullet.ys += bullet.gravity;
        bullet.draw();
      }
    });
  }

this.isCollision = function(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
};

this.calculateDistance = function(obj1,obj2)
{
  return Math.sqrt(Math.pow(obj2.x-obj1.x,2)+this.Math.pow(obj2.y-obj1.y,2))
}

function killPlayer()
{
  enemies.forEach(function(enemy,enemyIndex)
  {
    players.forEach(function(char,charIndex)
    {
    if(enemy.health==enemy.enemyName.health)
    {
      if(isCollision(char,enemy))
      {
        char.x = 250;
        char.y = 50;
        char.isRight = false;
        char.health --;
      }
    }
  })
})
}

function checkHealth()
{
  this.health = new Image();
  this.health.src = "./Images/heart.png";

  players.forEach(function(char,charIndex)
  {
    for(var i=0;i<char.health;i++)
    {
      ctx.drawImage(this.health,0,0,32,32,50+50*i,0,40,40);
    }
      if(char.health==0)
      {
      enemies=[];
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Game Over! ", canvas.width/2, canvas.height/2);
      }
  })
  
}

function freezeEnemy() {
  bullets.forEach(function(bullet, bulletIndex) {
    enemies.forEach(function(enemy, enemyIndex) {
      if (isCollision(bullet, enemy)) {
        if(enemy.health!=0)
        {
        enemy.health --;
        }
        bullets.splice(bulletIndex, 1);
      }
    });
  });
}

function killEnemy()
{
  enemies.forEach(function(enemy,enemyIndex)
  {
    players.forEach(function(char,charIndex)
    {
    if(enemy.health==0)
    {
      if(isCollision(char,enemy))
      {
          if(char.isRight)
          {
            enemy.xs = 5;
          }
          else{
          enemy.xs = -5;
          }
        enemy.gravity = 5;
        enemy.isCollided = true;
      }
      for(var i=0; i < enemies.length; i++)
      {
        if(enemy!=enemies[i] && enemy.isCollided)
        {
          if(isCollision(enemy,enemies[i]))
          {
            enemies.splice(i,1);
          }
        }
      }
       if((enemy.x<=0 && enemy.y >= canvas.height - enemy.height*2) || (enemy.x>=canvas.width-enemy.height && enemy.y >= canvas.height - enemy.height*2))
      {
        enemies.splice(enemyIndex,1);
      }
    }
  })
})

}

function moveEnemies() {
    enemies.forEach(function(enemy, enemyIndex) {
      players.forEach(function(char,charIndex)
      {
      if(enemy.falling && !enemy.isCollided) 
      {
       enemy.xs = enemy.tempxs; 
        if(enemy.x>=char.x)
        {
          enemy.xs = -enemy.xs;
          enemy.ismovingRight = false;
        }
        else{
          enemy.ismovingRight = true;
        }
      }
      if(!enemy.falling)
      {
        if(enemy.x<=0 || enemy.x >= canvas.width-50)
        {
          if(enemy.ismovingRight)
          {
            enemy.ismovingRight = false
          }
          else
          {
            enemy.ismovingRight = true;
          }
          enemy.xs = -enemy.xs;
        }
        if(enemy.health==enemy.enemyName.health || enemy.isCollided)
        {
          enemy.x += enemy.xs;

          
        }
        enemy.createEnemies();
      }
      enemy.createGravity(char);
  });
})
}

function checkEnemiesStatus()
{
    enemies.forEach(function(enemy, enemyIndex) {
      if(enemy.health < enemy.enemyName.health && !enemy.isCollided)
      {
        enemy.meltCounter++;
      }
      if(enemy.meltCounter==200)
      {
        enemy.health++;
        enemy.meltCounter =0;
      }
  });
}

// function bulletCollision()
// {
//   bullets.forEach(function(bullet,bulletIndex)
//   {
//     bullet.posX=Math.floor(bullet.x/game.tileW);
//     bullet.posY=Math.floor(bullet.y/game.tileH);

//     if(game.gameMap[(game.mapW*(bullet.posY+1)+(bullet.posX+1)-1)]===1)
//     {
//         bullets.splice(bulletIndex,1);
//       }
//   });
// }



