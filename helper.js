function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createBullet() {
  this.bullet = new Bullet();
  bullets.push(bullet);
  if (char.isRight === true) {
    char.isbulletRight = true;
  } else {
    char.isbulletRight = false;
  }
}

function updateBullet() {
  if (char.isbulletRight === true) {
    bullets.forEach(function(bullet, bulletIndex) {
      if (bullet.y > canvas.width) {
        bullets.splice(bulletIndex, 1);
      } else {
        bullet.x += bullet.xs;
        bullet.y += bullet.ys;
        bullet.ys += bullet.gravity;
        bullet.draw();
      }
    });
  } else {
    bullets.forEach(function(bullet, bulletIndex) {
      if (bullet.y > canvas.width) {
        bullets.splice(bulletIndex, 1);
      } else {
        bullet.x -= bullet.xs;
        bullet.y += bullet.ys;
        bullet.ys += bullet.gravity;
        bullet.draw();
      }
    });
  }
}

this.isCollision = function(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
};

function killPlayer()
{
  enemies.forEach(function(enemy,enemyIndex)
  {
    if(enemy.health==5)
    {
      if(isCollision(char,enemy))
      {
        char.isPlayerDead = true;
        enemies = [];
      }
    }
  })
}

function checkIfDead()
{
  if(char.isPlayerDead)
  {
    ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over! ", canvas.width/2, canvas.height/2);
  }
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
    if(enemy.health==0)
    {
      if(isCollision(char,enemy))
      {
        if(char.isRight)
        {
          enemy.xs = -5;
        }
        else{
        enemy.xs = 5;
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
}

function moveEnemies() {
  
    enemies.forEach(function(enemy, enemyIndex) {
      if(!enemy.falling)
      {
        if(enemy.x<=0 || enemy.x >= canvas.width-50)
        {
          enemy.xs = -enemy.xs;
        }
        if(enemy.health==5 || enemy.isCollided)
        {
        enemy.x -= enemy.xs;
        }
        enemy.createEnemies();
      }
      enemy.createGravity();
  });
}

function checkEnemiesStatus()
{
    enemies.forEach(function(enemy, enemyIndex) {
      if(enemy.health < 5 && !enemy.isCollided)
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



