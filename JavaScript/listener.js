function movePlayer(event) {
  game.players.forEach(function(char,charIndex)
  {
    if(!game.paused)
    {
    switch (event.keyCode) {
      case char.leftKey:
        if (!char.x <= 0 && !char.falling) {
          char.x -= 10;
          char.movingLeft = true;
          char.moveLeft();
        }
        break;
      case char.jumpKey:
          if(char.jumpCount==0 && !char.falling)
          {
          char.jumping=true;
          }
        break;
      case char.rightkey:
        if (char.x <= canvas.width - game.tileW && !char.falling) {
          char.x += 10;
          char.movingRight = true;
          char.moveRight();
        }
        break;
        case char.shootKey:
          createBullet(char);
          break;
    }
    }
  })
  }

  function pauseGame(event)
  {
    if(event.keyCode==80)
    {
      if(game.paused)
      {
        game.paused = false;
      }
      else{
        game.paused = true;
      }
    }
  }
