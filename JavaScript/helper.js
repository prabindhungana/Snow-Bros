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
    if (bullet.x > canvas.width || bullet.y > canvas.height) {
      bullets.splice(bulletIndex, 1);
    }
    if (bullet.isRight) {
      bullet.x += bullet.xs;
      bullet.y += bullet.ys;
      bullet.ys += bullet.gravity;
      bullet.draw();
    } else {
      bullet.x -= bullet.xs;
      bullet.y += bullet.ys;
      bullet.ys += bullet.gravity;
      bullet.draw();
    }
  });
}

function createEnemyBullet(enemy)
{
this.enemy = enemy;
  players.forEach(function(char,charIndex)
  {
    if(enemy.bulletCounter ==0 && enemy.health==enemy.enemyName.health && Math.abs(this.enemy.y - char.y) <= 50 && !enemy.falling && !enemy.jumping && !game.paused)
    {
      enemy.bulletFlag = true;
  this.bullet = new Bullet(this.enemy);
  if (this.enemy.ismovingRight) {
    this.bullet.isRight = true;
  } else {
    this.bullet.isbulletRight = false;
  }
  EnemyBullets.push(this.bullet);
}
if(enemy.bulletFlag)
{
  enemy.bulletCounter++;
  if(enemy.bulletCounter==100)
  {
    enemy.bulletCounter = 0;
  }
}
})
}

function updateEnemyBullet() {
  EnemyBullets.forEach(function(bullet, bulletIndex) {
    if (bullet.x > canvas.width || bullet.x < 0) {
      EnemyBullets.splice(bulletIndex, 1);
    }
    if (bullet.isRight) {
      if(!game.paused)
      bullet.x += bullet.xs;
      bullet.draw();
    } else {
      if(!game.paused)
      bullet.x -= bullet.xs;
      bullet.draw();
    }
  });
}

this.isCollision = function(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width / 2 > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height / 2 > obj2.y
  );
};

function killPlayer() {
  players.forEach(function(char, charIndex) {
    enemies.forEach(function(enemy, enemyIndex) {
      if (enemy.health == enemy.enemyName.health) {
        if (isCollision(char, enemy)) {
          char.x = 250;
          char.y = 50;
          char.isRight = false;
          char.health--;
        }
      }
    });
    EnemyBullets.forEach(function(bullet,bulletIndex)
    {
      if(isCollision(char,bullet))
      {
          char.x = 250;
          char.y = 50;
          char.isRight = false;
          char.health--;
          EnemyBullets.splice(bulletIndex, 1);
      }
    })
  });
  
}

function checkHealth() {

  players.forEach(function(char, charIndex) {
    for (var i = 0; i < char.health; i++) {
      ctx.drawImage(game.heart, 0, 0, 32, 32, 50 + 50 * i, 0, 40, 40);
    }
    if (char.health == 0) {
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Game Over! ", canvas.width / 2, canvas.height / 2);
    }
  });
}

function freezeEnemy() {
  bullets.forEach(function(bullet, bulletIndex) {
    enemies.forEach(function(enemy, enemyIndex) {
      if (isCollision(bullet, enemy)) {
        if (enemy.health != 0) {
          enemy.health--;
        }
        bullets.splice(bulletIndex, 1);
      }
    });
  });
}

function killEnemy() {
  enemies.forEach(function(enemy, enemyIndex) {
    players.forEach(function(char, charIndex) {
      if (enemy.health == 0) {
        if (isCollision(char, enemy)) {
          if (char.isRight) {
            enemy.xs = 5;
          } else {
            enemy.xs = -5;
          }
          enemy.gravity = 5;
          enemy.isCollided = true;
        }
        for (var i = 0; i < enemies.length; i++) {
          if (enemy != enemies[i] && enemy.isCollided) {
            if (isCollision(enemy, enemies[i])) {
              enemies.splice(i, 1);
            }
          }
        }
        if (
          (enemy.x <= 0 && enemy.y >= canvas.height - enemy.height * 2) ||
          (enemy.x >= canvas.width - enemy.height &&
            enemy.y >= canvas.height - enemy.height * 2)
        ) {
          enemies.splice(enemyIndex, 1);
        }
      }
    });
  });
}

function jumpEnemy()
{
  enemies.forEach(function(enemy,enemyIndex)
  {
    players.forEach(function(char,charindex)
    {
      if(enemy.isAlive)
      {
  if (
    enemy.y > char.y &&
    !enemy.isCollided &&
    enemy.health == enemy.enemyName.health
  ) {
    if (enemy.ismovingRight) {
      if (
        (game.allgameLevels[game.currentLevel][
          game.mapW * (enemy.posY - 1) + enemy.posX
        ] === 1 ||
          game.allgameLevels[game.currentLevel][
            game.mapW * (enemy.posY - 1) + enemy.posX
          ] === 2) &&
        game.allgameLevels[game.currentLevel][
          game.mapW * (enemy.posY - 1) + (enemy.posX - 1)
        ] === 0
      ) {
        enemy.jumping = true;
      }
    } else {
      if (
        (game.allgameLevels[game.currentLevel][
          game.mapW * (enemy.posY - 1) + enemy.posX
        ] === 1 ||
          game.allgameLevels[game.currentLevel][
            game.mapW * (enemy.posY - 1) + enemy.posX
          ] === 2) &&
        game.allgameLevels[game.currentLevel][
          game.mapW * (enemy.posY - 1) + (enemy.posX + 1)
        ] === 0
      ) {
        enemy.jumping = true;
      }
    }
  }
  enemy.setGravity(); 
}   
})
})
}

function setEnemyGravity()
{
  enemies.forEach(function(enemy,enemyIndex)
  {
    players.forEach(function(char,charindex)
    {
      if(enemy.isAlive)
      {
  if(enemy.x/game.tileW-Math.floor(enemy.x/game.tileW)<0.5)
  {
  enemy.posX=Math.floor(enemy.x/game.tileW);
  }
  else
  {
    enemy.posX = Math.ceil(enemy.x/game.tileW);
  }
  enemy.posY=Math.floor(enemy.y/game.tileH);


    if(game.allgameLevels[game.currentLevel][(game.mapW*(enemy.posY+1)+(enemy.posX+1)-1)]===0)
    {
      enemy.isMoving = false;
      enemy.falling = true;
      if(!game.paused && !enemy.jumping)
      enemy.y+=enemy.gravity;
    }
    else{
      enemy.falling = false;
    }
  }
  })
})
}

function moveEnemies() {
  enemies.forEach(function(enemy, enemyIndex) {
    players.forEach(function(char, charIndex) {
      if (enemy.isAlive) {
        if (enemy.jumping && !game.paused) {
          enemy.jumpcount++;
          enemy.y -= enemy.ys;
          if (enemy.jumpcount == 25) {
            enemy.jumpcount = 0;
            enemy.jumping = false;
          }
        }

        if (enemy.falling && !enemy.isCollided) {
          enemy.xs = enemy.tempxs;
          if (enemy.x >= char.x) {
            enemy.xs = -enemy.xs;
            enemy.ismovingRight = false;
          } else {
            enemy.ismovingRight = true;
          }
        }
        if (!enemy.falling && !enemy.jumping) {
          if (enemy.x <= 0 || enemy.x >= canvas.width - 50) {
            if (enemy.ismovingRight) {
              enemy.ismovingRight = false;
            } else {
              enemy.ismovingRight = true;
            }
            enemy.xs = -enemy.xs;
          }
          if (
            (enemy.health == enemy.enemyName.health || enemy.isCollided) &&
            !game.paused
          ) {
            enemy.x += enemy.xs;
          }
          enemy.createEnemies();
        }
      }
    });
  });
}

function checkEnemiesStatus() {
  enemies.forEach(function(enemy, enemyIndex) {
    if (enemy.health < enemy.enemyName.health && !enemy.isCollided) {
      enemy.meltCounter++;
    }
    if (enemy.meltCounter == 200) {
      enemy.health++;
      enemy.meltCounter = 0;
    }
  });
}

function levelChanger() {
  if (enemies.length == 0) {
    game.levelFlag = true;
    if (game.currentLevel == 1) {
      game.currentLevel = 2;
      new enemyCreator();
      players.forEach(function(char, charIndex) {
        char.x = 650;
        char.y = 500;
        char.isRight = false;
      });
    } else if (game.currentLevel == 2) {
      game.currentLevel = 3;
      new enemyCreator();
    }
  }
  if (game.levelFlag == true) {
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Level: " + game.currentLevel, canvas.width / 2, 50);
    game.levelDelay++;
    if (game.levelDelay == 100) {
      new enemyAnimator();
      game.levelDelay = 0;
      game.levelFlag = false;
    }
  }
}

// function bulletCollision()
// {
//   bullets.forEach(function(bullet,bulletIndex)
//   {
//     bullet.posX=Math.floor(bullet.x/game.tileW);
//     bullet.posY=Math.floor(bullet.y/game.tileH);

//     if(game.allgameLevels[game.currentLevel][(game.mapW*(bullet.posY+1)+(bullet.posX+1)-1)]===1)
//     {
//         bullets.splice(bulletIndex,1);
//       }
//   });
// }
